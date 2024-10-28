import {
  checkExistingUser,
  createUser,
  User,
  verifyPasswordInput,
  verifyUsernameInput,
} from "~/lib/server/user"

type ErrorDetails = {
  username?: string
  email?: string
  password?: string
}

type SuccessResponse = {
  status: "success"
  statusCode: number
  message: string
  data: User
}

type ErrorResponse = {
  status: "error"
  statusCode: number
  errorType: string
  message: string
  details: ErrorDetails | null
}

type ApiResponse = SuccessResponse | ErrorResponse

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    let errorDetails: ErrorDetails = {}

    const validationErrorResponse = (
      errorDetails: ErrorDetails
    ): ErrorResponse => ({
      status: "error",
      statusCode: 400,
      errorType: "validation_error",
      message: "There was an issue with the submitted data.",
      details: errorDetails,
    })

    const body = await readBody(event)
    const { email, username, name, password } = body

    if (!verifyUsernameInput(username)) {
      errorDetails.username = "Invalid username format."

      return validationErrorResponse(errorDetails)
    }

    if (!verifyPasswordInput(password)) {
      errorDetails.password = "Invalid password format."

      return validationErrorResponse(errorDetails)
    }

    const existingUser = await checkExistingUser(username, email)

    if (existingUser) {
      if (existingUser.username === username) {
        errorDetails.username = "Username already exists."
      }

      if (existingUser.email === email) {
        errorDetails.email = "Email already exists."
      }

      return validationErrorResponse(errorDetails)
    }

    const user = await createUser(email, username, name, password)

    return {
      status: "success",
      statusCode: 201,
      message: "User has been created successfully",
      data: user,
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
