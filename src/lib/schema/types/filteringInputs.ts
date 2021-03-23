import { inputObjectType, list } from 'nexus';

/* User  */
export const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.nullable.int('id');
    t.nullable.string('email');
  },
});

export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.nullable.field('id', { type: 'IntFilter' });
    t.nullable.field('firstName', { type: 'StringFilter' });
    t.nullable.field('lastName', { type: 'StringFilter' });
    t.nullable.field('email', { type: 'StringFilter' });
    t.nullable.field('AND', { type: list('UserWhereInput') });
    t.nullable.field('OR', { type: list('UserWhereInput') });
    t.nullable.field('NOT', { type: list('UserWhereInput') });
  },
});

export const UserOrderByInput = inputObjectType({
  name: 'UserOrderByInput',
  definition(t) {
    t.nullable.field('id', { type: 'OrderByArg' });
    t.nullable.field('firstName', { type: 'OrderByArg' });
    t.nullable.field('lastName', { type: 'OrderByArg' });
    t.nullable.field('email', { type: 'OrderByArg' });
  },
});
