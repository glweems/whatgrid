import { verify, sign } from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { User } from './types'

export const getUserId = (req: any) => {
  const Authorization = req.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId }: any = verify(token, process.env.APP_SECRET)
    return userId
  }
  return undefined
}

export const bakeCookie = (ctx: any, token: string) =>
  ctx.response.cookie('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  })

export const tokenGenerator = async (user: User): Promise<string> => {
  const token = sign(
    {
      userId: user.id
    },
    process.env.APP_SECRET
  )

  verify(token, process.env.APP_SECRET, (err, data) => {
    console.log('token verified'.blue)
  })

  return token
}

export function generateJwt(user) {
  const token = sign(user, process.env.APP_SECRET, {
    expiresIn: 86400 * 30,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    subject: user.id.toString()
  })

  // verify(token, process.env.APP_SECRET, (err, data) => { })

  return token
}

export const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.qid
  }
  return token
}

export type GraphQLFormattedError = {
  message: string
  // locations: GraphQLErrorLocation[]
}

export type GraphQLErrorLocation = {
  line: number
  column: number
}
export const formatError = ({
  message,
  locations
}: GraphQLError): GraphQLFormattedError => ({ message })
