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

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition(t) {
    t.string('email');
    t.string('password');
  },
});

export const LoginResponse = objectType({
  name: 'LoginResponse',
  definition(t) {
    t.boolean('success');
    t.field('user', { type: nullable('User') });
  },
});

/* Main */
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
    t.field('me', {
      description: 'Returns the currently logged in user',
      type: nullable('User'),
      resolve: async (_, __, { req, prisma }) => {
        const userId = req.session.userId;

        if (!userId) return null;

        return prisma.user.findUnique({ where: { id: userId } });
      },
    });

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

        ctx.req.session.userId = newUser.id;

        return newUser;
      },
    });

    t.field('loginUser', {
      type: 'LoginResponse',
      args: {
        input: arg({ type: 'LoginUserInput' }),
      },
      resolve: async (_, { input }, ctx) => {
        const { email, password } = input;
        const user = await ctx.prisma.user.findUnique({ where: { email } });

        if (!user) return { success: false, user: null };

        const passwordsMatch = await argon.verify(user.password, password);

        if (passwordsMatch) {
          ctx.req.session.userId = user.id;
          return { success: true, user };
        } else {
          return { success: false, user: null };
        }
      },
    });

    t.field('logoutUser', {
      type: 'Boolean',
      resolve: async (_, __, { req, res }) => {
        return new Promise((resolve) => {
          req.session.destroy((err: any) => {
            if (err) resolve(false);

            res.clearCookie('sid');
            resolve(true);
          });
        });
      },
    });
  },
});
