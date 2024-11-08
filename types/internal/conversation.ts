import { Message } from './message'

export type Conversation = {
  id: string
  name: string
  messages: Message[]
  createdAt: Date
}
