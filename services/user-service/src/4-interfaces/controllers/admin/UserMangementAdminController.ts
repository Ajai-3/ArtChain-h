import { Request, Response, NextFunction } from "express";
import { GetAllUsersUseCase } from "../../../2-application/admin/GetAllUsersUseCase";
import { AdminRepositoryImpl } from "../../../3-infrastructure/repositories/admin/AdminRepositoryImpl";
import { HttpStatus } from "../../../constants/httpStatus";
import { USER_MESSAGES } from "../../../constants/userMessages";

const repo = new AdminRepositoryImpl();
const getAllUsersUseCase = new GetAllUsersUseCase(repo);

//#===================================================================================================================
//# USER MANAGEMENT
//#===================================================================================================================
//# GET /api/v1/admin/users
//# Request headers: { authorization: Bearer accessToken }
//# This controller returns a list of all users in the system.
//#===================================================================================================================
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search, sortBy, sortOrder } = req.query;

    const result = await getAllUsersUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      ...(search && { search: String(search) }),
      ...(sortBy && { sortBy: String(sortBy) }),
      ...(sortOrder && { sortOrder: sortOrder === "desc" ? "desc" : "asc" }),
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: USER_MESSAGES.FETCH_SUCCESS,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

//#===================================================================================================================
//# CHANGE USER STATUS
//#===================================================================================================================
//# POST /api/v1/admin/users/:userId/status
//# Request headers: { authorization: Bearer accessToken }
//# Request body: { status: string }
//# This controller changes the status of a user in the system.
//#===================================================================================================================
export const changeUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
