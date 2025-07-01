import app from "./app";
import http from "http";
import { config } from "./config/env";

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`User-Service is running on port ${config.port}...  ��`);
});
