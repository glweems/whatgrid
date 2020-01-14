/* eslint-disable no-console */
import 'dotenv/config'
import 'colors'
import { GraphQLServer, Options } from 'graphql-yoga'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import * as RateLimit from 'express-rate-limit'
import * as RateLimitRedisStore from 'rate-limit-redis'
import * as Redis from 'ioredis'
import { resolvers } from './resolvers'
import { prisma } from './generated/prisma-client'
import { permissions } from './permissions'
import { getUserId } from './utils'

const SESSION_SECRET = 'ajslkjalksjdfkl'
const RedisStore = connectRedis(session as any)

const redis = new Redis()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: (req) => ({
    ...req,
    redis,
    url: `${req.request.protocol}://${req.request.get('host')}`,
    session: req.request.session,
    req: req.request,
    prisma,
    userId: getUserId(req)
  })
})

server.express.use(
  new RateLimit({
    store: new RateLimitRedisStore({
      client: redis
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
)

server.express.use(
  session({
    store: new RedisStore({
      client: redis as any,
      prefix: 'sess'
    }),
    name: 'qid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  } as any)
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
${'Server Started'.cyan.underline}
${`[port]: ${`${port}`.yellow}`.grey}
${`[endpoint]: ${`${cors.origin}${endpoint}`.yellow}`.grey}
${`[playground]:  ${`${cors.origin}${playground}`.yellow}`.grey}

`

server.start(options, (config: Options) => console.log(welcomeMsg(config)))
