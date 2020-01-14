/* eslint-disable no-shadow */
import React from 'react'
import Head from 'next/head'
import {
  AppContextType,
  NextComponentType,
  AppInitialProps
} from 'next/dist/next-server/lib/utils'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { IncomingMessage } from 'http'
import cookie from 'cookie'
import fetch from 'isomorphic-unfetch'
import { withApollo } from 'react-apollo'
import { StoreProvider } from 'easy-peasy'
import ContextProvider, { ProviderComposer } from '../context'
import { Client } from '../types'
import store from '../store'

/**
 * Get the user token from cookie
 */
const getToken = (req?: IncomingMessage, options = {}) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie, options).token

const withContext = (
  App: NextComponentType<AppContextType, AppInitialProps, any>,
  { ssr = true } = {}
) => {
  const WithApollo = ({ apolloClient, apolloState, ...appProps }) => {
    const client = apolloClient || initApolloClient(apolloState, { getToken })

    store.addModel('client', client)

    return (
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <ContextProvider apolloClient={client} store={store}>
            <App {...appProps} apolloClient={client} />
          </ContextProvider>
        </StoreProvider>
      </ApolloProvider>
    )
  }

  WithApollo.displayName = `MyApp`

  if (process.env.NODE_ENV !== 'production') {
    // Set correct display name for devtools
  }

  WithApollo.getInitialProps = async (ctx: AppContextType) => {
    const {
      Component,
      router,
      ctx: { req, res }
    } = ctx

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line no-multi-assign
    const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
      {},
      {
        getToken: () => getToken(req)
      }
    ))

    const appProps = App.getInitialProps ? await App.getInitialProps(ctx) : {}

    if (res && res.finished) {
      // When redirecting, the response is finished.
      // No point in continuing to render
      return {}
    }

    if (ssr) {
      // Run all graphql queries in the component tree
      // and extract the resulting data
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')

        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apolloClient}>
            <StoreProvider store={store}>
              <App
                {...appProps}
                Component={Component}
                router={router}
                apolloClient={apolloClient}
              />
            </StoreProvider>
          </ApolloProvider>
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
    const apolloState = apolloClient.cache.extract()

    return {
      ...appProps,
      apolloState
    }
  }

  return WithApollo
}

type InitApolloClientOptions = [{}, { getToken: typeof getToken }]

let apolloClient: Client = null

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (...args: InitApolloClientOptions) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return createApolloClient(...args)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 */
const createApolloClient = (initialState = {}, { getToken }): Client => {
  const fetchOptions = {
    agent: null
  }

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      // eslint-disable-next-line global-require
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy
      )
    }
  }

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_API, // Server URL (must be absolute)
    credentials: 'include',
    fetch,
    fetchOptions
  })

  const authLink = setContext((_request, { headers }) => {
    const token = getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}

export default withContext
