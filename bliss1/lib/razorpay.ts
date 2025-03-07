import Razorpay from "razorpay"

// Initialize Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create a Razorpay order
export async function createOrder(amount: number, currency = "INR") {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    return order
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

// Verify Razorpay payment
export function verifyPayment(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) {
  const crypto = require("crypto")
  const secret = process.env.RAZORPAY_KEY_SECRET!

  // Generating the HMAC signature
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex")

  // Comparing the signatures
  return generated_signature === razorpay_signature
}

