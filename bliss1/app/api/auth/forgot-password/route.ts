import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import prisma from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset link" },
        { status: 200 },
      )
    }

    // Generate a reset token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    // Save the token in the database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    // Send password reset email
    await sendPasswordResetEmail({ email }, token)

    return NextResponse.json(
      { message: "If your email is registered, you will receive a password reset link" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

