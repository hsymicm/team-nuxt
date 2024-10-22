import { db } from "@/db"
import { testimonials } from "@/db/schema"

export default defineEventHandler(async () => {
  try {
    const data = await db.select().from(testimonials)

    if (!data) {
      return {
        status: "error",
        message: `Testimonials not found.`,
        error: {
          code: 404,
          type: "NotFound",
          details: `Testimonial data does not exist.`,
        },
      };
    }

    return {
      status: "success",
      message: `Testimonial data has been fetched successfully`,
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
