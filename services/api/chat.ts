import { useMutation, useQuery } from '@tanstack/react-query'

import { Conversation, HistoryConversation } from '@type/internal/conversation'
import { getRandomId } from '@utils/random'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import axios from '../axios/chatClient'

dayjs.extend(utc)

export interface ApiChatHistoryData {
  user_id: string
  conversations: HistoryConversation[]
}

export const getUserChatHistory = async (
  address: string
): Promise<Conversation[]> => {
  const url = `/get_conversations`
  const { data } = await axios.post<ApiChatHistoryData>(url, {
    user_id: address
  })

  const formatConversations = data?.conversations
    ?.map((item) => {
      const firstMessage = item?.chat_history[0]

      return {
        id: item.conversation_id,
        createdAt: dayjs.utc(firstMessage?.timestamp).toDate(),
        messages: item.chat_history.map((message) => ({
          id: getRandomId(),
          role: message.role === 'human' ? 0 : 1,
          content: message.content,
          createdAt: dayjs.utc(message.timestamp).toDate(),
          interactions: []
        }))
      }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return formatConversations || []
}

export const useGetUserChatHistory = (address: string) => {
  return useQuery({
    queryKey: ['getAll', 'chatHistory', address],
    queryFn: () => getUserChatHistory(address),
    enabled: !!address,
    initialData: []
  })
}

interface DeleteConversationParams {
  user_id: string
  conversation_ids: string[]
}

export const deleteConversations = async (params: DeleteConversationParams) => {
  return await axios.post('/remove_conversations', params)
}

export const useDeleteConversations = () => {
  return useMutation({
    mutationKey: ['deleteConversations'],
    mutationFn: (data: DeleteConversationParams) => deleteConversations(data)
  })
}
