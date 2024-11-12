import { Message, MessageInteractions } from './message'

export type Conversation = {
  id: string
  name?: string
  messages: Message[]
  createdAt: Date
}

export type HistoryConversation = {
  conversation_id: string
  chat_history: {
    interactions: MessageInteractions
    role: string
    timestamp: string
    timestamp_raw: number
  }[]
}
