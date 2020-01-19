import { prisma } from '../src/generated/prisma-client'

const seed = async () =>
  prisma.createUser({
    email: 'gwgraphicdesign@gmail.com',
    password: 'test',
    firstName: 'garrett',
    lastName: 'weems',
    grids: {
      create: [
        {
          name: 'grid 1'
        }
      ]
    }
  })
