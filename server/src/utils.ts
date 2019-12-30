import './config'
import { verify } from 'jsonwebtoken'
import { APP_SECRET } from './config'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export const getUserId = (context) => {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken: any = verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}