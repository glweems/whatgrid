// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { User } from '../types'
import { MutationResolvers } from '../generated/graphqlgen'
import { UserCreateInput } from '../generated/prisma-client'
import { bakeCookie } from '../utils'

function tokenGenerator(user: User): any {
  return jwt.sign(
    {
      _id: user.id,
      username: user.username,
      name: user.name
    },
    process.env.APP_SECRET
  )
}

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (_parent, args: UserCreateInput, ctx) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      ...args,
      password
    })

    const token = await tokenGenerator(user)

    bakeCookie(ctx, token)

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

    const token = await tokenGenerator(user)

    bakeCookie(ctx, token)

    return {
      token,
      user
    }
  }
}
