import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/teachings - Get all teachings
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const whereClause: any = {}

    if (category) {
      whereClause.category = category
    }

    if (type) {
      whereClause.type = type
    }

    if (status) {
      whereClause.status = status
    } else {
      // By default, only return published teachings
      whereClause.status = "published"
    }

    const teachings = await prisma.teaching.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return NextResponse.json(teachings)
  } catch (error) {
    console.error("Error fetching teachings:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// POST /api/teachings - Create a new teaching
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, description, content, type, mediaUrl, thumbnailUrl, duration, category, tags, status } =
      await req.json()

    if (!title || !type) {
      return NextResponse.json({ message: "Title and type are required" }, { status: 400 })
    }

    const teaching = await prisma.teaching.create({
      data: {
        title,
        description,
        content,
        type,
        mediaUrl,
        thumbnailUrl,
        duration,
        category,
        tags,
        status: status || "draft",
        authorId: session.user.id,
      },
    })

    return NextResponse.json(teaching, { status: 201 })
  } catch (error) {
    console.error("Error creating teaching:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

