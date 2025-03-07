import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    // Find the token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      return NextResponse.json({ message: "Token has expired" }, { status: 400 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12)

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete the token
    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

