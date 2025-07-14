import express from "express";

import {
  refreshToken,
  loginUser,
  logoutUser,
  registerUser,
  startRegisterUser,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuthUser,
} from "../controllers/user/AuthController";
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware";
import { updateProfile } from "../controllers/user/ProfileController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.get("/refresh-token", refreshToken);
router.post("/google-auth", googleAuthUser);
router.patch("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/start-register", startRegisterUser);
router.patch("/change-password", UserAuthMiddleware, changePassword);

router.patch("/profile", UserAuthMiddleware, updateProfile);

export default router;
