import { verify } from 'jsonwebtoken'

export const getUserId = (ctx: any) => {
  const auth = ctx.request.get('Authorization')
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const verifiedToken: any = verify(token, process.env.APP_SECRET)
    // eslint-disable-next-line no-underscore-dangle
    return verifiedToken && verifiedToken._id
  }
  return undefined
}
export const bakeCookie = (ctx: any, token: string) =>
  ctx.response.cookie('token', token, {
    httpOnly: false,
    // secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  })
