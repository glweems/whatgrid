// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { GridEntryResolvers } from '../generated/graphqlgen'

export const GridEntry: GridEntryResolvers.Type = {
  ...GridEntryResolvers.defaultResolvers,

  grid: (parent, args, ctx) => {
    console.log('TCL: parent', parent)
    return ctx.prisma.gridEntries({ id: parent.id }).gridEntries()
  }
}
