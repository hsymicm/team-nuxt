import { eq } from "drizzle-orm"
import { db } from "@/db"
import { posts } from "@/db/schema"

export default defineEventHandler(async (event) => {
  try {
    const param = getRouterParam(event, "id")
    const id: number = Number(param)

    const data = await db.query.posts.findFirst({ where: eq(posts.id, id) })

    if (!data) {
      return {
        status: "error",
        message: `Post with ID '${param}' not found.`,
        error: {
          code: 404,
          type: "NotFound",
          details: `The post with ID '${param}' does not exist.`,
        },
      };
    }

    return {
      status: "success",
      message: `Post with ID '${id}' has been fetched successfully`,
      data,
    }
  } catch (e) {
    console.error(e)

    return {
      status: "error",
      message: "Internal Server Error",
      error: {
        code: 500,
        type: "ServerError",
        details: "An unexpected error occurred on the server.",
      },
    }
  }
})
