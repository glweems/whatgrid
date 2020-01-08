// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { UserPermissionsResolvers } from '../generated/graphqlgen'
import { cookieExtractor } from '../utils'

export const UserPermissions: UserPermissionsResolvers.Type = {
  ...UserPermissionsResolvers.defaultResolvers,
  owner: (parent, args, ctx) => {
    console.log('TCL: parent', parent)
    return parent.owner
  },
  edit: ({ edit }, args, ctx) => {
    return edit
  }
}
