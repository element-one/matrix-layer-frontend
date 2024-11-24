import { toast } from 'react-toastify'
import axios from 'axios'

const client = axios.create({
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY
  },
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? '/api'
      : process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true
})

// Add throttling constants and variables
const ERROR_THROTTLE_TIME = 5000 // 5 seconds
let lastErrorMessage: string | null = null
let lastErrorTime: number = 0

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      )

      // Extract error message and implement throttling logic
      const errorMessage =
        error.response.data.message ||
        'An error occurred, please try again later'
      const currentTime = Date.now()

      // Only show toast if it's a different message or enough time has passed
      if (
        errorMessage !== lastErrorMessage ||
        currentTime - lastErrorTime > ERROR_THROTTLE_TIME
      ) {
        toast.error(errorMessage)
        lastErrorMessage = errorMessage
        lastErrorTime = currentTime
      }
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default client
