/* eslint-disable no-return-assign */
/* eslint-disable no-extra-boolean-cast */
import App from 'next/app';
import React from 'react';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../apollo/withApolloClient';

import { Client } from '../apollo/types';
import { Store } from '../store';

interface Props {
  apolloClient: Client;
  store: Store;
}

class MyApp extends App<Props, any, any> {
  subtitle: any;

  render() {
    const { Component, pageProps, apolloClient, store } = this.props;
    const props = {
      ...pageProps,
      apolloClient,
      store
    };

    return <Component {...props} />;
  }
}

// MyApp.displayName = 'WhatGridApp'

export default withApollo(MyApp);
