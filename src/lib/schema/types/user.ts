import { objectType, queryType, mutationType, inputObjectType } from 'nexus';
import { list, arg, nullable } from 'nexus';

import argon from 'argon2';

/* Input types - Move these elsewhere */
export const RegisterUserInput = inputObjectType({
  name: 'RegisterUserInput',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    t.string('password');
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    // t.date('joinDate');
    t.string('name', {
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    });
  },
});

export const userQueries = queryType({
  definition(t) {
    t.field('users', {
      type: list('User'),
      args: {
        where: nullable(arg({ type: 'UserWhereInput' })),
      },
      resolve: async (_, { where }, ctx) => {
        return ctx.prisma.user.findMany({ where: where as any });
      },
    });

    t.field('user', {
      type: nullable('User'),
      args: {
        where: arg({ type: 'UserWhereUniqueInput' }),
      },
      resolve: async (_, { where }, ctx) => {
        return ctx.prisma.user.findUnique({ where: where as any });
      },
    });
  },
});

export const userMutations = mutationType({
  definition(t) {
    t.field('registerUser', {
      type: 'User',
      args: {
        input: arg({ type: 'RegisterUserInput' }),
      },
      resolve: async (_, { input }, ctx) => {
        const { password, ...otherFields } = input;
        const newUser = await ctx.prisma.user.create({
          data: {
            ...otherFields,
            password: await argon.hash(password),
          },
        });

        return newUser;
      },
    });
  },
});
