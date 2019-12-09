import { default as Next } from 'next/app';
import ContextProvider from '../context';
import { ApolloClient } from 'apollo-boost';
import React from 'react';
import { withApollo } from '../utils/apollo';
import { GlobalStyle } from '../utils/theme';

interface Props {
  apollo: typeof ApolloClient;
}

class App extends Next<Props> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ContextProvider>
    );
  }
}

export default withApollo(App);
