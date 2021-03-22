import 'dotenv/config';
import { isDev } from '@lib/utils';

import colors from 'colors';

import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema, Context } from '@lib/schema';

import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

import prisma from '@lib/db';

colors.enable();

async function main() {
  const { PORT = 4000 } = process.env;
  const app = express();

  /* Pass useful services to context as it's available in all requests */
  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res, prisma }),
  });

  /* Configure express-session with connect-redis */
  const redisClient = redis.createClient();
  const RedisStore = connectRedis(session);
  const sessionMiddleware = session({
    name: 'sid',
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,

    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
      disableTTL: true,
    }),

    cookie: {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true,
      secure: !isDev,
      sameSite: 'lax',
    },
  });

  /* Define any non-graphql logic/middleware here */
  app.get('/', (_req, res) => res.send('Hello from server!'));
  app.use(sessionMiddleware);

  const server = http.createServer(app);

  /* Apply apollo middleware & start subscription logic */
  apollo.applyMiddleware({ app });
  apollo.installSubscriptionHandlers(server);

  server.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`.bgCyan.black)
  );
}

main();
