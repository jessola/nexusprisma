import { arg, extendType, nullable, list, intArg } from 'nexus';
import Resolver from '../resolvers/user';

export const userQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: Resolver.getCurrentUser,
    });

    t.list.field('users', {
      type: 'User',
      args: {
        orderBy: nullable(list(arg({ type: 'UserOrderByInput' }))),
        skip: nullable(intArg()),
        take: nullable(intArg()),
        where: nullable(arg({ type: 'UserWhereInput' })),
      },
      resolve: Resolver.getUsers,
    });

    t.nullable.field('user', {
      type: 'User',
      args: {
        where: arg({ type: 'UserWhereUniqueInput' }),
      },
      resolve: Resolver.getUser,
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
      resolve: Resolver.registerUser,
    });

    t.field('loginUser', {
      type: 'LoginResponse',
      args: {
        input: arg({ type: 'LoginUserInput' }),
      },
      resolve: Resolver.loginUser,
    });

    t.field('logoutUser', {
      type: 'Boolean',
      resolve: Resolver.logoutUser,
    });
  },
});
