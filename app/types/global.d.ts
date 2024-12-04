import { PrismaClient } from "@prisma/client";

declare global {
  // Allow `global.prisma` to be of type `PrismaClient`
  var prisma: PrismaClient | undefined;
}
