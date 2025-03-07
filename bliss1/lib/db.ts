import { PrismaClient } from "@prisma/client"
import { Pool } from "@neondatabase/serverless"

// PgBouncer compatibility for Neon
const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })

// Add PgBouncer compatibility settings
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: connectionString + "?pgbouncer=true&connect_timeout=15",
      },
    },
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

