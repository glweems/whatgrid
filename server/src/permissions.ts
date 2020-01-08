import { rule, and, shield } from 'graphql-shield'

class AuthError extends Error {
  message: 'Not Authorized'
}

const rules = {
  isAuthenticated: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      if (ctx.userId) {
        console.log('User is verified'.cyan)
        return true
      }
      throw new AuthError()
    }
  )
}

export const permissions = shield(
  {
    Query: {
      // me: rules.isAuthenticated
    }
  },
  {
    debug: false
  }
)
