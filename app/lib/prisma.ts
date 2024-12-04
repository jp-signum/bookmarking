import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
} else {
  // Prisma should not be used on the client
  throw new Error("Prisma is not supported on the client side.");
}

export default prisma;
