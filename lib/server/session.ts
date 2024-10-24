import { db } from "~/db"
import { eq } from "drizzle-orm"
import { type Users, type Sessions, sessions, users } from "~/db/schema"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"
import type { H3Event } from "h3" 

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)

  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(
  token: string,
  userId: number
): Promise<Sessions> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Sessions = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 Days Expiration
  }

  await db.insert(sessions).values(session)
  return session
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))

  if (result.length < 1) {
    return { session: null, user: null }
  }

  const { user, session } = result[0]

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id))
    return { session: null, user: null }
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 3.5) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export function setSessionTokenCookie(event: H3Event, token: string, expiresAt: Date): void {
  const isProd = process.env.NODE_ENV === "production"

  const cookieString = `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; ${isProd ? "Secure" : ""}`
  setHeader(event, "Set-Cookie", cookieString)
}

export function deleteSessionTokenCookie(event: H3Event): void {
  const isProd = process.env.NODE_ENV === "production"

	const cookieString = `session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; ${isProd ? "Secure" : ""}`
  setHeader(event, "Set-Cookie", cookieString)
}

export type SessionValidationResult =
  | { session: Sessions; user: Users }
  | { session: null; user: null }
