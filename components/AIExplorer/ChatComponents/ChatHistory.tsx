import { Conversation } from '@type/internal/conversation'

import { ChatMessage } from './ChatMessage'

interface ChatHistoryProps {
  conversation: Conversation | null
  chatLoading: boolean
  isChatTyping: boolean
}

export default function ChatHistory({
  conversation,
  chatLoading,
  isChatTyping
}: ChatHistoryProps) {
  return (
    conversation && (
      <div className='flex flex-col gap-8'>
        {conversation.messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            chatLoading={chatLoading}
            isChatTyping={isChatTyping}
          />
        ))}
      </div>
    )
  )
}
