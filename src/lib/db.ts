import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;
export { Prisma, User };
