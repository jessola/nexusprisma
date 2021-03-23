import { enumType, inputObjectType } from 'nexus';

export const IntFilter = inputObjectType({
  nonNullDefaults: { input: false },
  name: 'IntFilter',
  description: 'Useful methods to filter by Int fields',
  definition(t) {
    t.int('equals');
    t.int('gt');
    t.int('gte');
    t.list.nonNull.int('in');
    t.int('lt');
    t.int('lte');
    t.field('not', { type: 'IntFilter' });
    t.list.nonNull.int('notIn');
  },
});

export const StringFilter = inputObjectType({
  nonNullDefaults: { input: false },
  name: 'StringFilter',
  description: 'Useful methods to filter by String or DateTime fields',
  definition(t) {
    t.string('contains');
    t.string('endsWith');
    t.string('equals');
    t.string('gt');
    t.string('gte');
    t.list.nonNull.string('in');
    t.string('lt');
    t.string('lte');
    t.field('not', { type: 'StringFilter' });
    t.list.nonNull.string('notIn');
    t.string('startsWith');
  },
});

export const BooleanFilter = inputObjectType({
  nonNullDefaults: { input: false },
  name: 'BooleanFilter',
  description: 'Useful methods to filter by String fields',
  definition(t) {
    t.boolean('equals');
    t.field('not', { type: 'BooleanFilter' });
  },
});

export const OrderByArg = enumType({
  name: 'OrderByArg',
  members: {
    asc: 'asc',
    desc: 'desc',
  },
});
