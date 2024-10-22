import { db } from "@/db"
import { posts, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const page = Number(getQuery(event).page) || 1
    const limit = 6;
    const offset = (page - 1) * limit

    const data = await db.select({
      id: posts.id,
      author: users.name,
      postedAt: posts.postedAt,
      title: posts.title,
      imageUrl: posts.imageUrl,
      description: posts.description,
    })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .limit(limit)
      .offset(offset)

    const totalPosts = await db.$count(posts)

    const totalPages = Math.ceil(totalPosts / limit)

    return {
      status: "success",
      message: "Posts data fetched successfully",
      data,
      meta: {
        page,
        limit,
        totalPages,
        totalPosts: totalPosts
      }
    }
  } catch (e) {
    console.error(e)

    return {
      status: "error",
      message: "Internal Server Error",
      error: {
        code: 500,
        type: "ServerError",
        details: "An unexpected error occurred on the server."
      }
    }
  }

})
