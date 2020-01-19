/* eslint-disable no-return-assign */
/* eslint-disable no-extra-boolean-cast */
import App from 'next/app';
import React from 'react';
import withApollo from '../apollo/withApolloClient';

import { Client } from '../apollo/types';

interface Props {
  apolloClient: Client;
  registering: boolean;
  login: boolean;
}

class MyApp extends App<Props, any, any> {
  subtitle: any;

  render() {
    const { Component, pageProps } = this.props;

    // if (Boolean(registering)) return <p>hello</p>

    return <Component {...pageProps} />;
  }
}

// MyApp.displayName = 'WhatGridApp'

export default withApollo(MyApp);
