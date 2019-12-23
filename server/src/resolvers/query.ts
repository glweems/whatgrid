import { Context } from '../types'
import { User } from '../generated/prisma-client';

export const user = (_parent, { id, email }: User, { prisma: { user } }: Context) =>
  user({ id, email })


