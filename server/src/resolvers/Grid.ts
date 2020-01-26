import { GridResolvers } from '../generated/graphqlgen'

// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

export const Grid: GridResolvers.Type = {
  ...GridResolvers.defaultResolvers,
  entries: ({ id }, args, ctx) => {
    return ctx.prisma.grid({ id }).entries()
  },
  author: async ({ id }, args, ctx) => {
    return ctx.prisma.users({ where: { id } })
  }
}
