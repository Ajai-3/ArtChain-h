import { Request, Response, NextFunction } from "express"

//#===================================================================================================================
//# USER MANAGEMENT
//#===================================================================================================================
//# GET /api/v1/admin/users
//# Request headers: { authorization: Bearer accessToken }
//# This controller returns a list of all users in the system.
//#===================================================================================================================
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//#===================================================================================================================
//# CHANGE USER STATUS
//#===================================================================================================================
//# POST /api/v1/admin/users/:userId/status
//# Request headers: { authorization: Bearer accessToken }
//# Request body: { status: string }
//# This controller changes the status of a user in the system.
//#===================================================================================================================
export const changeUserStatus = async (req: Request, res: Response, next: NextFunction) => {}