// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from "../config"
import { Context as PrismaContext } from "prisma-client-lib/dist/types"
import { Context } from "../types"
import { MutationResolvers } from '../generated/graphqlgen'
import { UserCreateInput } from '../generated/prisma-client'


export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: (_parent, args, ctx) => {
    const password = bcrypt.hash(args.password, 10)
    const user = ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user,
    }
  },
  login: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  }
}
