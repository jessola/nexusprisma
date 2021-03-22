import { objectType, queryType } from 'nexus';
import { list, arg, nullable } from 'nexus';

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
        return ctx.prisma.user.findUnique({ where });
      },
    });
  },
});
