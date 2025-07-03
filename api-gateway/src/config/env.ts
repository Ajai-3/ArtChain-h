import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  services: {
    main: process.env.MAIN_SERVICE_URL
  }
};
