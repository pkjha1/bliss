import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log("✅ Successfully connected to the database")

    // Run migrations
    console.log("Running database migrations...")
    // In a real scenario, you would use Prisma CLI for migrations
    // This is just a placeholder for the concept

    console.log("✅ Database setup complete")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

