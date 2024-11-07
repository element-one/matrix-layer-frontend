import { v4 as uuidv4 } from 'uuid'

export function getRandomId(): string {
  return uuidv4()
}

export function generateRandomChatId(): string {
  const length = 8
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
