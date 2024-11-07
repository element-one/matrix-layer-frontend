import { FC, useEffect, useRef, useState } from 'react'

import { chatSubscription } from '@graphql/client/resolvers/langchain'
import { getCurrentPageContent, getCurrentUrl } from '@helpers/chrome'
import {
  getLastAiMessage,
  updateConversationMessages
} from '@helpers/components/conversation'
import { messageToChatMessage } from '@helpers/dto/conversation/chat/request'
import { chatMessageToMessage } from '@helpers/dto/conversation/chat/response'
import { useLazySubscription } from '@hooks/useLazySubscription'
import { useStore } from '@store/store'
import { Conversation } from '@type/internal/conversation'
import { Message } from '@type/internal/message'
import {
  createActiveTabInteraction,
  createMessage,
  createPromptInteraction,
  mergeRequestMessages,
  mergeResponseMessages
} from 'helpers/components/message'

import ChatHistory from './ChatComponents/ChatHistory'
import TypingIndicator from './ChatComponents/TypingIndicator'
import ChatBox from './ChatBox'

interface ConversationComponentProps {
  conversationId: string
  userId: string
}

const ConversationComponent: FC<ConversationComponentProps> = ({
  conversationId,
  userId
}) => {
  const { conversations, setConversations } = useStore(
    ({ conversations, setConversations }) => ({
      conversations,
      setConversations
    })
  )

  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState(conversation?.messages || [])

  const [message, setMessage] = useState('')

  const [streamingMessage, setStreamingMessage] = useState<Message>()

  const [lastSystemMessageId, setLastSystemMessageId] = useState('')

  const chatScrollRef = useRef<HTMLDivElement>(null)

  const [
    fetchChat,
    {
      data: chatData,
      preLoading: chatPreLoading,
      loading: chatLoading,
      complete: chatComplete,
      // error: chatError,
      stopSubscription
    }
  ] = useLazySubscription(chatSubscription)

  useEffect(() => {
    setStreamingMessage(undefined)
    setLastSystemMessageId('')

    stopSubscription()
    // eslint-disable-next-line
  }, [conversationId])

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [conversation])

  useEffect(() => {
    if (!chatData) {
      return
    }

    const responseMessage = chatMessageToMessage(chatData.chat)

    setStreamingMessage(responseMessage)
  }, [chatData])

  useEffect(() => {
    if (!streamingMessage) {
      return
    }

    let messageId: string = lastSystemMessageId
    if (!messageId) {
      setLastSystemMessageId(streamingMessage.id)
      messageId = streamingMessage.id
    }

    const lastSystemMessage = messages.find(
      (message) => message.id === messageId
    )
    const responseMessageMerged = mergeResponseMessages(
      streamingMessage,
      lastSystemMessage
    )

    const messagesWithoutCurrent = messages.filter(
      (message) => message.id !== lastSystemMessageId
    )
    const finalUpdatedMessages = [
      ...messagesWithoutCurrent,
      responseMessageMerged
    ]
    setMessages(finalUpdatedMessages)

    const allMessages = updateConversationMessages(
      conversations,
      conversationId,
      finalUpdatedMessages
    )

    setConversations(allMessages)

    if (chatComplete) {
      setLastSystemMessageId('')
      setStreamingMessage(undefined)
    }
  }, [streamingMessage, chatComplete])

  useEffect(() => {
    const conversation = conversations.find(
      (conversation) => conversation.id === conversationId
    )
    if (conversation) {
      setConversation({ ...conversation })
    }
  }, [conversationId, conversations])

  const handleSend = async (text: string) => {
    const pageUrl = await getCurrentUrl()
    const pageContent = await getCurrentPageContent()

    const lastAiMessage = getLastAiMessage(conversations, conversationId)

    const interactions = [
      createPromptInteraction(text),
      ...(pageUrl && pageContent
        ? [createActiveTabInteraction(pageContent, pageUrl)]
        : [])
    ]

    const sendMessage = createMessage(interactions)

    const sendMessageMerged = mergeRequestMessages(sendMessage, lastAiMessage)

    const updatedMessages = [...messages, sendMessageMerged]
    setMessages(updatedMessages)

    const newMessages = updateConversationMessages(
      conversations,
      conversationId,
      updatedMessages
    )

    setConversations(newMessages)

    messageProcess(sendMessageMerged)
  }

  const messageProcess = async (sendMessage: Message) => {
    const variables = messageToChatMessage(sendMessage, conversationId, userId)

    await fetchChat({
      variables
    })
  }

  useEffect(() => {
    const scrollAreaElement = chatScrollRef.current
    if (scrollAreaElement) {
      scrollAreaElement.scrollTo({
        top: scrollAreaElement.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <div
      className='w-full h-full border-2 border-[#666] rounded-[32px] flex flex-col
        overflow-hidden'
    >
      <div className='w-full h-full overflow-auto pt-10 px-5'>
        <div ref={chatScrollRef}>
          {conversation && (
            <ChatHistory
              conversation={{ ...conversation }}
              chatLoading={chatPreLoading}
              isChatTyping={chatLoading}
            />
          )}
          {chatLoading && <TypingIndicator chatLoading={chatPreLoading} />}
        </div>
      </div>
      <ChatBox
        disabled={chatLoading}
        message={message}
        onSend={handleSend}
        setMessage={setMessage}
      ></ChatBox>
    </div>
  )
}

export default ConversationComponent
