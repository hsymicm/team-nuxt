import { createUser } from "~/lib/server/user"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, username, name, password } = body
    const user = await createUser(email, username, name, password) 

    return {
      status: "success",
      message: `User has been created successfully`,
      data: user
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
