import { UserCreateInput, User } from "../generated/prisma-client"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from "../config"
import { Context as PrismaContext } from "prisma-client-lib/dist/types"
import { Context } from "../types"

export const signup = async (_parent, args: UserCreateInput, ctx: PrismaContext) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password },
  })

  return {
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
    user,
  }
}


export const login = async (parent, { email, password }: User, ctx: Context, info) => {
  const user = await ctx.prisma.user({ email })

  if (!user) {
    throw new Error('Invalid Login')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid Login')
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.email,
    },
    APP_SECRET,
    {
      expiresIn: '30d', // token will expire in 30days
    },
  )
  return {
    token,
    user,
  }
}

const Mutation = {
  signup,
  login
}


export default Mutation