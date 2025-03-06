import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createOrder } from "@/lib/razorpay"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { amount, currency = "INR" } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Valid amount is required" }, { status: 400 })
    }

    const order = await createOrder(amount, currency)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount / 100, // Convert back to rupees
      currency: order.currency,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

