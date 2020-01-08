import { Context } from 'prisma-client-lib/dist/types'
import { QueryResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  grids: (parent, args, ctx) => {
    return ctx.prisma.grids()
  },

  grid: (parent, { id }, ctx) => {
    return ctx.prisma.grid({ id })
  },

  user: async (_parent, { id, email }, { prisma, userId }: Context) => {
    const user = await prisma.user({ id, email })

    if (!user) return null

    return {
      ...user,
      permissions: {
        owner: userId === user.id,
        user
      }
    }
  },

  users: (_parent, args, ctx) => {
    return ctx.prisma.users()
  },

  me: async (parent, args, { userId, prisma, request }: any) => {
    if (userId) return prisma.user({ id: userId })

    request.userId = userId
    return null
  }
}
