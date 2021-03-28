import { core } from 'nexus';

import { Accounts } from '@lib/modules';
import { User } from '@lib/db';
import { Context } from '@lib/graphql';
import { createRefreshToken, createIdToken } from '@lib/utils/token';

interface IUserResolver {
  getCurrentUser: core.FieldResolver<'Query', 'me'>;
  getUsers: core.FieldResolver<'Query', 'users'>;
  getUser: core.FieldResolver<'Query', 'user'>;
  registerUser: core.FieldResolver<'Mutation', 'registerUser'>;
  loginUser: core.FieldResolver<'Mutation', 'loginUser'>;
  logoutUser: core.FieldResolver<'Mutation', 'logoutUser'>;
}

const REFRESH_TOKEN_STRING = 'refresh-token';
const ID_TOKEN_STRING = 'info';

const Resolver: IUserResolver = {
  getCurrentUser: async (_, __, { req }) => {
    const userId = req.userId;
    if (!userId) return null;

    const user = await Accounts.getUser({ where: { id: userId } });
    return user;
  },

  getUsers: (_, { orderBy, skip, take, where }) => {
    return Accounts.listUsers({ orderBy, skip, take, where });
  },

  getUser: (_, { where }) => {
    return Accounts.getUser({ where });
  },

  registerUser: async (_, { input }, ctx) => {
    const { user, token } = await Accounts.registerUser(input);
    setTokensInCookies(ctx, user);
    return { success: true, user, token };
  },

  loginUser: async (_, { input }, ctx) => {
    const { user, token } = await Accounts.loginUser(input);
    if (user) setTokensInCookies(ctx, user);
    return { success: !!user, user, token };
  },

  logoutUser: async (_, __, { res }) => {
    res.clearCookie(REFRESH_TOKEN_STRING);
    res.clearCookie(ID_TOKEN_STRING);
    return true;
  },
};

/* Utilities */
function setTokensInCookies(ctx: Context, user: User) {
  ctx.res.cookie(REFRESH_TOKEN_STRING, createRefreshToken(user));
  ctx.res.cookie(ID_TOKEN_STRING, createIdToken(user));
}

export default Resolver;
