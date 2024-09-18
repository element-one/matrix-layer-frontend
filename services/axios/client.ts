import axios from 'axios'

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? '/api'
      : process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true
})

export default client
