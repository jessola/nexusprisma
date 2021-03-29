import { Response } from 'express';
import { User } from '@lib/db';
import * as token from './token';

/* Time helpers */
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export const isDev = process.env.NODE_ENV !== 'production';

/** Key values pertaining to auth cookies */
export const Constants = {
  IdTokenString: 'info',
  RefreshTokenString: 'refresh-token',
  IdTokenMaxAge: ONE_MINUTE * 10,
  RefreshTokenMaxAge: ONE_DAY * 7,
};

/**
 * Sets refresh and id tokens as cookies, allowing authenticated users to
 * refresh their access tokens (refresh), & enabling server-side rendering (id).
 * @param req
 * @param user
 */
export function setAuthCookies(res: Response, user: User) {
  res.cookie(Constants.RefreshTokenString, token.createRefreshToken(user), {
    httpOnly: true,
    maxAge: Constants.RefreshTokenMaxAge,
  });

  res.cookie(Constants.IdTokenString, token.createIdToken(user), {
    httpOnly: true,
    maxAge: Constants.IdTokenMaxAge,
  });
}

export { token };
