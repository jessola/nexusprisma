import { objectType, extendType } from 'nexus';
import { list, arg, nullable, intArg } from 'nexus';

import argon from 'argon2';
import { createCsrfToken } from '@lib/utils';

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

export const userQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      description: 'Returns the currently logged in user',
      type: 'MeResponse',
      resolve: async (_, __, { req, prisma }) => {
        const userId = req.session.userId;
        if (!userId) return null;

        const user = prisma.user.findUnique({ where: { id: userId } });
        if (!user) return null;

        return { user, token: req.session.token };
      },
    });

    t.field('users', {
      type: list('User'),
      args: {
        where: nullable(arg({ type: 'UserWhereInput' })),
        orderBy: nullable(list(arg({ type: 'UserOrderByInput' }))),
        take: nullable(intArg()),
      },
      resolve: async (_, { where, take, orderBy }, ctx) => {
        return ctx.prisma.user.findMany({ where, take, orderBy });
      },
    });

    t.field('user', {
      type: nullable('User'),
      args: {
        where: arg({ type: 'UserWhereUniqueInput' }),
      },
      resolve: async (_, { where }, ctx) => {
        return ctx.prisma.user.findUnique({ where });
      },
    });
  },
});

export const userMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('registerUser', {
      type: 'RegisterResponse',
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

        /* Authenticate user */
        const csrfToken = await createCsrfToken();
        ctx.req.session.userId = newUser.id;
        ctx.req.session.token = csrfToken;

        return { success: true, user: newUser, token: csrfToken };
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
          /* Authenticate user */
          const csrfToken = await createCsrfToken();
          ctx.req.session.userId = user.id;
          ctx.req.session.token = csrfToken;

          return { success: true, user, token: csrfToken };
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
