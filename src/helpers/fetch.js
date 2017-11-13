class CustomError extends Error {
  constructor(name = 'Error', message = '', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, CustomError)

    // Custom debugging information
    this.name = name
    this.message = message
    this.date = new Date()
  }
}

export const post = async ({ url, body, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    const { statusCode } = data

    if (statusCode !== 200) {
      const { error, message } = data
      throw new CustomError(error, message)
    }
    dispatch({ type: success, data })
  } catch (err) {
    dispatch({ type: failure, err })
  }
}
