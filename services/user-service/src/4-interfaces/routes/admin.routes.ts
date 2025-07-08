import express from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/admin/AuthAdminController';
import { changeUserStatus, getAllUsers } from '../controllers/admin/UserMangementAdminController';
const router = express.Router();

router.post("/login", loginAdmin)
router.post("/logout", logoutAdmin)

//# User mangement
router.get("/users", getAllUsers)
router.post("/users/:userId/status", changeUserStatus)

export default router;