import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import customTransport from "./optionals/external-transports.js";

export const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "all_%DATE%.log",
      zippedArchive: true,
      maxSize: "500m",
      maxFiles: "15d",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "error_%DATE%.log",
      zippedArchive: true,
      maxSize: "500m",
      maxFiles: "15d",
    }),
    new customTransport({
      level: "info",
    }),
  ],
});
