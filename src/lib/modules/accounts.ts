import prisma, { Prisma, User } from '@lib/db';
import argon from 'argon2';
import { createAccessToken } from '@lib/utils/token';

/* CRUD */
export function listUsers(opts?: Prisma.UserFindManyArgs) {
  return prisma.user.findMany(opts);
}

export function getUser(opts: Prisma.UserFindUniqueArgs) {
  return prisma.user.findUnique(opts);
}

/* Actions */
export async function registerUser(opts: Prisma.UserCreateInput) {
  const { password, ...otherFields } = opts;
  const newUser = await prisma.user.create({
    data: { ...otherFields, password: await argon.hash(password) },
  });
  const token = createAccessToken(newUser);

  return { user: newUser, token };
}

export async function loginUser(opts: { email: string; password: string }) {
  const { email, password } = opts;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return { user: null, token: null };

  const passwordsMatch = await argon.verify(user.password, password);
  if (passwordsMatch) {
    const token = createAccessToken(user);
    return { user, token };
  }

  return { user: null, token: null };
}

/* Validation */
