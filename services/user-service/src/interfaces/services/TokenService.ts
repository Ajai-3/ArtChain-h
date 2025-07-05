import jwt, { Secret } from "jsonwebtoken";
import { config } from "../../infrastructure/config/env";
interface DecodedToken {
  name: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export class TokenService {
  static generateAccessToken(payload: object): string {
    const { exp, iat, ...cleanPayload } = payload as any;
    return jwt.sign(cleanPayload, config.jwt.accessSecret as string, {
      expiresIn: config.jwt.accessExpire,
    });
  }

  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, config.jwt.refreshSecret as string, {
      expiresIn: config.jwt.refreshExpire,
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

  static genarateEmailVerificationToken(payload: object): string {
    return jwt.sign(payload, config.jwt.emailVerificationSecret as string, {
      expiresIn: config.jwt.emailVerificationExpire,
    });
  }

  static verifyEmailVerificationToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.emailVerificationSecret as string) as DecodedToken;
    } catch (err) {
      return null;
    }
  }
}
