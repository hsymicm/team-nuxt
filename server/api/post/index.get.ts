import { db } from "@/db"
import { posts, users } from "@/db/schema"
import { eq } from "drizzle-orm"

type Posts = {
  id: number
  author: string | null
  postedAt: string
  title: string | null
  imageUrl: string | null
  description: string | null
}

type Meta = {
  page: number
  limit: number
  totalPages: number
  totalPosts: number
}

type SuccessResponse = {
  status: "success"
  statusCode: number
  message: string
  data: Posts[]
  meta: Meta
}

type ErrorResponse = {
  status: "error"
  statusCode: number
  errorType: string
  message: string
  details: null
}

type ApiResponse = SuccessResponse | ErrorResponse

export default defineEventHandler(async (event): Promise<ApiResponse> => {
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
      statusCode: 201,
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
      statusCode: 500,
      errorType: "server_error",
      message: "An unexpected error occurred. Please try again later.",
      details: null,
    }
  }

})
