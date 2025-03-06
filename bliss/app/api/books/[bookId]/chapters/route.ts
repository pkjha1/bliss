import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/books/[bookId]/chapters - Get all chapters for a book
export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId: params.bookId,
      },
      orderBy: {
        order: "asc",
      },
    })

    return NextResponse.json(chapters)
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// POST /api/books/[bookId]/chapters - Create a new chapter
export async function POST(req: Request, { params }: { params: { bookId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, content, order, status } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 })
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: {
        id: params.bookId,
      },
    })

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    // Get the highest order if not provided
    let chapterOrder = order
    if (!chapterOrder) {
      const highestOrder = await prisma.chapter.findFirst({
        where: {
          bookId: params.bookId,
        },
        orderBy: {
          order: "desc",
        },
        select: {
          order: true,
        },
      })

      chapterOrder = highestOrder ? highestOrder.order + 1 : 1
    }

    const chapter = await prisma.chapter.create({
      data: {
        title,
        content,
        order: chapterOrder,
        status: status || "draft",
        bookId: params.bookId,
      },
    })

    return NextResponse.json(chapter, { status: 201 })
  } catch (error) {
    console.error("Error creating chapter:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

