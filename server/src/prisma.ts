import { PrismaClient } from "@prisma/client";

export const myPrismaDB = new PrismaClient({
  log: ['query']
});
