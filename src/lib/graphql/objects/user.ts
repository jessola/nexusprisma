import { objectType, inputObjectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    // @ts-ignore
    t.date('joinedAt');
    t.string('name', {
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    });
  },
});

/* CRUD */
export const RegisterUserInput = inputObjectType({
  name: 'RegisterUserInput',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    t.string('password');
  },
});

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition(t) {
    t.string('email');
    t.string('password');
  },
});

/* Filtering */
export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.nullable.list.field('AND', { type: 'UserWhereInput' });
    t.nullable.list.field('OR', { type: 'UserWhereInput' });
    t.nullable.list.field('NOT', { type: 'UserWhereInput' });
    t.nullable.field('id', { type: 'IntFilter' });
    t.nullable.field('firstName', { type: 'StringFilter' });
    t.nullable.field('lastName', { type: 'StringFilter' });
    t.nullable.field('email', { type: 'StringFilter' });
    t.nullable.field('joinedAt', { type: 'StringFilter' });
  },
});

export const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.nullable.int('id');
    t.nullable.string('email');
  },
});

/* Response */
export const MeResponse = objectType({
  name: 'MeResponse',
  definition(t) {
    t.nullable.string('token');
    t.nullable.field('user', { type: 'User' });
  },
});

export const RegisterResponse = objectType({
  name: 'RegisterResponse',
  definition(t) {
    t.boolean('success');
    t.nullable.string('token');
    t.nullable.field('user', { type: 'User' });
  },
});

export const LoginResponse = objectType({
  name: 'LoginResponse',
  definition(t) {
    t.boolean('success');
    t.nullable.string('token');
    t.nullable.field('user', { type: 'User' });
  },
});
