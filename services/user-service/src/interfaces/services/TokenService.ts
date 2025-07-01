import jwt, { Secret } from "jsonwebtoken";
import { config } from "../../config/env";

export class TokenService {
  static generateAccessToken(payload: object): string {
     const { exp, iat, ...cleanPayload } = payload as any;
    return jwt.sign(cleanPayload , config.jwt.accessSecret as string, {
      expiresIn: parseInt(config.jwt.accessExpire) ,
    });
  }

  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, config.jwt.refreshSecret as string, {
      expiresIn: parseInt(config.jwt.refreshExpire),
    });
  }

  static verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.accessSecret as string);
    } catch (err) {
      return null;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret as string);
    } catch (err) {
      return null;
    }
  }
}
