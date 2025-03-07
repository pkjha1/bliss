import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function main() {
  try {
    console.log("Starting database migration...")

    // Run Prisma migrations
    const { stdout: migrateStdout, stderr: migrateStderr } = await execAsync("npx prisma migrate deploy")

    if (migrateStderr) {
      console.error("Migration stderr:", migrateStderr)
    }

    console.log("Migration stdout:", migrateStdout)

    // Generate Prisma client
    const { stdout: generateStdout, stderr: generateStderr } = await execAsync("npx prisma generate")

    if (generateStderr) {
      console.error("Client generation stderr:", generateStderr)
    }

    console.log("Client generation stdout:", generateStdout)

    console.log("Database migration completed successfully!")
  } catch (error) {
    console.error("Error during database migration:", error)
    process.exit(1)
  }
}

main()

