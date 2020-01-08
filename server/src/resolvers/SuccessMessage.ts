import { SuccessMessageResolvers } from '../generated/graphqlgen'

export const SuccessMessage: SuccessMessageResolvers.Type = {
  ...SuccessMessageResolvers.defaultResolvers,
  message: (parent, args, ctx) => {
    return parent.message
  }
}
