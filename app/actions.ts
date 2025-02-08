"use server"

import { createPrompt as dbCreatePrompt, createUser as dbCreateUser } from "@/lib/db"

export async function createPrompt({
title,
content,
categories,
authorId,
}: {
title: string
content: string
categories: string[]
authorId: string
}) {
return dbCreatePrompt({
    title,
    content,
    categories,
    authorId,
})
}

export async function createUser({
name,
email,
password,
}: {
name: string
email: string
password: string
}) {
return dbCreateUser({
    name,
    email,
    password,
})
}

