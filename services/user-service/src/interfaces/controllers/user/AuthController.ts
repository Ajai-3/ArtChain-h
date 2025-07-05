import { StartRegisterUseCase } from "./../../../application/user/StartRegisterUseCase";
import { Request, Response } from "express";
import { TokenService } from "../../services/TokenService";
import {
  loginUserSchema,
  registerUserSchema,
  startRegisterSchema,
} from "../../validators/user.validator";
import { AuthenticationError } from "../../../errors/AuthenticationError";
import { LoginUserUseCase } from "../../../application/user/LoginUserUseCase";
import { RegisterUserUseCase } from "../../../application/user/RegisterUserUseCase";
import { UserRepositoryImpl } from "../../../infrastructure/user/repositories/UserRepositoryImpl";
import { publishToQueue } from "../../../infrastructure/utils/rabbit";

const repo = new UserRepositoryImpl();
const loginUserUseCase = new LoginUserUseCase(repo);
const startRegisterUseCase = new StartRegisterUseCase(repo);
const registerUserUseCase = new RegisterUserUseCase(repo);

//#==================================================================================================================
//# REGISTER USER SEND EMAIL FOR VERIFICATION
//#==================================================================================================================
//# POST /api/v1/users/register
//# Request body: { name: string, username: string, email: string }
//# This controller registers create a link with token and send a verification email to the user.
//#==================================================================================================================
export const startRegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = startRegisterSchema.safeParse(req.body);

    console.log(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
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
        link: `http://localhost:5173/verify?token=${token}`,
      },
    });

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
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
  res: Response
): Promise<any> => {
  try {
    const { token, password } = req.body;

    const decoded = TokenService.verifyEmailVerificationToken(token);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Invalid or expired verification token" });
    }

    const result = registerUserSchema.safeParse({
      name: decoded.name,
      username: decoded.username,
      email: decoded.email,
      password,
    });

    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation error";
      return res.status(400).json({ message });
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
      accessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};

// await messageBroker.publishMessage('emails', {
//   type: 'PASSWORD_RESET',
//   email: user.email,
//   payload: {
//     name: user.name,
//     token: resetToken,
//     link: `${process.env.APP_URL}/reset?token=${resetToken}`
//   }
// });

//#==================================================================================================================
//# LOGIN USER
//#==================================================================================================================
//# POST /api/v1/users/login
//# Request body: { (email: string or username: string), password: string }
//# This controller logs in a user using their (email or username) and password.
//#==================================================================================================================
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation error";
      return res.status(400).json(message);
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user,
      accessToken,
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ message: error.message });
    }

    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
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
  res: Response
): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies.refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const payload = TokenService.verifyRefreshToken(refreshToken);
    console.log(payload);
    if (typeof payload !== "object" || payload === null) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = TokenService.generateAccessToken(payload);

    return res
      .status(200)
      .json({ message: "Access token refreshed successfully", accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//#==================================================================================================================
//# LOGOUT USER
//#==================================================================================================================
//# POST /api/v1/users/logout
//# Request headers: { authorization: Bearer accessToken }
//# This controller logs out a user by deleting their access token from the cookies.
//#==================================================================================================================
export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const payload = TokenService.verifyRefreshToken(refreshToken);
    if (typeof payload !== "object" || payload === null) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
