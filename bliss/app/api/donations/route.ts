import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/donations - Get all donations (admin only)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const donations = await prisma.donation.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// POST /api/donations - Create a new donation
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { amount, cause, isRecurring, paymentMethod, transactionId } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Valid amount is required" }, { status: 400 })
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        cause,
        isRecurring: isRecurring || false,
        paymentMethod,
        transactionId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(donation, { status: 201 })
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

