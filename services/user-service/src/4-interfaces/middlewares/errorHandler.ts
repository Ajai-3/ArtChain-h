import { Request, Response, NextFunction } from "express";
import { AppError, InternalServerError, ValidationError } from "../../errors/index";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { config } from "../../3-infrastructure/config/env";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const error =
    err instanceof AppError
      ? err
      : new InternalServerError(ERROR_MESSAGES.SERVER_ERROR);


  const response = {
    status: "error",
    error: {
      code: error.name,
      statusCode: error.statusCode, 
      message: error.message,
      ...(error instanceof ValidationError && { details: (error as any).details }),
      ...(!config.isProduction && {
        stack: error.stack,
        path: req.path,
      }),
    },
  };

  console.log("Backend sending error response:", {
    statusCode: error.statusCode,
    body: {
      status: "error",
      error: {
        code: error.name,
        message: error.message,
        statusCode: error.statusCode,
      },
    },
  });

  res.status(error.statusCode).json(response);
};
