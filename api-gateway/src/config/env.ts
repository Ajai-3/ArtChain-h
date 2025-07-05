import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  frontend_url: process.env.FRONTEND_URL,
  services: {
    main: process.env.MAIN_SERVICE_URL
  }
};
