import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", {
      status: 400,
    })
  }

  // Get the event type
  const eventType = evt.type

  // Handle the event
  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data
        const primaryEmail = email_addresses?.[0]?.email_address

        if (!primaryEmail) {
          return new Response("Error: No email address found", { status: 400 })
        }

        // Create a new user in the database with retry logic for Neon
        let retries = 3
        while (retries > 0) {
          try {
            await prisma.user.create({
              data: {
                id: id,
                email: primaryEmail,
                name: `${first_name || ""} ${last_name || ""}`.trim() || null,
                image: image_url,
                role: "user", // Default role
              },
            })
            break
          } catch (error) {
            retries--
            if (retries === 0) throw error
            // Wait before retrying
            await new Promise((r) => setTimeout(r, 1000))
          }
        }

        break
      }
      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data
        const primaryEmail = email_addresses?.[0]?.email_address

        if (!primaryEmail) {
          return new Response("Error: No email address found", { status: 400 })
        }

        // Update the user in the database with retry logic
        let retries = 3
        while (retries > 0) {
          try {
            await prisma.user.update({
              where: { id: id },
              data: {
                email: primaryEmail,
                name: `${first_name || ""} ${last_name || ""}`.trim() || null,
                image: image_url,
              },
            })
            break
          } catch (error) {
            retries--
            if (retries === 0) throw error
            await new Promise((r) => setTimeout(r, 1000))
          }
        }

        break
      }
      case "user.deleted": {
        const { id } = evt.data

        // Delete the user from the database with retry logic
        let retries = 3
        while (retries > 0) {
          try {
            await prisma.user.delete({
              where: { id: id },
            })
            break
          } catch (error) {
            retries--
            if (retries === 0) throw error
            await new Promise((r) => setTimeout(r, 1000))
          }
        }

        break
      }
    }

    return new Response("Webhook processed successfully", { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return new Response("Error processing webhook", { status: 500 })
  }
}

