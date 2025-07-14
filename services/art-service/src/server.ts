import app from "./app";
import http from "http";
import { config } from "./3-infrastructure/config/env";
import { connectDB  } from "./3-infrastructure/config/mongo";

const server = http.createServer(app);

connectDB ()

server.listen(config.port, () => {
    console.log(`Art-Service is running on port ${config.port}...  ��`);
});