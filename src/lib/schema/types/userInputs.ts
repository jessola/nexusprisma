import { inputObjectType, nullable, objectType } from 'nexus';

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

export const MeResponse = objectType({
  name: 'MeResponse',
  definition(t) {
    t.nullable.field('user', { type: nullable('User') });
    t.nullable.string('token');
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
