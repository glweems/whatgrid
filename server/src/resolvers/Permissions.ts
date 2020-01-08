// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { PermissionsResolvers } from '../generated/graphqlgen'
import { Context } from '../types'

// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

export const Permissions: PermissionsResolvers.Type = {
  ...PermissionsResolvers.defaultResolvers,
  user: async (parent, args, { prisma, request, userId }: Context) => {
    console.log('TCL: userId'.red, userId)
    return prisma.user({ userId })
  }
}
