import express from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/admin/AuthAdminController';
const router = express.Router();

router.post("/login", loginAdmin)
router.post("/logout", logoutAdmin)

export default router;