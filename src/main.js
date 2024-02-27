import http from "http";
import { app } from "./applications/app.js";
import dotenv from "dotenv";
import { logger } from "./applications/logging.js";
dotenv.config();

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
  logger.info("Application Running....");
});
