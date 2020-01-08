/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import Head from 'next/head'
import React from 'react'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import cookie from 'cookie'
import { StoreProvider } from 'easy-peasy'
import initApollo from './initApollo'
import ContextProvider from '../context'
import store from '../store'

const parseCookies = (req?: any, options?: any) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export default function<T>(App: React.ComponentType<T> & any) {
  return class WithData extends React.Component {
    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token
        }
      )
      ctx.ctx.client = apollo
      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }
      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }
      if (typeof window === 'undefined') {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              client={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }
      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()
      return {
        ...appProps,
        apolloState
      }
    }

    constructor(props) {
      super(props) // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      ;(this as any).client = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token
        }
      })
    }

    render() {
      return <App {...this.props} client={(this as any).client} />
    }
  }
}
