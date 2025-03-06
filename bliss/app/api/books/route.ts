import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/books - Get all books
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const whereClause: any = {}

    if (category) {
      whereClause.category = category
    }

    if (status) {
      whereClause.status = status
    } else {
      // By default, only return published books
      whereClause.status = "published"
    }

    const books = await prisma.book.findMany({
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

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// POST /api/books - Create a new book
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, description, coverImage, category, status } = await req.json()

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        coverImage,
        category,
        status: status || "draft",
        authorId: session.user.id,
      },
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

