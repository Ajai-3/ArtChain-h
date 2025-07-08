import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../services/TokenService";
import {
  currentPasswordNewPasswordSchema,
  loginUserSchema,
  passwordTokenSchema,
  registerUserSchema,
  startRegisterSchema,
} from "../../validators/user.validator";
import { ValidationError } from "../../../errors";
import { HttpStatus } from "../../../constants/httpStatus";
import { config } from "../../../3-infrastructure/config/env";
import { AUTH_MESSAGES } from "../../../constants/authMessages";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { publishToQueue } from "../../../3-infrastructure/utils/rabbit";
import { LoginUserUseCase } from "../../../2-application/user/LoginUserUseCase";
import { RegisterUserUseCase } from "../../../2-application/user/RegisterUserUseCase";
import { ResetPasswordUseCase } from "../../../2-application/user/ResetPasswordUseCase";
import { StartRegisterUseCase } from "./../../../2-application/user/StartRegisterUseCase";
import { ForgotPasswordUseCase } from "../../../2-application/user/ForgotPasswordUseCase";
import { UserRepositoryImpl } from "../../../3-infrastructure/repositories/user/UserRepositoryImpl";
import { ChangePasswordUseCase } from "../../../2-application/user/ChangePasswordUseCase";

const repo = new UserRepositoryImpl();
const loginUserUseCase = new LoginUserUseCase(repo);
const registerUserUseCase = new RegisterUserUseCase(repo);
const resetPasswordUseCase = new ResetPasswordUseCase(repo);
const startRegisterUseCase = new StartRegisterUseCase(repo);
const changePasswordUseCase = new ChangePasswordUseCase(repo);
const forgotPasswordUseCase = new ForgotPasswordUseCase(repo);

//#==================================================================================================================
//# REGISTER USER SEND EMAIL FOR VERIFICATION
//#==================================================================================================================
//# POST /api/v1/users/register
//# Request body: { name: string, username: string, email: string }
//# This controller registers create a link with token and send a verification email to the user.
//#==================================================================================================================
export const startRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = startRegisterSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: result.error.issues[0]?.message });
    }

    const { name, username, email } = result.data;

    const payload = await startRegisterUseCase.execute(name, username, email);

    const token = TokenService.genarateEmailVerificationToken(payload);

    await publishToQueue("emails", {
      type: "VERIFICATION",
      email,
      payload: {
        name,
        token,
        link: `${config.frontend_URL}/verify?token=${token}`,
      },
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.VERIFICATION_EMAIL_SENT });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# REGISTER USER
//#==================================================================================================================
//# POST /api/v1/users/register
//# Request body: { name: string, username: string, email: string, password: string }
//# This controller registers a new user.
//#==================================================================================================================
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.ALL_FIELDS_REQUIRED });
    }

    const decoded = TokenService.verifyEmailVerificationToken(token);
    if (!decoded) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: AUTH_MESSAGES.INVALID_VERIFICATION_TOKEN });
    }

    const result = registerUserSchema.safeParse({
      name: decoded.name,
      username: decoded.username,
      email: decoded.email,
      password,
    });

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

    const { name, username, email } = result.data;

    const user = await registerUserUseCase.execute(
      name,
      username,
      email,
      password
    );

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const refreshToken = TokenService.generateRefreshToken(payload);
    const accessToken = TokenService.generateAccessToken(payload);

    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.CREATED).json({
      message: AUTH_MESSAGES.REGISTRATION_SUCCESS,
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# LOGIN USER
//#==================================================================================================================
//# POST /api/v1/users/login
//# Request body: { (email: string or username: string), password: string }
//# This controller logs in a user or artist using their (email or username) and password.
//#==================================================================================================================
export const loginUser = async (
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

    const user = await loginUserUseCase.execute(identifier, password);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const refreshToken = TokenService.generateRefreshToken(payload);
    const accessToken = TokenService.generateAccessToken(payload);

    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# FORGET PASSWORD
//#==================================================================================================================
//# POST /api/v1/users/forgot-password
//# Request body: { email: string }
//# This controller sends a password reset email to the user's registered email address.
//#==================================================================================================================
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const identifier = req.body.identifier as string;

    if (!identifier) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.ALL_FIELDS_REQUIRED });
    }

    const user = await forgotPasswordUseCase.execute(identifier);

    const token = TokenService.genarateEmailVerificationToken({
      name: user.name,
      username: user.username,
      email: user.email,
    });

    await publishToQueue("emails", {
      type: "PASSWORD_RESET",
      email: user.email,
      payload: {
        name: user.name,
        token,
        link: `${config.frontend_URL}/reset-password?token=${token}`,
      },
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.RESET_EMAIL_SENT });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# RESET USER PASSWORD
//#==================================================================================================================
//# POST /api/v1/users/reset-password
//# Request body: { token: string, password: string }
//# This controller resets a user's password using their password reset token.
//#==================================================================================================================
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = passwordTokenSchema.safeParse(req.body);

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

    const { token, password } = result.data;

    const decoded = TokenService.verifyEmailVerificationToken(token);
    if (!decoded) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: AUTH_MESSAGES.INVALID_RESET_TOKEN });
    }

    await resetPasswordUseCase.execute(decoded.email, password);

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# CHAGE PASSWORD
//#==================================================================================================================
//# POST /api/v1/users/change-password
//# Request headers: { authorization: Bearer accessToken }
//# Request body: { currentPassword: string, newPassword: string }
//# This controller changes a user's password using their current password.
//#==================================================================================================================
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = currentPasswordNewPasswordSchema.safeParse(req.body);

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

    const { currentPassword, newPassword } = result.data;

    const id = "cmckaxexr0000bsa8riu3xhdv";

    await changePasswordUseCase.execute(id, currentPassword, newPassword);

    return res
      .status(HttpStatus.OK)
      .json({ message: AUTH_MESSAGES.PASSWORD_UPDATED });
  } catch (error) {
    next(error);
  }
};

//#==================================================================================================================
//# REFRESH USER ACCESS TOKEN
//#==================================================================================================================
//# POST /api/v1/users/refresh-token
//# Request headers: { authorization: Bearer refreshToken }
//# This controller refreshes a user's access token using their refresh token.
//#==================================================================================================================
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED });
    }

    const payload = TokenService.verifyRefreshToken(refreshToken);
    console.log(payload);
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
//# LOGOUT USER
//#==================================================================================================================
//# POST /api/v1/users/logout
//# Request headers: { authorization: Bearer accessToken }
//# This controller logs out a user by deleting their refresh token from the cookies.
//#==================================================================================================================
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies.userRefreshToken;
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

    res.clearCookie("userRefreshToken", {
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
