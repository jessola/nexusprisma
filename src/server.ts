import 'dotenv/config';
import cors from 'cors';
import { Constants, token as Token, setAuthCookies } from '@lib/utils';
import prisma from '@lib/db';

import express from 'express';
import cookieParser from 'cookie-parser';
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
    if (!authorization.match(/^Bearer .+/)) return next();

    const [_, token] = authorization.split(' ');
    const payload = Token.verifyAccessToken(token);

    if (payload) req.userId = payload.userId;

    next();
  };

  async function refreshTokens(req: ExtendedRequest, res: express.Response) {
    const refreshToken = req.cookies[Constants.RefreshTokenString];
    if (!refreshToken) return res.status(401).send('Unauthorized');

    const payload = Token.verifyRefreshToken(refreshToken);
    if (!payload) return res.status(401).send('Unauthorized');

    const { userId: id } = payload;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(401).send('Unauthorized');

    setAuthCookies(res, user);

    res.status(200).json({ token: Token.createAccessToken(user) });
  }

  /* Apply non-graphql middleware */
  app.use(cors({ credentials: true, origin: 'http://127.0.0.1:3000' }));
  app.use(cookieParser());
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
