import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma=client;
}

export default client;

// this code is to prevent nextJS from making 
// multiple Prisma Clients during development
// simple hack for making a singleton using global variable