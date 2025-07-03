import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../config/env";

const router = Router();

router.use(
  "/users",
  createProxyMiddleware({
    target: config.services.main,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/users": "/api/v1/users"
    }
  })
);

router.use(
  "/admin",
  createProxyMiddleware({
    target: config.services.main,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/admin": "/api/v1/admin"
    }
  })
);

export default router;
