import { ApolloQueryResult, ApolloClient } from 'apollo-boost'
import gql from 'graphql-tag'
import App, { AppProps } from 'next/app'
import React from 'react'
import { StoreProvider } from 'easy-peasy'
import withApollo from '../apollo/withApollo'
import ContextProvider from '../context'
import { MeDocument, MeQuery as MeQueryType } from '../utils/generated'
import { Client } from '../types'

interface Props extends AppProps {
  apolloClient: Client
}

interface State {
  displayName: string
}
class MyApp extends App<Props, State> {
  render() {
    const { Component, pageProps, apolloClient } = this.props

    return <Component {...pageProps} apolloClient={apolloClient} />
  }
}

// MyApp.displayName = 'hello'

/* class MyApp extends App<Props, State> {
  public state = { loading: true, isLoggedIn: false }

  constructor(props) {
    super(props)
    this.state = { loading: false, isLoggedIn: false }
  }

  componentWillMount() {
    this.props.apolloClient
      .query({ query: MeDocument })
      .then((data: any) => {
        console.log('TCL: MyApp -> componentWillReceiveProps -> data', data)
        this.setState({ ...data.me, loading: false })
      })
      .catch((err) => console.error(err))
  }

  render() {
    const { Component, pageProps } = this.props

    if (this.state.loading) return <div>loading</div>

    return (
      <ContextProvider session={this.state}>
        <Component {...pageProps} />
      </ContextProvider>
    )
  }
}
 */
export default withApollo(MyApp)
