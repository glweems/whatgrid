import './config'
import 'colors'
import { GraphQLServer } from "graphql-yoga";
import { rule, shield, and, or, not } from 'graphql-shield'
import resolvers from './resolvers'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx, _info) => {
    return ctx.user !== null
  },
)

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx, _info) => {
    return ctx.user.role === 'admin'
  },
)

const isEditor = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx, _info) => {
    return ctx.user.role === 'editor'
  },
)

const permissions = shield({
  Query: {
    user: and(isAuthenticated, or(isAdmin, isEditor)),
  },
  Mutation: {
    signup: not(isAuthenticated),
  },
  User: isAuthenticated,
})

function getUser(req) {
  if (!req.session.userId) {
    return true
  }
}


const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  middlewares: [permissions],
  context: req => ({
    ...req,
    user: getUser(req),
  }),
});

server.start(() => console.log("Server is running on http://localhost:4000".blue));

