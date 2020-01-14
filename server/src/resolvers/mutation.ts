import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { User } from '../types'
import { MutationResolvers } from '../generated/graphqlgen'
import { UserCreateInput } from '../generated/prisma-client'
import { bakeCookie, tokenGenerator } from '../utils'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (_parent, args, ctx) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      ...args,
      password
    })

    const token = await tokenGenerator(user)

    bakeCookie(ctx, token)

    ctx.request.session.user = user

    return {
      token,
      user
    }
  },

  login: async (parent, { email, password }, ctx: any) => {
    const user: any = await ctx.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      throw new Error('Invalid password')
    }

    ctx.request.session.user = user

    const token = await tokenGenerator(user)

    bakeCookie(ctx, token)

    return {
      token,
      user
    }
  },

  logout: async (parent, args, ctx: any) => {
    await ctx.response.clearCookie('token')
    return { message: 'Goodbye!' }
  }
}
