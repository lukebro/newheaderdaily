import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient;
}

const prisma = global.prisma || new PrismaClient();

// Prevent multiple instance of prisma in dev mode
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
