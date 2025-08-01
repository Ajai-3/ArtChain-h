import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  isProduction: process.env.NODE_ENV === "production",
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "",
  },
};
