import 'dotenv/config';

import colors from 'colors';

import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema, Context } from '@lib/schema';

colors.enable();

async function main() {
  const { PORT = 4000 } = process.env;
  const app = express();

  app.get('/', (_req, res) => res.send('Hello from server!'));

  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res, foo: 'bar' }),
  });
  const server = http.createServer(app);

  apollo.applyMiddleware({ app });
  apollo.installSubscriptionHandlers(server);

  server.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`.bgCyan.black)
  );
}

main();
