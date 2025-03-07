import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

// GET /api/books/[bookId] - Get a book by ID
export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: params.bookId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        chapters: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// PATCH /api/books/[bookId] - Update a book
export async function PATCH(req: Request, { params }: { params: { bookId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, description, coverImage, category, status } = await req.json()

    const book = await prisma.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        title,
        description,
        coverImage,
        category,
        status,
      },
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// DELETE /api/books/[bookId] - Delete a book
export async function DELETE(req: Request, { params }: { params: { bookId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prisma.book.delete({
      where: {
        id: params.bookId,
      },
    })

    return NextResponse.json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

