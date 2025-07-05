import express from "express";

import { refreshToken, loginUser, logoutUser, registerUser, startRegisterUser, forgotPassword } from "../controllers/user/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/start-register", startRegisterUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.get("/refresh-token", refreshToken)
router.post("/logout", logoutUser)

export default router;
