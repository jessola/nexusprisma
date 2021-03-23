import { Request, Response } from 'express';
import { Session } from 'express-session';
import { PrismaClient } from '@prisma/client';
import { makeSchema } from 'nexus';

import path from 'path';
import * as types from './types';

/** A request object, wherein the `session` has a key called `userId` */
interface RequestWithUserInSession extends Request {
  session: Session & { userId?: number; token?: string };
}

/** Context object passed to all resolvers */
export interface Context {
  req: RequestWithUserInSession;
  res: Response;
  prisma: PrismaClient;
}

const ROOT = path.join(__dirname, 'generated');

export const schema = makeSchema({
  types,
  nonNullDefaults: { input: true, output: true },
  outputs: {
    schema: path.join(ROOT, 'schema.graphql'),
    typegen: path.join(ROOT, 'types.ts'),
  },
  contextType: {
    module: require.resolve('@lib/schema'),
    export: 'Context',
  },
});
