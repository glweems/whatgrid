import { UserResolvers } from '../generated/graphqlgen'

// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  grids: ({ id }, args, ctx) => {
    return ctx.prisma.user({ id }).grids()
  }
}
