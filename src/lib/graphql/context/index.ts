import { Request, Response } from 'express';
import { loaders } from './dataloaders';

export interface ExtendedRequest extends Request {
  userId?: number;
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
