// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import '../config'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Context as PrismaContext } from "prisma-client-lib/dist/types"
import { Context } from "../types"
import { MutationResolvers } from '../generated/graphqlgen'
import { UserCreateInput, User } from '../generated/prisma-client'

const APP_SECRET = 'saywhatsaywhat'

function tokenGenerator(user: User): any {
  return jwt.sign({
    _id: user.id,
    username: user.username,
    name: user.name
  }, APP_SECRET);
}


export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (_parent, args: UserCreateInput, ctx: PrismaContext): Promise<any> => {
    const password = await bcrypt.hash(args.password, 10)
    console.log("TCL: password", ctx.prisma)
    const user = await ctx.prisma.createUser({
      ...args, password
    })
    console.log("TCL: user", user)

    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email })
    console.log("TCL: user", user)
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }


    const token = jwt.sign({
      _id: user.id,
      email: user.email,
    }, APP_SECRET)
    console.log("TCL: token", token)

    return {
      token: tokenGenerator(user).email,
      user,
    }
  },
}
