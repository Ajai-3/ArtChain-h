import express from "express";

import { refreshToken, loginUser, logoutUser, registerUser, startRegisterUser, forgotPassword, resetPassword } from "../controllers/user/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/start-register", startRegisterUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)
router.get("/refresh-token", refreshToken)
router.post("/logout", logoutUser)

export default router;
