import { useMutation, useQuery } from '@tanstack/react-query'

import { generateInteractionsInHistory } from '@helpers/components/message'
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
  const url = `/get_conversations_interactions`
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
          interactions: generateInteractionsInHistory(
            message.interactions,
            message.role === 'human'
          ),
          createdAt: dayjs.utc(message.timestamp).toDate()
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
  return await axios.post('/remove_conversations_interactions', params)
}

export const useDeleteConversations = () => {
  return useMutation({
    mutationKey: ['deleteConversations'],
    mutationFn: (data: DeleteConversationParams) => deleteConversations(data)
  })
}
