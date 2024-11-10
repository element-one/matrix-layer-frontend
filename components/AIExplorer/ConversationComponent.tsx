import { FC, useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'

import { useQuery } from '@apollo/client'
import { agentQuery } from '@graphql/client/resolvers/agent'
import { chatSubscription } from '@graphql/client/resolvers/langchain'
import { getCurrentPageContent, getCurrentUrl } from '@helpers/chrome'
import {
  getLastAiMessage,
  getLastUserMessageWithoutSystem,
  updateConversationMessages
} from '@helpers/components/conversation'
import {
  getFormattedQuotes,
  sendMessageToRemove
} from '@helpers/components/messageSelection'
import { messageToChatMessage } from '@helpers/dto/conversation/chat/request'
import { chatMessageToMessage } from '@helpers/dto/conversation/chat/response'
import { useLazySubscription } from '@hooks/useLazySubscription'
import { useStore } from '@store/store'
import {
  AgentStatus,
  ChatFollowUpOptionInput,
  ChatSingleSelectionContentOptionInput
} from '@type/graphqlApiSchema'
import { Conversation } from '@type/internal/conversation'
import { Message, Role } from '@type/internal/message'
import { MessageSelection } from '@type/internal/messageSelection'
import {
  createActiveTabInteraction,
  createCompletionStreamInteraction,
  createFollowUpInteraction,
  createMessage,
  createPromptInteraction,
  createQuotesInteraction,
  createSingleSelectionNewsTimeScope,
  getErrorInteractionByUiCategory,
  getFollowUpInteractionByUiCategory,
  getPromptInteractionByUiCategory,
  getSingleSelectionNewsTimeScope,
  mergeRequestMessages,
  mergeResponseMessages
} from 'helpers/components/message'
import { useDebouncedCallback } from 'use-debounce'

import ChatHistory from './ChatComponents/ChatHistory'
import FollowUpQuestion from './ChatComponents/FollowUpQuestion'
import Timescope from './ChatComponents/Interactions/Timescope'
import TypingIndicator from './ChatComponents/TypingIndicator'
import ChatBox from './ChatBox'

interface ConversationComponentProps {
  conversationId: string
}

const ConversationComponent: FC<ConversationComponentProps> = ({
  conversationId
}) => {
  const { isConnected, address } = useAccount()

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

  const [newsTimescopes, setNewsTimescopes] = useState<
    ChatSingleSelectionContentOptionInput[]
  >([])
  const [newsTimescopesIndex, setNewsTimescopesIndex] = useState(-1)

  const [isError, setIsError] = useState(false)

  const [messageToResend, setMessageToResend] = useState('')

  const [showMessageSelections, setShowMessageSelections] = useState(true)

  const chatScrollRef = useRef<HTMLDivElement>(null)
  const chatContentRef = useRef<HTMLDivElement>(null)
  const chatBoxInputRef = useRef<HTMLInputElement>(null)

  const { data: agentData } = useQuery(agentQuery, {
    variables: { id: '1' } //TODO:
  })

  const [
    fetchChat,
    {
      data: chatData,
      preLoading: chatPreLoading,
      loading: chatLoading,
      complete: chatComplete,
      error: chatError,
      stopSubscription
    }
  ] = useLazySubscription(chatSubscription)

  useEffect(() => {
    setNewsTimescopes([])
    setNewsTimescopesIndex(-1)
    setIsError(false)

    setShowFollowUpQuestions(false)
    setFollowUpQuestions([])
    setFollowUpQuestionsIndex(-1)

    setLastSystemMessageId('')
    setStreamingMessage(undefined)
    stopSubscription()

    handleRemoveAllSelections()
    // eslint-disable-next-line
  }, [conversationId, address])

  useEffect(() => {
    if (conversation?.messages) {
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
    if (isError) {
      const lastUserMessageBeforeSystem = getLastUserMessageWithoutSystem(
        conversations,
        conversationId
      )!
      if (!lastUserMessageBeforeSystem) {
        return
      }

      const promptInteraction = getPromptInteractionByUiCategory(
        lastUserMessageBeforeSystem
      )!

      setMessage(promptInteraction.content.text)
      setMessageToResend(promptInteraction.content.text)
    } else {
      setMessageToResend('')
    }
    // eslint-disable-next-line
  }, [isError])

  useEffect(() => {
    if (!address) {
      setConversation(null)
      return
    }

    const conversation = conversations.find(
      (conversation) => conversation.id === conversationId
    )
    if (conversation) {
      setConversation({ ...conversation })
    }
  }, [conversationId, conversations, address])

  useEffect(() => {
    if (chatError) {
      setShowMessageSelections(true)
    }
  }, [chatError])

  useEffect(() => {
    const scrollAreaElement = chatScrollRef.current
    const scrollContentElement = chatContentRef.current
    if (scrollAreaElement && scrollContentElement) {
      scrollAreaElement.scrollTo({
        top: scrollContentElement.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, showFollowUpQuestions, newsTimescopes])

  useEffect(() => {
    if (!chatData) {
      return
    }

    setShowMessageSelections(false)

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

    const streamingMessageWithMetadata: Message = {
      ...streamingMessage,
      internalMetaData: {
        ...(streamingMessage.internalMetaData
          ? streamingMessage.internalMetaData
          : {}),
        isFinishedMessage: chatComplete
      }
    }

    const lastSystemMessage = messages.find(
      (message) => message.id === messageId
    )
    const responseMessageMerged = mergeResponseMessages(
      streamingMessageWithMetadata,
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

      setShowMessageSelections(true)

      const interactionNewsTimescope = getSingleSelectionNewsTimeScope(
        responseMessageMerged
      )
      if (interactionNewsTimescope) {
        setNewsTimescopes(interactionNewsTimescope.content.options)
        setNewsTimescopesIndex(
          interactionNewsTimescope.content.selected_option_index
        )
      }

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
        setIsError(true)
      } else {
        handleRemoveAllSelections()
      }

      setShowFollowUpQuestions(false)
      setUserIdle(false)
      debouncedUserIdle(true)
    }
    // eslint-disable-next-line
  }, [streamingMessage, chatComplete])

  const messageProcess = async (sendMessage: Message) => {
    setNewsTimescopes([])
    setNewsTimescopesIndex(-1)
    setIsError(false)
    setFollowUpQuestions([])
    setFollowUpQuestionsIndex(-1)

    const variables = messageToChatMessage(
      sendMessage,
      conversationId,
      address as string
    )

    await fetchChat({
      variables
    })
  }

  const handleSend = async (text: string) => {
    const pageUrl = await getCurrentUrl()
    const pageContent = await getCurrentPageContent()
    const quotes = getFormattedQuotes(messageSelections)

    const lastAiMessage = getLastAiMessage(conversations, conversationId)
    const followPreviousInteraction = lastAiMessage
      ? getFollowUpInteractionByUiCategory(lastAiMessage)
      : undefined

    const interactions = [
      createPromptInteraction(text),
      ...(pageUrl && pageContent
        ? [createActiveTabInteraction(pageContent, pageUrl)]
        : []),
      ...(quotes.length ? [createQuotesInteraction(quotes)] : []),
      ...(followUpQuestionsIndex !== -1 && followPreviousInteraction
        ? [
            createFollowUpInteraction(
              followPreviousInteraction?.content.options,
              followUpQuestionsIndex,
              followPreviousInteraction.id
            )
          ]
        : [])
    ]

    const sendMessage = createMessage(interactions, { messageSelections })

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

  const handleSendWithTimescope = async (index: number) => {
    const timescopeText = `Timescope selected: ${newsTimescopes[index].display_value}`
    const timeScopeInteraction = createSingleSelectionNewsTimeScope(
      newsTimescopes,
      index
    )
    // setNewsTimescopesIndex(index);
    // const timeScopeInteraction = createSingleSelectionNewsTimeScope(
    //   newsTimescopes,
    //   newsTimescopesIndex,
    // );
    const messageForLocalHistory = createMessage([
      createPromptInteraction(timescopeText),
      timeScopeInteraction
    ])

    const lastAiMessage = getLastAiMessage(conversations, conversationId)
    const messageForLocalHistoryMerged = mergeRequestMessages(
      messageForLocalHistory,
      lastAiMessage
    )

    const updatedMessages = [...messages, messageForLocalHistoryMerged]
    setMessages(updatedMessages)

    const newMessages = updateConversationMessages(
      conversations,
      conversationId,
      updatedMessages
    )

    setConversations(newMessages)

    const sendMessage: Message = {
      ...messageForLocalHistoryMerged,
      interactions: createMessage([timeScopeInteraction]).interactions
    }

    const sendMessageMerged = mergeRequestMessages(sendMessage, lastAiMessage)

    messageProcess(sendMessageMerged)
  }

  const handleOnUpgradeRequired = () => {
    const textToUpgrade =
      'You need to stake xxx token in order to unlock this option'

    const upgradeRequiredMessage: Message = {
      ...createMessage([createCompletionStreamInteraction(textToUpgrade)], {
        isFinishedMessage: true
      }),
      role: Role.AI
    }

    const updatedMessages = [...messages, upgradeRequiredMessage]
    setMessages(updatedMessages)

    const newMessages = updateConversationMessages(
      conversations,
      conversationId,
      updatedMessages
    )

    setConversations(newMessages)
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
          {newsTimescopes.length > 0 && (
            <Timescope
              newsTimescopes={newsTimescopes}
              newsTimescopesIndex={newsTimescopesIndex}
              onTimescopeSelect={handleSendWithTimescope}
              onUpgradeRequired={handleOnUpgradeRequired}
              agentStatus={agentData?.status || AgentStatus.Platinum} // TODO:
            />
          )}
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
        disabled={chatLoading || !isConnected}
        message={message}
        onSend={handleSend}
        setMessage={setMessage}
        onChange={handleOnChatBoxChange}
        isError={isError}
        showMessageSelections={showMessageSelections}
        messageToResend={messageToResend}
      ></ChatBox>
    </div>
  )
}

export default ConversationComponent
