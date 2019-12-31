import { verify } from 'jsonwebtoken'
import { ContextParameters } from 'graphql-yoga/dist/types'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export const getUserId = (ctx: ContextParameters) => {
  const auth = ctx.request.get('Authorization')
  console.log("TCL: getUserId -> auth", auth)
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const verifiedToken: any = verify(token, process.env.APP_SECRET)
    return verifiedToken && verifiedToken._id
  } else {
    return undefined
  }
}
