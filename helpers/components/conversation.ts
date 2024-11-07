import { Conversation } from '@type/internal/conversation'
import { Message, Role } from '@type/internal/message'

import { getFollowUpInteractionByUiCategory } from './message'

function userMessages(messages: Message[]) {
  return messages.filter((message) => {
    const isUserMessage = message.role === Role.User
    return isUserMessage
  })
}

function userMessagesWithoutSystem(messages: Message[]) {
  const userMessagesOnly = userMessages(messages)
  return userMessagesOnly.filter((message) => {
    const isNoTimescope = getFollowUpInteractionByUiCategory(message)
    return !isNoTimescope
  })
}

function getConversationById(
  conversations: Conversation[],
  conversationId: string
) {
  return conversations.find(
    (conversation) => conversation.id === conversationId
  )
}

export function getLastUserMessageWithoutSystem(
  conversations: Conversation[],
  conversationId: string
) {
  const currentConversation = getConversationById(conversations, conversationId)
  if (!currentConversation) {
    return null
  }

  const userMessagesFiltered = userMessagesWithoutSystem(
    currentConversation.messages
  )
  return userMessagesFiltered
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .pop()
}

function aiMessages(messages: Message[]) {
  return messages.filter((message) => {
    const isAiMessage = message.role === Role.AI
    return isAiMessage
  })
}

export function getLastAiMessage(
  conversations: Conversation[],
  conversationId: string
) {
  const currentConversation = getConversationById(conversations, conversationId)
  if (!currentConversation) {
    return null
  }

  const AiFiltered = aiMessages(currentConversation.messages)
  return AiFiltered.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  ).pop()
}

export function updateConversationMessages(
  conversations: Conversation[],
  conversationId: string,
  updatedMessages: Message[]
): Conversation[] {
  return conversations.map((conv) =>
    conv.id === conversationId ? { ...conv, messages: updatedMessages } : conv
  )
}
