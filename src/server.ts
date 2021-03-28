import 'dotenv/config';
import { isDev } from '@lib/utils';
import { verifyAccessToken } from '@lib/utils/token';

import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema, Context, createCtx, ExtendedRequest } from '@lib/graphql';

import colors from 'colors';
colors.enable();

async function main() {
  const { PORT = 4000 } = process.env;
  const app = express();

  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): Context => createCtx(req, res),
  });

  const authMiddleware = (
    req: ExtendedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) return next();
    if (!authorization.match(/^Bearer\s.+/)) return next();

    const [_, token] = authorization.split(' ');
    const payload = verifyAccessToken(token);

    if (payload) req.userId = payload.userId;

    next();
  };

  /* Define any non-graphql logic/middleware here */
  app.get('/', (_req, res) => res.send('Hello from server!'));
  app.use(authMiddleware);

  const server = http.createServer(app);

  /* Apply apollo middleware & start subscription logic */
  apollo.applyMiddleware({ app });
  apollo.installSubscriptionHandlers(server);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`.bgCyan.black);
  });
}

main();
