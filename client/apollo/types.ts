import {
  ApolloClient as ApolloClientDefault,
  NormalizedCacheObject
} from 'apollo-boost';

export type Client = ApolloClientDefault<NormalizedCacheObject>;
