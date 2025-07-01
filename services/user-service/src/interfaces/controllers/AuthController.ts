import { Request, Response } from "express";
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
    console.log(req.body);
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

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};
