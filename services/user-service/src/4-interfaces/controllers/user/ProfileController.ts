import { UnauthorizedError, ValidationError } from "../../../errors";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { updateUserSchema } from "../../validators/user.validator";
import { UserRepositoryImpl } from "../../../3-infrastructure/repositories/user/UserRepositoryImpl";
import { UpdateProfileUserUseCase } from "../../../2-application/user/UpdateProfileUserUseCase";
import { HttpStatus } from "../../../constants/httpStatus";
import { pPROFILE_MESSAGES } from "../../../constants/profileMessages";

const repo = new UserRepositoryImpl();
const updateProfileUserUseCase = new UpdateProfileUserUseCase(repo);

//#===================================================================================================================
//# GET PROFILE
//#===================================================================================================================
//# GET /api/v1/profile
//# Request headers: { authorization: Bearer accessToken }
//# This controller returns the user's profile information.
//#===================================================================================================================

//#===================================================================================================================
//# GET OTHERS PROFILE
//#===================================================================================================================
//# GET /api/v1/profile/:userId
//# Request headers: { authorization: Bearer accessToken }
//# This controller returns the profile information of another user.
//#===================================================================================================================

//#===================================================================================================================
//# UPDATE PROFILE
//#===================================================================================================================
//# PATCH /api/v1/profile
//# Request headers: { authorization: Bearer accessToken }
//# Request body: { name: string, username: string, profileImage: string, bannerImage: string,
//# bagroundImage: string,  bio: string, country: string }
//# This controller updates the user's profile information.
//#===================================================================================================================
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
    }


    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      const validationErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      console.log(validationErrors)
      throw new ValidationError(
        ERROR_MESSAGES.VALIDATION_FAILED,
        validationErrors
      );
    }

    const user = await updateProfileUserUseCase.execute(userId, result.data);

    return res
      .status(HttpStatus.OK)
      .json({ message: pPROFILE_MESSAGES.PROFILE_UPDATED, user });
  } catch (error) {
    next(error);
  }
};
