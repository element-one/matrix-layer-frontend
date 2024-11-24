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

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      )
      toast.error(
        error.response.data.message ||
          'An error occurred, please try again later'
      )
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default client
