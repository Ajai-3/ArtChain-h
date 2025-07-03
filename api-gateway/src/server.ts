import app from "./app";
import http from "http";
import { config } from "./config/env";

const PORT = config.port;


const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`API gateway running at http://localhost:${PORT}`);
})
