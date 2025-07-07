import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../../errors/index';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { config } from '../../3-infrastructure/config/env';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Normalize error
  const error = err instanceof AppError 
    ? err 
    : new InternalServerError(ERROR_MESSAGES.SERVER_ERROR);

  // Prepare response
  const response = {
    status: 'error',
    message: error.message,
    ...(!config.isProduction && { stack: error.stack })
  };

  // Log error
  console.error(`[${error.name}]`, {
    message: error.message,
    path: req.path,
    status: error.statusCode,
    ...(!config.isProduction && { stack: error.stack })
  });

  // Send response
  res.status(error.statusCode).json(response);
};