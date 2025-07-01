import { Request, Response } from "express";
import { TokenService } from "../services/TokenService";
import { registerUserSchema } from "../validators/user.validator";
import { RegisterUserUseCase } from "../../application/user/RegisterUserUseCase";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";

const repo = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(repo);

//#==================================================================================================================
//# REGISTER USER
//#==================================================================================================================
//# POST /api/users/register
//# Request body: { name: string, username: string, email: string, password: string }
//# This controller registers a new user.
//#==================================================================================================================
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await registerUserSchema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message || "Validation error";
      return res.status(400).json({ message });
    }

    const { name, username, email, password } = result.data;

    const user = await registerUserUseCase.execute(
      name,
      username,
      email,
      password
    );


    const payload = {
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

//#==================================================================================================================
//# LOGIN USER
//#==================================================================================================================
//# POST /api/users/login
//# Request body: { (email: string or username: string), password: string }
//# This controller logs in a user using their (email or username) and password.
//#==================================================================================================================
export const loginUser = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}