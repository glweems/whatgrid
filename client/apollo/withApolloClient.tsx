/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import cookie from 'cookie';
import { getDataFromTree } from 'react-apollo';
import gql from 'graphql-tag';
import initApollo from './initApollo';
import isBrowser from './isBrowser';
import ContextProvider from '../components/ContextProvider';
import store from '../store';
import sessionModal from '../store/session';

/**
 * Get the user token from cookie
 */
function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  );
}

export default (App: any) => {
  return class WithData extends React.Component<any> {
    static displayName = `WhatGridApplication`;

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).qid
        }
      );

      ctx.ctx.apolloClient = apollo;
      let appProps = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token
      });

      if (!store.getState().apolloClient)
        store.addModel('client', this.apolloClient);
      if (!store.getState().router) store.addModel('router', this.props.router);
      if (!store.getState().session) store.addModel('session', sessionModal);

      this.apolloClient
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
            });
          else store.dispatch.session.clearSession();
        })
        .catch(() => store.dispatch.session.clearSession());
    }

    render() {
      const props = {
        ...this.props,
        store,
        apolloClient: this.apolloClient
      };

      return (
        <ContextProvider {...props}>
          <App {...props} />
        </ContextProvider>
      );
    }
  };
};
