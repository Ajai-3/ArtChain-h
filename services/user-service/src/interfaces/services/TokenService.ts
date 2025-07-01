import jwt from "jsonwebtoken";
import { config } from "../../config/env";

export class TokenService {
  static generateAccessToken(payload: object): string {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpire,
    });
  }

  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpire,
    });
  }

  static verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.accessSecret);
    } catch (err) {
      return null;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret);
    } catch (err) {
      return null;
    }
  }
}
