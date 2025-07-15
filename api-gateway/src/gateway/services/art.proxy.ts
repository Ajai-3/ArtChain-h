import { config } from "../../config/env";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

console.log("User service target:", config.services.art);

export const artProxy = createProxyMiddleware({
  target: config.services.art,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(
        `[PROXY] Forwarding ${req.method} ${req.url} -> ${proxyReq.path}`
      );
    },
    error: (err, req, res) => {
      console.error("[PROXY ERROR]", err);
    },
  },
} as Options);
