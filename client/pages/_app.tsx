import App from 'next/app';
import ContextProvider from '../context';
import { ApolloClient } from 'apollo-boost';
import React from 'react';
import { GlobalStyle } from '../utils/theme';
import withApollo from '../apollo/withApollo';
import { ApolloProvider } from 'react-apollo';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    console.log('TCL: MyApp -> render -> this.props', this.props);
    return (
      <ContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ContextProvider>
    );
  }
}

export default MyApp;
