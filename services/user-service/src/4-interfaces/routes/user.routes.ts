import express from "express";

import { refreshToken, loginUser, logoutUser, registerUser, startRegisterUser, forgotPassword, resetPassword, changePassword } from "../controllers/user/AuthController";
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/start-register", startRegisterUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.patch("/reset-password", resetPassword)
router.patch("/change-password", UserAuthMiddleware, changePassword)
router.get("/refresh-token", refreshToken)
router.post("/logout", logoutUser)

export default router;
