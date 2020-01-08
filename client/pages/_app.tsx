/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-this-in-sfc */
import App from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { StoreProvider } from 'easy-peasy'
import ContextProvider from '../context'
import { GlobalStyle } from '../utils/theme'
import withApollo from '../apollo/withApollo'
import store, { useStoreState } from '../store'
import MeQuery from '../queries/Me.gql'
import UserQuery from '../queries/User.gql'

interface Props {
  client: any
}
class MyApp extends App<Props> {
  // public state = { user: undefined, loading: true }

  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      loading: true
    }
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: MeQuery
      })
      .then(({ data: { me }, loading }) => this.setState({ user: me, loading }))
  }

  render() {
    const { Component, pageProps, client } = this.props

    const Providers: React.FC = ({ children }) => (
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <ContextProvider session={this.state}>{children}</ContextProvider>
        </StoreProvider>
      </ApolloProvider>
    )
    if ((this.state as any).loading) return null

    try {
      return (
        <ApolloProvider client={client}>
          <StoreProvider store={store}>
            <ContextProvider session={this.state}>
              {(this.state as any).loading ? (
                'loading'
              ) : (
                <Component
                  {...pageProps}
                  client={client}
                  session={this.state}
                />
              )}
            </ContextProvider>
          </StoreProvider>
        </ApolloProvider>
      )
    } catch (e) {
      return (
        <pre>
          <code>{JSON.stringify(e, null, 2)}</code>
        </pre>
      )
    }
  }
}

export default withApollo(MyApp)
