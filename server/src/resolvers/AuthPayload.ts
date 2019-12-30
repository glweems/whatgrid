import { AuthPayloadResolvers } from '../generated/graphqlgen'

export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,

  user: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  }
}
