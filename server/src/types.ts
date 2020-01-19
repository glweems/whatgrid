import { ContextParameters } from 'graphql-yoga/dist/types'
import { Context as PrismaContext } from 'prisma-client-lib/dist/types'
import { Prisma } from './generated/prisma-client'

export interface Context {
  db: {
    mutation: Prisma
  }
  prisma: Prisma | PrismaContext
  userId?: string
  request: {
    session?: any
  }
}

export interface User {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  password: string | null
  firstName: string | null
  lastName: string | null
  username: string | null
  phoneNumber: number | null
}

export interface Grid {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
  published: boolean
  rows: number | null
  columns: number | null
  gridTemplateColumns: string | null
  gridTemplateRows: string | null
}

export interface SuccessMessage {
  message: string | null
}

export interface AuthPayload {
  token: string
  user: User
}
export interface SignupInput {
  email: string
  username: string | null
  password: string
}
