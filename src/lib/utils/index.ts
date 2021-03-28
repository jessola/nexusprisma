export const isDev = process.env.NODE_ENV !== 'production';

export enum Constants {
  IdTokenString = 'info',
  RefreshTokenString = 'refresh-token',
}

export * as token from './token';
