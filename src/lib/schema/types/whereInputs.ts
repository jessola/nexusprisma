import { inputObjectType, list } from 'nexus';

/* User  */
export const UserWhereUniqueInput = inputObjectType({
  nonNullDefaults: { input: false },
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.int('id');
    t.string('email');
  },
});

export const UserWhereInput = inputObjectType({
  nonNullDefaults: { input: false },
  name: 'UserWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' });
    t.field('firstName', { type: 'StringFilter' });
    t.field('lastName', { type: 'StringFilter' });
    t.field('email', { type: 'StringFilter' });
    t.field('AND', { type: list('UserWhereInput') });
    t.field('OR', { type: list('UserWhereInput') });
    t.field('NOT', { type: list('UserWhereInput') });
  },
});