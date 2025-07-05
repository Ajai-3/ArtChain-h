import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const config = {
  port: process.env.PORT,
  rabbitmq_URL: process.env.RABBITMQ_URL || "",
  frontend_URL: process.env.FRONTEND_URL || "",
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "",
    accessExpire: (process.env.JWT_ACCESS_EXPIRES_IN ||
      "5m") as jwt.SignOptions["expiresIn"],
      refreshExpire: (process.env.JWT_REFRESH_EXPIRES_IN ||
        "30d") as jwt.SignOptions["expiresIn"],
        emailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET || "",
        emailVerificationExpire: (process.env.EMAIL_VERIFICATION_EXPIRES_IN || "5m") as jwt.SignOptions["expiresIn"],

  },
};
