import App from 'next/app';
import React from 'react';
import ContextProvider from '../context';
import { GlobalStyle } from '../utils/theme';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    try {
      return (
        <ContextProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ContextProvider>
      );
    } catch (e) {
      return (
        <pre>
          <code>{JSON.stringify(e)}</code>
        </pre>
      );
    }
  }
}

export default MyApp;
