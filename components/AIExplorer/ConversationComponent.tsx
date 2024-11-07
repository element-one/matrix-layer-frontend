import { FC, useEffect, useRef, useState } from 'react'

import { chatSubscription } from '@graphql/client/resolvers/langchain'
import { getCurrentPageContent, getCurrentUrl } from '@helpers/chrome'
import {
  getLastAiMessage,
  updateConversationMessages
} from '@helpers/components/conversation'
import { sendMessageToRemove } from '@helpers/components/messageSelection'
import { messageToChatMessage } from '@helpers/dto/conversation/chat/request'
import { chatMessageToMessage } from '@helpers/dto/conversation/chat/response'
import { useLazySubscription } from '@hooks/useLazySubscription'
import { useStore } from '@store/store'
import { ChatFollowUpOptionInput } from '@type/graphqlApiSchema'
import { Conversation } from '@type/internal/conversation'
import { Message } from '@type/internal/message'
import { MessageSelection } from '@type/internal/messageSelection'
import {
  createActiveTabInteraction,
  createMessage,
  createPromptInteraction,
  getErrorInteractionByUiCategory,
  getFollowUpInteractionByUiCategory,
  mergeRequestMessages,
  mergeResponseMessages
} from 'helpers/components/message'
import { useDebouncedCallback } from 'use-debounce'

import ChatHistory from './ChatComponents/ChatHistory'
import FollowUpQuestion from './ChatComponents/FollowUpQuestion'
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

  const [followUpQuestions, setFollowUpQuestions] = useState<
    ChatFollowUpOptionInput[]
  >([])
  const [followUpQuestionsIndex, setFollowUpQuestionsIndex] = useState(-1)
  const [showFollowUpQuestions, setShowFollowUpQuestions] = useState(false)

  const [userIdle, setUserIdle] = useState(false)

  const [lastSystemMessageId, setLastSystemMessageId] = useState('')

  const [messageSelections, setMessageSelections] = useState<
    MessageSelection[]
  >([])

  const chatScrollRef = useRef<HTMLDivElement>(null)
  const chatContentRef = useRef<HTMLDivElement>(null)
  const chatBoxInputRef = useRef<HTMLInputElement>(null)

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
    setShowFollowUpQuestions(false)
    setFollowUpQuestions([])
    setFollowUpQuestionsIndex(-1)

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
    if (userIdle) {
      if (followUpQuestions.length) {
        setShowFollowUpQuestions(true)
      }
    }
    // eslint-disable-next-line
  }, [userIdle])

  useEffect(() => {
    const conversation = conversations.find(
      (conversation) => conversation.id === conversationId
    )
    if (conversation) {
      setConversation({ ...conversation })
    }
  }, [conversationId, conversations])

  useEffect(() => {
    const scrollAreaElement = chatScrollRef.current
    const scrollContentElement = chatContentRef.current
    if (scrollAreaElement && scrollContentElement) {
      scrollAreaElement.scrollTo({
        top: scrollContentElement.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, showFollowUpQuestions])

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

      const interactionFollowUpQuestions = getFollowUpInteractionByUiCategory(
        responseMessageMerged
      )
      if (interactionFollowUpQuestions) {
        setFollowUpQuestions(interactionFollowUpQuestions.content.options)
        setFollowUpQuestionsIndex(
          interactionFollowUpQuestions.content.selected_option_index
        )
      }

      if (getErrorInteractionByUiCategory(responseMessageMerged)) {
        // setIsError(true)
      } else {
        handleRemoveAllSelections()
      }

      setShowFollowUpQuestions(false)
      setUserIdle(false)
      debouncedUserIdle(true)
    }
  }, [streamingMessage, chatComplete])

  const messageProcess = async (sendMessage: Message) => {
    setFollowUpQuestions([])
    setFollowUpQuestionsIndex(-1)

    const variables = messageToChatMessage(sendMessage, conversationId, userId)

    await fetchChat({
      variables
    })
  }

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

  const handleFollowUpQuestionSelect = (index: number) => {
    const text = followUpQuestions[index].displayed_value
    setFollowUpQuestions([])
    setFollowUpQuestionsIndex(index)

    setMessage(text)
    chatBoxInputRef.current?.focus()
  }

  const debouncedUserIdle = useDebouncedCallback((value) => {
    setUserIdle(value)
  }, 5000)

  const handleOnChatBoxChange = () => {
    setUserIdle(false)
    debouncedUserIdle(true)
  }

  const handleOnScroll = () => {
    setUserIdle(false)
    debouncedUserIdle(true)
  }

  const handleRemoveAllSelections = () => {
    sendMessageToRemove(messageSelections)
    setMessageSelections([])
  }

  return (
    <div
      className='w-full h-full border-2 border-[#666] rounded-[32px] flex flex-col
        overflow-hidden'
    >
      <div
        className='w-full h-full overflow-auto pt-10 px-5'
        ref={chatScrollRef}
        onScroll={handleOnScroll}
      >
        <div ref={chatContentRef}>
          {conversation && (
            <ChatHistory
              conversation={{ ...conversation }}
              chatLoading={chatPreLoading}
              isChatTyping={chatLoading}
            />
          )}
          {chatLoading && <TypingIndicator chatLoading={chatPreLoading} />}
          {followUpQuestions.length > 0 && showFollowUpQuestions && (
            <FollowUpQuestion
              followUpQuestions={followUpQuestions}
              followUpQuestionsIndex={followUpQuestionsIndex}
              onSelect={handleFollowUpQuestionSelect}
            />
          )}
        </div>
      </div>
      <ChatBox
        inputRef={chatBoxInputRef}
        disabled={chatLoading}
        message={message}
        onSend={handleSend}
        setMessage={setMessage}
        onChange={handleOnChatBoxChange}
      ></ChatBox>
    </div>
  )
}

export default ConversationComponent
