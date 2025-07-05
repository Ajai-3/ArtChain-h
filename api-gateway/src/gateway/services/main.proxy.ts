import { config } from "../../config/env";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

console.log("User service target:", config.services.main)

export const userProxy = createProxyMiddleware({
  target: config.services.main,
  changeOrigin: true,
  pathRewrite: { 
    "^/api/v1/users": "/api/v1/users"
  },
  on: { 
    proxyReq: (proxyReq, req, res) => {
      console.log(`[PROXY] Forwarding ${req.method} ${req.url} -> ${proxyReq.path}`);
    },
    error: (err, req, res) => {
      console.error('[PROXY ERROR]', err);
    }
  }
} as Options); 

export const adminProxy = createProxyMiddleware({
  target: config.services.main, 
  changeOrigin: true,
  pathRewrite: { "^/api/v1/admin": "/api/v1/admin" }
});