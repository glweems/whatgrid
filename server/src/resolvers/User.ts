import { UserResolvers } from '../generated/graphqlgen'
import { getUserId } from '../utils'
import { Context } from '../types'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  grids: ({ id }, args, ctx) => {
    return ctx.prisma.user({ id }).grids()
  }
}
