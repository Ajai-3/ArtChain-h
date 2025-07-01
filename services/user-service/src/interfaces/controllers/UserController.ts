import { Request, Response } from "express";

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
export const registerUser = async (req: Request, res: Response) => {
   try {
      const { name, username, email, password } = req.body;
    
   } catch (error) {
    
   }
}
