import 'dotenv/config';
import { isDev, Constants } from '@lib/utils';
import { verifyAccessToken, verifyRefreshToken } from '@lib/utils/token';

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

  function refreshTokens(req: ExtendedRequest, res: express.Response) {
    const refreshToken = req.cookies[Constants.RefreshTokenString];

    const payload = verifyRefreshToken(refreshToken);
    const isRefreshTokenValid = !!payload;

    return isRefreshTokenValid;
  }

  /* Apply non-graphql middleware */
  app.get('/', (_req, res) => res.send('Hello from server!'));
  app.use(authMiddleware);
  app.post('/token', refreshTokens);

  const server = http.createServer(app);

  /* Apply apollo middleware & start subscription logic */
  apollo.applyMiddleware({ app });
  apollo.installSubscriptionHandlers(server);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`.bgCyan.black);
  });
}

main();
