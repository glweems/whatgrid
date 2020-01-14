/* eslint-disable no-console */
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import { onError } from 'apollo-link-error'
import isBrowser from './isBrowser'

let client: ApolloClient<NormalizedCacheObject> | null = null

interface Options {
  getToken: () => string
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

function create(initialState: any, fetchOptions: Options) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    credentials: 'include',
    fetchOptions,
    fetch
  })

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    let fetchOptions = {}
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    if (process.env.https_proxy) {
      fetchOptions = {
        // eslint-disable-next-line global-require
        agent: new (require('https-proxy-agent'))(process.env.https_proxy)
      }
    }
    return create(initialState, {
      ...options,
      fetchOptions
    })
  }
  // Reuse client on the client-side
  if (!client) {
    client = create(initialState, options)
  }
  return client
}
