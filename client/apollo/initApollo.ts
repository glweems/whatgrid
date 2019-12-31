import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import isBrowser from './isBrowser'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

interface Options {
  token: string
}

function create(initialState: any, options: Options) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_API,
    credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')

    if (token)
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      }

    return {
      headers: {
        ...headers
      }
    }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
