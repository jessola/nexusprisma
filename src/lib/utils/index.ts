import { nanoid } from 'nanoid/async';

export const isDev = process.env.NODE_ENV !== 'production';
export const createCsrfToken = () => nanoid(32);
