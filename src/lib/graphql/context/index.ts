import { Request, Response } from 'express';
import { Session } from 'express-session';
import { loaders } from './dataloaders';

interface ExtendedRequest extends Request {
  session: Session & { userId?: number; token?: string };
}

export interface Context {
  req: ExtendedRequest;
  res: Response;
  loaders: typeof loaders;
}

export function createCtx(req, res): Context {
  return {
    req,
    res,
    loaders,
  };
}
