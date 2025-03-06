import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { verifyPayment } from "@/lib/razorpay"
import { sendDonationConfirmationEmail } from "@/lib/email"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, cause, isRecurring } = await req.json()

    // Verify payment signature
    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValid) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 })
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: amount / 100, // Convert from paise to rupees
        cause,
        isRecurring: isRecurring || false,
        paymentMethod: "razorpay",
        transactionId: razorpay_payment_id,
        status: "completed",
        userId: session.user.id,
      },
    })

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true },
    })

    if (user && user.email) {
      // Send donation confirmation email
      await sendDonationConfirmationEmail(
        { name: user.name || "Valued Donor", email: user.email },
        { amount: amount / 100, cause, isRecurring: isRecurring || false },
      )
    }

    return NextResponse.json({
      success: true,
      donation,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

