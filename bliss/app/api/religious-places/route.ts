import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/religious-places - Get all religious places
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const state = searchParams.get("state")
    const type = searchParams.get("type")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const whereClause: any = {}

    if (state) {
      whereClause.state = state
    }

    if (type) {
      whereClause.type = type
    }

    const places = await prisma.religiousPlace.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            temples: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      take: limit,
    })

    return NextResponse.json(places)
  } catch (error) {
    console.error("Error fetching religious places:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// POST /api/religious-places - Create a new religious place (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, description, image, state, type, coordinates, address, phone, website } = await req.json()

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 })
    }

    const place = await prisma.religiousPlace.create({
      data: {
        name,
        description,
        image,
        state,
        type,
        coordinates,
        address,
        phone,
        website,
      },
    })

    return NextResponse.json(place, { status: 201 })
  } catch (error) {
    console.error("Error creating religious place:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

