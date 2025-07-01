import dotenv from 'dotenv';
dotenv.config();


export const config = {
    port: process.env.PORT,
    jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || '',
    refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    accessExpire: process.env.JWT_ACCESS_EXPIRES_IN || '5m',
    refreshExpire: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  }
}