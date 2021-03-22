import { Request, Response } from 'express';
import path from 'path';

import { makeSchema, asNexusMethod, objectType } from 'nexus';
import { queryType, mutationType, subscriptionType } from 'nexus';

import { GraphQLDateTime } from 'graphql-iso-date';

/** Context object passed to all resolvers */
export interface Context {
  req: Request;
  res: Response;
  foo: 'bar';
}

const DateTime = asNexusMethod(GraphQLDateTime, 'date');

// const x = objectType({
//   name: "x",
//   definition(t) {
//     t.field('sjfsdf', {
//       type: "String",
//       resolve: (_, __, {}) => {

//       }
//     })
//   }
// })

const ROOT = path.join(__dirname, 'generated');

export const schema = makeSchema({
  types: [DateTime],
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
