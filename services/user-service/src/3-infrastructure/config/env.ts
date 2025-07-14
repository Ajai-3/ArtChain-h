import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: process.env.PORT || "3000",
  rabbitmq_URL: process.env.RABBITMQ_URL || "",
  frontend_URL: process.env.FRONTEND_URL || "",
  isProduction: process.env.NODE_ENV === "production",
  jwt: {
    accessSecret: getRequiredEnv("JWT_ACCESS_SECRET"),
    refreshSecret: getRequiredEnv("JWT_REFRESH_SECRET"),
    accessExpire: (process.env.JWT_ACCESS_EXPIRES_IN || "5m") as jwt.SignOptions["expiresIn"],
    refreshExpire: (process.env.JWT_REFRESH_EXPIRES_IN || "30d") as jwt.SignOptions["expiresIn"],
    emailVerificationSecret: getRequiredEnv("EMAIL_VERIFICATION_SECRET"),
    emailVerificationExpire: (process.env.EMAIL_VERIFICATION_EXPIRES_IN || "5m") as jwt.SignOptions["expiresIn"],
  },
  firebase: {
    projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
    clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  },
};