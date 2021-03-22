import { Request, Response } from 'express';
import { makeSchema } from 'nexus';

import path from 'path';
import * as types from './types';

/** Context object passed to all resolvers */
export interface Context {
  req: Request;
  res: Response;
  foo: 'bar';
}

const ROOT = path.join(__dirname, '.generated');

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
