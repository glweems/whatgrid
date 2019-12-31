/* eslint-disable no-console */
import 'dotenv/config'
import 'colors'
import { GraphQLServer, Options } from 'graphql-yoga'
import { resolvers } from './resolvers'
import { prisma } from './generated/prisma-client'
import { permissions } from './permissions'
import { getUserId } from './utils'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: (req) => {
    return {
      ...req,
      prisma,
      userId: getUserId(req)
    }
  }
})

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

const options: Options = {
  cors: corsOptions,
  endpoint: '/graphql',
  playground: '/playground'
}

server.start(options, ({ port }) =>
  console.log(
    `Server started`.yellow,
    `
    listening on port http://localhost:${port}/playground for incoming requests.`
      .blue
  )
)
