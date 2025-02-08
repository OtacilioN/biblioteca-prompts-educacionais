import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function getPrompts() {
  const prompts = await prisma.prompt.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return prompts.map((prompt) => ({
    ...prompt,
    categories: prompt.categories.split(",").map((c) => c.trim()),
  }))
}

export async function createPrompt(data: {
  title: string
  content: string
  categories: string[]
  authorId: string
}) {
  const prompt = await prisma.prompt.create({
    data: {
      ...data,
      categories: data.categories.join(","),
    },
  })
  return {
    ...prompt,
    categories: prompt.categories.split(",").map((c) => c.trim()),
  }
}

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  })
  return user
}

