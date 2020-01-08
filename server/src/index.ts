/* eslint-disable no-console */
import 'dotenv/config'
import 'colors'
import { GraphQLServer, Options } from 'graphql-yoga'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as jwt from 'jsonwebtoken'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { apolloError } from 'express-apollo'
import { resolvers } from './resolvers'
import { prisma } from './generated/prisma-client'
import { permissions } from './permissions'
import { getUserId } from './utils'

const app = express()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: async (req) => ({ ...req, prisma, userId: await getUserId(req) })
})

server.express.use(
  session({
    name: 'qid',
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 57 * 7
    }
  })
)

const options = {
  port: process.env.PORT,
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  endpoint: '/graphql',
  playground: '/playground'
}

const welcomeMsg = ({ port, endpoint, playground, cors }: Options & any) => `
${'Server Started'.blue}

${`[port]: ${`${port}`.yellow}`.grey}
${`[endpoint]: ${`${cors.origin}${endpoint}`.yellow}`.grey}
${`[playground]:  ${`${cors.origin}${playground}`.yellow}`.grey}

`

server.start(options, (config: Options) => console.log(welcomeMsg(config)))
