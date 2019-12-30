import './config'
import 'colors'
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from './resolvers'
import { prisma } from './generated/prisma-client';
import { permissions } from './permissions'
console.log(process.env.GQL_ENDPOINT)


const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

const options = {
  // port: PORT,
  endpoint: '/graphql',
  playground: '/playground',
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`.blue,
  ),
)


