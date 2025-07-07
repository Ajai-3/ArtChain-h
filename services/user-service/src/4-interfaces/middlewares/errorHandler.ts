import { HttpStatus } from '../../constants/httpStatus';
import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../../errors/index';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: AppError;

  if (!(err instanceof AppError)) {
    if (err instanceof SyntaxError && 'body' in err) {
      error = new BadRequestError('Invalid JSON payload');
    } else if (err instanceof Error) {
      error = new InternalServerError(err.message);
    } else {
      error = new InternalServerError('An unknown error occurred');
    }
  } else {
    error = err;
  }

  if (!error.isOperational || error.statusCode >= 500) {
    logger.error('ERROR:', {
      error: error.message,
      stack: error.stack,
      request: {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers
      }
    });
  } else {
    logger.warn('Operational Error:', error.message);
  }

  const response: Record<string, unknown> = {
    success: false,
    error: error.message,
    code: error.statusCode,
    name: error.name
  };

  if (error.details) {
    response.details = error.details;
  }
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};