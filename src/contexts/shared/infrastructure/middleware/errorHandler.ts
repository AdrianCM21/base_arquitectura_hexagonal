
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http/HttpException';
import { config } from '../../../../config';
import { InternalServerError } from '../exceptions/http/InternalServerError';
import { BadRequest } from '../exceptions/http/BadRequest';
import { InvalidArgumentError } from '../../domain/value-object/InvalidArgumentError';


export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof HttpException)
    return error.handle(res);
  if (error instanceof SyntaxError)
    return (new BadRequest()).handle(res);
  if (error instanceof InvalidArgumentError)
    return (new BadRequest(error.message)).handle(res);
  
  console.error(error);
  const genericError = new InternalServerError();
  return genericError.handle(res);
  
}

