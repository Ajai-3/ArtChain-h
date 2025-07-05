import { config } from "../../config/env";
import { createProxyMiddleware } from "http-proxy-middleware";

export const userProxy = createProxyMiddleware({
  target: config.services.main, 
  changeOrigin: true,
  pathRewrite: { "^/api/v1/users": "/api/v1/users" }
});

export const adminProxy = createProxyMiddleware({
  target: config.services.main, 
  changeOrigin: true,
  pathRewrite: { "^/api/v1/admin": "/api/v1/admin" }
});