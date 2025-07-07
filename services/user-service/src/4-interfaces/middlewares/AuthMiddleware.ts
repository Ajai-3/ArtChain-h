import { UnauthorizedError } from "../../errors";
import { TokenService } from "../services/TokenService";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export const AuthMiddleware = async (
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

   console.log(decoded);
    
    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ error: error.message });
    }
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
