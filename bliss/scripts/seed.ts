import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash("Admin@123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@blissfullife.org" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@blissfullife.org",
      password: adminPassword,
      role: "admin",
    },
  })

  console.log({ admin })

  // Create sample book
  const book = await prisma.book.create({
    data: {
      title: "The Bhagavad Gita",
      description: "A sacred Hindu scripture that is part of the epic Mahabharata.",
      coverImage: "/placeholder.svg?height=600&width=400",
      authorId: admin.id,
      category: "sacred-texts",
      status: "published",
      chapters: {
        create: [
          {
            title: "Chapter 1: Arjuna's Dilemma",
            content:
              "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?",
            order: 1,
            status: "published",
          },
          {
            title: "Chapter 2: Transcendental Knowledge",
            content:
              "Sanjaya said: Seeing Arjuna full of compassion, his mind depressed, his eyes full of tears, Madhusudana, Krishna, spoke the following words.",
            order: 2,
            status: "published",
          },
        ],
      },
    },
  })

  console.log({ book })

  // Create sample teaching
  const teaching = await prisma.teaching.create({
    data: {
      title: "The Path to Inner Peace",
      description: "Learn practical techniques to quiet the mind and connect with your true self.",
      content:
        "In this profound discourse, we explore the essential steps to finding inner peace in our chaotic world...",
      authorId: admin.id,
      type: "text",
      category: "meditation",
      tags: "meditation,peace,mindfulness",
      status: "published",
    },
  })

  console.log({ teaching })

  // Create sample religious place
  const place = await prisma.religiousPlace.create({
    data: {
      name: "Varanasi",
      description: "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
      image: "/placeholder.svg?height=400&width=600",
      state: "Uttar Pradesh",
      type: "City",
      coordinates: { lat: 25.3176, lng: 82.9739 },
      temples: {
        create: [
          {
            name: "Kashi Vishwanath Temple",
            description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
            mainDeity: "Lord Shiva",
            image: "/placeholder.svg?height=200&width=300",
            coordinates: { lat: 25.3109, lng: 83.0107 },
            openingHours: "3:00 AM - 11:00 PM",
          },
        ],
      },
    },
  })

  console.log({ place })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

