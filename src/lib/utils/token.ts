import jwt from 'jsonwebtoken';
import { User } from '@lib/db';

const {
  ACCESS_TOKEN_SECRET,
  ID_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

enum TokenExpiry {
  Access = '10m',
  Id = '10m',
  Refresh = '7d',
}

export function createAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
    expiresIn: TokenExpiry.Access,
  });
}

export function createIdToken(user: User) {
  const { id, firstName, lastName, email, joinedAt } = user;
  const payload = { id, firstName, lastName, email, joinedAt };

  return jwt.sign(payload, ID_TOKEN_SECRET!, { expiresIn: TokenExpiry.Id });
}

export function createRefreshToken(user: User, version = 1) {
  return jwt.sign({ userId: user.id, version }, REFRESH_TOKEN_SECRET!, {
    expiresIn: TokenExpiry.Refresh,
  });
}

export function verifyAccessToken(token: string) {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET!);
    return payload as { userId: number };
  } catch {
    return undefined;
  }
}

export function verifyRefreshToken(token: string): boolean {
  try {
    jwt.verify(token, REFRESH_TOKEN_SECRET!);
    return true;
  } catch {
    return false;
  }
}
