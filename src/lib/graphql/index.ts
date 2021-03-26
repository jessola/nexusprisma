import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import path from 'path';
/* Import types */
import * as enums from './enums';
import * as interfaces from './interfaces';
import * as objects from './objects';
import * as queries from './queries'; // Includes mutations & subscriptions

const types = [enums, interfaces, objects, queries];
const ROOT = path.join(__dirname, 'generated');
const createPath = (filename: string) => path.join(ROOT, filename);

export const schema = makeSchema({
  types,
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  outputs: {
    schema: createPath('schema.graphql'),
    typegen: createPath('types.ts'),
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  plugins: [fieldAuthorizePlugin()],
});

export * from './context';
