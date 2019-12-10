/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './ormconfig';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/AuthResolver';
import { BookResolver } from './resolvers/BookResolver';

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
    const redis = require('redis');
    let RedisStore = require('connect-redis')(session);

    let redisClient = redis.createClient();
    const app = express();

    const corsOptions = {
      credentials: true,
      origin: 'http://localhost:3000',
    };

    app.use(cors(corsOptions));

    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        name: 'qid',
        secret: process.env.SESSION_SECRET || 'aslkdfjoiq12312',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      }),
    );

    // get options from ormconfig.js
    // await createConnection(config);

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [AuthResolver, BookResolver],
        validate: false,
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // eslint-disable-next-line no-undef
    const port: any = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
})();
