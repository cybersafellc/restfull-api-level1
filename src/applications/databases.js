import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
  errorFormat: "pretty",
  log: ["info", "warn", "error", "query"],
});
