import { enumType } from 'nexus';

export const OrderByArg = enumType({
  name: 'OrderByArg',
  members: {
    asc: 'asc',
    desc: 'desc',
  },
});
