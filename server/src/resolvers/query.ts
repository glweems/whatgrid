import { QueryResolvers } from '../generated/graphqlgen';


export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  grids: (parent, args, ctx) => {
    return ctx.prisma.grids();
  },

  grid: (parent, { id }, ctx) => {
    return ctx.prisma.grid({ id });
  },

  user: (_parent, { id, email }, ctx) => {
    return ctx.prisma.user({ id, email });
  },

  users: (_parent, args, ctx) => {
    return ctx.prisma.users();
  },

  me: (parent, args, ctx) => {
    return ctx.prisma.user({ id: ctx.userId })
  }
}
