import axios from 'axios'

import { CHAT_WEB_APP_URL } from '@helpers/env'

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? '/chatApi' : CHAT_WEB_APP_URL,
  withCredentials: true
})

export default client
