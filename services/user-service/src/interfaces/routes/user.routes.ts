import express from "express";
import { registerUser } from "../controllers/UserController.ts";

const router = express.Router();

router.post("/register", registerUser);

export default router;
