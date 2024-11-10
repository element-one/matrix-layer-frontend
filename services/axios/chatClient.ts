import axios from 'axios'

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? '/chatApi'
      : process.env.NEXT_PUBLIC_CHAT_WEB_APP_URL,
  withCredentials: true
})

export default client
