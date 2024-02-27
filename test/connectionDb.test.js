import { prismaClient } from "../src/applications/databases.js";

describe("prisma", () => {
  it("test connect to database", async () => {
    await prismaClient.$connect();
    console.log("database connect");
  });
});
