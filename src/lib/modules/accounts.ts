import prisma from '@lib/db';
import { Prisma } from '@prisma/client';
import argon from 'argon2';

type Credentials = { userId: number };

async function registerUser(opts: Prisma.UserCreateInput) {
  const user = await prisma.user.create({ data: opts });
  return { data: { user } };
}

async function loginUser(opts: { email: string; password: string }) {
  const { email, password } = opts;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: false };

  const passwordsMatch = await argon.verify(user.password, password);
  return passwordsMatch ? { success: true, user } : { success: false };
}

async function deleteUser(auth: Credentials) {
  try {
    await prisma.user.delete({ where: { id: auth.userId } });

    return { deleted: true };
  } catch (err) {
    return { deleted: false };
  }
}

export { registerUser, loginUser, deleteUser };
