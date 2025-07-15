import cors from "cors";
import express from "express";
import cookeParser from "cookie-parser";
import mainRoute from "./gateway/main.route";
import { rateLimiter } from "./middleware/RateLimiter";
import { config } from "./config/env";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cookeParser());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use(
  cors({
    origin: config.frontend_url,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
  })
);

// === USER SERVICE ===
app.use("/api/v1/users", createProxyMiddleware({
  target: "http://localhost:3001/api/v1/users",
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/user": "/api/v1/user",
  },
}));

// === ADMIN SERVICE ===
app.use("/api/v1/admin", createProxyMiddleware({
  target: "http://localhost:3001/api/v1/admin",
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/admin": "/api/v1/admin",
  },
}));

// === ARTWORK SERVICE ===
app.use("/api/v1/art", createProxyMiddleware({
  target: "http://localhost:3003/api/v1/art",
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    console.log("➡️ Forwarding to:", proxyReq.getHeader("host") + req.url);
  },
} as any));
// app.use("/", mainRoute);

export default app;
