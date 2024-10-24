import {
  validateSessionToken,
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "~/lib/server/session"

function parseCookieHeader(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader
      .split("; ")
      .map((cookie) => cookie.split("="))
      .map(([key, value]) => [key, decodeURIComponent(value)])
  )
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // CSRF protection (for non-GET methods)
  if (method !== "GET") {
    const origin = getHeader(event, "origin")
    if (!origin || origin !== "https://example.com") {
      return sendError(event, createError({ statusCode: 403, statusMessage: "Forbidden" }))
    }
  }

  // Session validation
  const cookieHeader = getHeader(event, "cookie") || ""
  const cookies = parseCookieHeader(cookieHeader)
  const sessionToken = cookies["session"]
  if (!sessionToken) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }))
  }

  // Validate session
  const { session, user } = await validateSessionToken(sessionToken)
  if (!session) {
    deleteSessionTokenCookie(event)
    return sendError(event, createError({ statusCode: 401, statusMessage: "Invalid session" }))
  }
  setSessionTokenCookie(event, sessionToken, session.expiresAt)

  return { message: "Request successfully handled" }
})
