import { PrismaClient } from '@prisma/client';
// add prisma to the NodeJs global type

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
// Prevent multiple instances of Prisma Client in development
