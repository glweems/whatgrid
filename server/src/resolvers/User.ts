import { UserResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'
import { Context } from '../types'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  permissions: async ({ id }, args, { prisma, request, userId }: Context) => {
    const me = await prisma.user({ id })

    return {
      edit: false,
      owner: me.id === id
    }
  },
  grids: ({ id }, args, ctx) => {
    return ctx.prisma.user({ id }).grids()
  }
}
