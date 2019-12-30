import { Context } from '../types'
import { User } from '../generated/prisma-client';
import { QueryResolvers } from '../generated/graphqlgen';


export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  grids: (parent, args, ctx) => ctx.prisma.grids(),
  grid: (parent, { id }, ctx) => ctx.prisma.grid({ id }),
  user: (_parent, { id, email }, { prisma: { user } }) =>
    user({ id, email }),
  users: (_parent, args, { prisma: { users } }) =>
    users()
}
