import axios from 'axios'

const client = axios.create({
  baseURL: '/chat'
})

export default client
