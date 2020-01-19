/* eslint-disable no-console */
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { Client } from './types';

interface Options {
  getToken: () => string;
}

const createApolloClient = (initialState = {}, { getToken }): Client => {
  const fetchOptions = {
    agent: null
  };

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      // eslint-disable-next-line global-require
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy
      );
    }
  }

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_API, // Server URL (must be absolute)
    credentials: 'include',
    fetch,
    fetchOptions
  });

  const authLink = setContext((_request, { headers }) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  });
};

export default createApolloClient;
