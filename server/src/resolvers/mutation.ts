// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Context as PrismaContext } from "prisma-client-lib/dist/types"
import { Context, AuthPayload, User } from "../types"
import { MutationResolvers } from '../generated/graphqlgen'
import { UserCreateInput } from '../generated/prisma-client'


function tokenGenerator(user: User): any {
  return jwt.sign({
    _id: user.id,
    username: user.username,
    name: user.name
  }, process.env.APP_SECRET);
}


export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (_parent, args: UserCreateInput, ctx: PrismaContext) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      ...args, password
    })

    return {
      token: await tokenGenerator(user),
      user,
    }
  },


  login: async (parent, { email, password }, context) => {
    const user: any = await context.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }


    return {
      token: await tokenGenerator(user),
      user,
    }
  },
}
