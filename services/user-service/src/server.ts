import app from "./app.ts";
import http from "http";
import { config } from "./config/env.ts";

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`User-Service is running on port ${config.port}...  ��`);
});
