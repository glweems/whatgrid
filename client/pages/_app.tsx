import App from 'next/app'
import React from 'react'
import gql from 'graphql-tag'
import store from '../store'
import withApollo from '../apollo/withApolloClient'
import sessionModal from '../store/session'
import ContextProvider from '../context'

class MyApp extends App<any, any, any> {
  componentWillMount() {
    store.addModel('session', sessionModal)
    this.props.apolloClient
      .query({
        query: gql`
          query Me {
            me {
              id
              email
              username
            }
          }
        `
      })
      .then(({ data: { me } }) => {
        if (me !== null)
          store.dispatch.session.setSession({
            ...me,
            authenticated: true
          })
        else store.dispatch.session.clearSession()
      })
      .catch(() => store.dispatch.session.clearSession())
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <ContextProvider store={store} apolloClient={apolloClient}>
        <Component {...pageProps} />
      </ContextProvider>
    )
  }
}

// MyApp.displayName = 'WhatGridApp'

export default withApollo(MyApp)
