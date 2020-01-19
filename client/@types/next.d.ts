// next.d.ts
import ApolloClient from 'apollo-client'

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<AppApolloCache>
  }
}
