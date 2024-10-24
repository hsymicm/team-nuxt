import { db } from "~/db"
import { hashPassword } from "./password"
import { users } from "~/db/schema"
import { eq } from "drizzle-orm"

export function verifyUsernameInput(username: string): boolean {
  return (
    username.length > 3 && username.length < 32 && username.trim() === username
  )
}

export async function createUser(
  email: string,
  username: string,
  name: string,
  password: string
): Promise<User> {
  try {
    const passwordHash = await hashPassword(password)

    const row = await db
      .insert(users)
      .values({
        email,
        username,
        name,
        password: passwordHash,
      })
      .returning({ id: users.id })

    return {
      id: row[0].id,
      email,
      username,
      name,
    }
  } catch (error) {
    throw new Error("Unexpected error")
  }
}

export async function updateUserPassword(
  userId: number,
  newPassword: string
): Promise<void> {
  try {
    const passwordHash = await hashPassword(newPassword)
    await db
      .update(users)
      .set({ password: passwordHash })
      .where(eq(users.id, userId))
  } catch (error) {
    throw new Error("Unexpected error")
  }
}

export async function getUserPasswordHash(userId: number): Promise<string> {
  try {
    const result = await db.query.users.findFirst({
      columns: {
        password: true
      },
      where: eq(users.id, userId)
    })

    if (!result) {
      throw new Error("Invalid userId")
    }

    return result.password
  } catch (error) {
    throw new Error("Unexpected error")
  }
}

export async function getUserFromUserId(userId: number): Promise<User | null> {
  try {
    const row = await db.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (!row) return null

    const { id, name, username, email, profile } = row
    return { id, name, username, email, profile }
  } catch (error) {
    throw new Error("Unexpected error")
  }
}

export async function getUserFromEmail(userEmail: string): Promise<User | null> {
  try {
    const row = await db.query.users.findFirst({
      where: eq(users.email, userEmail)
    })

    if (!row) return null

    const { id, name, username, email, profile } = row
    return { id, name, username, email, profile }
  } catch (error) {
    throw new Error("Unexpected error")
  }
}

export interface User {
  id: number
  email: string
  username: string
  name: string
  profile?: string | null
}
