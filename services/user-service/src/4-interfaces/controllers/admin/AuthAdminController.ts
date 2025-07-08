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

    res.cookie("refreshToken", refreshToken, {
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
