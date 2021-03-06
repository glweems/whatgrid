import { rule, and, shield } from 'graphql-shield'

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  if (ctx.userId) return true
  return false
})

export const permissions = shield({
  Query: {
    me: isAuthenticated
  }
})
