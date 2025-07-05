import Router from "express"
import { userProxy, adminProxy } from "./services/main.proxy"

const router = Router()

router.use("/api/v1/users", userProxy)
router.use("/api/v1/admin", adminProxy)

export default router