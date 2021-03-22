import { extendType, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('email');
    t.string('name', {
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    });
  },
});

// export const userQueries = extendType({
//   type: 'Query',
//   definition(t) {
//     t.field('allUsers', {
//       type: list('User'),
//       resolve: (_, __, ctx) => {
//         return [];
//       },
//     });
//   },
// });
