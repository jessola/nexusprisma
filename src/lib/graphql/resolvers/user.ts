import { core } from 'nexus';

import { Accounts } from '@lib/modules';
import { User } from '@lib/db';
import { Context } from '@lib/graphql';

function authenticate(ctx: Context, user: User, token: string) {
  ctx.req.session.userId = user.id;
  ctx.req.session.token = token;
}

interface IUserResolver {
  getCurrentUser: core.FieldResolver<'Query', 'me'>;
  getUsers: core.FieldResolver<'Query', 'users'>;
  getUser: core.FieldResolver<'Query', 'user'>;
  registerUser: core.FieldResolver<'Mutation', 'registerUser'>;
  loginUser: core.FieldResolver<'Mutation', 'loginUser'>;
  logoutUser: core.FieldResolver<'Mutation', 'logoutUser'>;
}

const Resolver: IUserResolver = {
  getCurrentUser: async (_, __, { req }) => {
    const { userId, token } = req.session;
    if (!userId || !token) return { user: null, token: null };

    const user = await Accounts.getUser({ where: { id: userId } });
    return { user, token };
  },

  getUsers: (_, { where }) => {
    return Accounts.listUsers({ where });
  },

  getUser: (_, { where }) => {
    return Accounts.getUser({ where });
  },

  registerUser: async (_, { input }, ctx) => {
    const { user, token } = await Accounts.registerUser(input);
    authenticate(ctx, user, token);
    return { success: true, user, token };
  },

  loginUser: async (_, { input }, ctx) => {
    const { user, token } = await Accounts.loginUser(input);
    if (user && token) authenticate(ctx, user, token); // Check validity first
    return { success: !!user, user, token };
  },

  logoutUser: async (_, __, { req, res }) => {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) resolve(false);

        res.clearCookie('sid');
        resolve(true);
      });
    });
  },
};

export default Resolver;
