import { TokenService } from "../services/TokenService";
import { HttpStatus } from "../../constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { ForbiddenError, UnauthorizedError } from "../../errors";

export const UserAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const decoded = TokenService.verifyAccessToken(accessToken);

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
    }

    if (decoded.role !== "user" && decoded.role !== "artist") {
      throw new ForbiddenError(ERROR_MESSAGES.INVALID_USER_ROLE);
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ 
        success: false, 
        error: error.message 
      });
    }
    if (error instanceof ForbiddenError) {
      return res.status(HttpStatus.FORBIDDEN).json({ 
        success: false,
        error: error.message 
      });
    }
    console.error("Authentication error:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ERROR_MESSAGES.SERVER_ERROR
    });
  }
};
