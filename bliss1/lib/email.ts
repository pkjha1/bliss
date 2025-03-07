import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import * as React from "react"

// Email templates
import WelcomeEmail from "@/emails/welcome-email"
import PasswordResetEmail from "@/emails/password-reset-email"
import DonationConfirmationEmail from "@/emails/donation-confirmation-email"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// Verify connection configuration
try {
  transporter
    .verify()
    .then(() => {
      console.log("Ready to send emails")
    })
    .catch((error) => {
      console.error("Error verifying email connection:", error)
    })
} catch (error) {
  console.error("Failed to create email transporter:", error)
}

type EmailOptions = {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text: text || "",
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

// Helper functions for specific email types
export async function sendWelcomeEmail(user: { name: string; email: string }) {
  const html = render(
    React.createElement(WelcomeEmail, {
      name: user.name || "Valued Member",
    }),
  )

  return sendEmail({
    to: user.email,
    subject: "Welcome to Blissful Life",
    html,
  })
}

export async function sendPasswordResetEmail(user: { email: string }, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

  const html = render(
    React.createElement(PasswordResetEmail, {
      resetUrl,
    }),
  )

  return sendEmail({
    to: user.email,
    subject: "Reset your password",
    html,
  })
}

export async function sendDonationConfirmationEmail(
  user: { name: string; email: string },
  donation: { amount: number; cause: string; isRecurring: boolean },
) {
  const html = render(
    React.createElement(DonationConfirmationEmail, {
      name: user.name || "Valued Donor",
      amount: donation.amount,
      cause: donation.cause || "Blissful Life Foundation",
      isRecurring: donation.isRecurring,
    }),
  )

  return sendEmail({
    to: user.email,
    subject: "Thank you for your donation",
    html,
  })
}

