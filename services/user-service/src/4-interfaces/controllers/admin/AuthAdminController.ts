import { ValidationError } from "../../../errors";
import { Request, Response, NextFunction } from "express";
import { loginUserSchema } from "../../validators/user.validator";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { LoginAdminUseCase } from "../../../2-application/admin/LoginAdminUseCase";
import { AdminRepositoryImpl } from "./../../../3-infrastructure/repositories/admin/AdminRepositoryImpl";
import { TokenService } from "../../services/TokenService";
import { HttpStatus } from "../../../constants/httpStatus";
import { AUTH_MESSAGES } from "../../../constants/authMessages";

const repo = new AdminRepositoryImpl();
const loginAdminUseCase = new LoginAdminUseCase(repo);

//#===================================================================================================================
//# ADMIN LOGIN
//#===================================================================================================================
//# POST /api/v1/admin/login
//# Request body: { identifer: string, password: string }
//# This controller logs in a admin using their (email or username) and password.
//#===================================================================================================================
export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      const validationErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      throw new ValidationError(
        ERROR_MESSAGES.VALIDATION_FAILED,
        validationErrors
      );
    }

    const { identifier, password } = result.data;

    const admin = await loginAdminUseCase.execute(identifier, password);

    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const refreshToken = TokenService.generateRefreshToken(payload);
    const accessToken = TokenService.generateAccessToken(payload);

    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      admin,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

//#===================================================================================================================
//# ADMIN REFRESH TOKEN
//#===================================================================================================================
//# POST /api/v1/admin/refresh-token
//# Request headers: { authorization: Bearer refreshToken }
//# This controller refreshes a admin's access token using their refresh token.
//#===================================================================================================================
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies.adminRefreshToken;

    if (!refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED });
    }

    const payload = TokenService.verifyRefreshToken(refreshToken);

    if (typeof payload !== "object" || payload === null) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.INVALID_REFRESH_TOKEN });
    }

    const accessToken = TokenService.generateAccessToken(payload);

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.TOKEN_REFRESH_SUCCESS, accessToken });
  } catch (error) {
    next(error);
  }
};


//#==================================================================================================================
//# ADMIN LOGOUT
//#==================================================================================================================
//# POST /api/v1/admin/logout
//# Request headers: { authorization: Bearer accessToken }
//# This controller logs out a admin by deleting their refresh token from the cookies.
//#==================================================================================================================
export const logoutAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies.adminRefreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED });
    }

    const payload = TokenService.verifyRefreshToken(refreshToken);
    if (typeof payload !== "object" || payload === null) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.INVALID_REFRESH_TOKEN });
    }

    res.clearCookie("adminRefreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.LOGOUT_SUCCESS });
  } catch (error) {
    next(error);
  }
};
