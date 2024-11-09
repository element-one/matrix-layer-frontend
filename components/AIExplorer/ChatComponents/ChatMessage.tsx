import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useTranslations } from 'next-intl'
import { Avatar } from '@nextui-org/react'

import { Text } from '@components/Text'
import {
  getAllChartInteractionsByUiCategory,
  getAllIndicatorInteractionsByUiCategory,
  getAllTableInteractionsByUiCategory,
  // getErrorInteractionByUiCategory,
  getMessageText,
  getSingleSelectionNewsTimeScope,
  getXPostInteractionByUiCategory
} from '@helpers/components/message'
import { Message, Role } from '@type/internal/message'
import dayjs from 'dayjs'
import rehypeRaw from 'rehype-raw'

import { ChartInteraction } from './Interactions/InteractionChart'
import { Indicator } from './Interactions/InteractionIndicator'
import { ChatTable } from './Interactions/InteractionTable'
import Twitter from './Interactions/Twitter'
import ChatLink from './Markdown/ChatLink'

interface ChatMessageProps {
  message: Message
  loading?: boolean
  chatLoading: boolean
  isChatTyping: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  loading,
  chatLoading,
  isChatTyping
}: ChatMessageProps) => {
  const { createdAt, role } = message

  const t = useTranslations('Ai.conversation.timeSpan')

  const [showDot, setShowDot] = useState(false)

  const isUserMessage = role === Role.User
  const alignment = isUserMessage ? 'flex-end' : 'flex-start'
  const createdDate = new Date(createdAt)

  const resolveRehypePlugins = (message: Message) => {
    const plugins = []

    if (getSingleSelectionNewsTimeScope(message)) {
      plugins.push(rehypeRaw)
    }

    return plugins
  }

  const formatDate = () => {
    if (chatLoading) return 'Just now'

    const now = new Date()
    const timeDifference = now.getTime() - createdDate.getTime()
    const minutesAgo = Math.floor(timeDifference / 60000)

    const isToday = (createdDate: Date) => {
      const today = dayjs()
      return today.isSame(createdDate, 'day')
    }

    if (minutesAgo < 1) {
      return t('justNow')
    } else if (minutesAgo < 15) {
      return `${minutesAgo} ${t('minuteAgo')}`
    } else if (isToday(createdDate)) {
      return dayjs(createdDate).format('hh:mm a')
    } else {
      return dayjs(createdDate).format('MM/dd/YYYY hh:mm a')
    }
  }

  const DotCharacter = `    ⚪`
  const DOT_DISAPPEAR_DELAY = 500

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (isChatTyping) {
      setShowDot(true)
    } else {
      timer = setTimeout(() => {
        setShowDot(false)
      }, DOT_DISAPPEAR_DELAY)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isChatTyping])

  const parseContent = (
    content: string,
    message: Message,
    showDot: boolean
  ) => {
    let parsedContent = content

    if (
      isChatTyping &&
      showDot &&
      !message.internalMetaData?.isFinishedMessage &&
      !isUserMessage
    ) {
      parsedContent += `${DotCharacter}`
    }

    return parsedContent
  }

  const messageText = getMessageText(message) || ''

  const xPostInteraction = getXPostInteractionByUiCategory(message)
  // const errorInteraction = getErrorInteractionByUiCategory(message)
  const chartInteractions = getAllChartInteractionsByUiCategory(message)
  const tableInteractions = getAllTableInteractionsByUiCategory(message)
  const indicatorInteractions = getAllIndicatorInteractionsByUiCategory(message)

  const parsedContent = parseContent(messageText, message, showDot)

  return (
    <div
      className='flex flex-col'
      style={{
        alignItems: alignment
      }}
    >
      {!isUserMessage && (
        <div className='max-w-[800px] w-[80%] flex flex-col'>
          <div className='flex gap-x-5'>
            <Avatar className='w-6 h-6 shrink-0' />
            <div className='flex flex-col gap-y-4 w-full'>
              <div className='whitespace-normal rounded-[24px] px-6 py-4 markdown-body'>
                <Markdown
                  rehypePlugins={resolveRehypePlugins(message)}
                  components={{
                    a: (props) => <ChatLink {...props} />
                  }}
                >
                  {parsedContent}
                </Markdown>
              </div>
              <>
                {chartInteractions.length > 0 && (
                  <div>
                    <div
                      className='flex flex-col gap-4'
                      style={{ maxWidth: '100%', overflow: 'hidden' }}
                    >
                      {chartInteractions.map((interaction) => (
                        <ChartInteraction
                          key={interaction.id}
                          data={interaction}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {tableInteractions.length > 0 && (
                  <div className='flex flex-col gap-3 w-full'>
                    {tableInteractions.map((interaction) => (
                      <ChatTable key={interaction.id} data={interaction} />
                    ))}
                  </div>
                )}

                {indicatorInteractions.length > 0 && (
                  <div className='flex flex-col gap-3 w-full'>
                    {indicatorInteractions.map((interaction) => (
                      <Indicator key={interaction.id} data={interaction} />
                    ))}
                  </div>
                )}

                {/* Twitter Integration */}
                {xPostInteraction?.content.post_id && (
                  <Twitter id={xPostInteraction.content.post_id} />
                )}
              </>
              {!loading && (
                <div className='text-right text-[12px]'>{formatDate()}</div>
              )}
            </div>
          </div>
        </div>
      )}
      {isUserMessage && (
        <div className='max-w-[800px] w-[80%] flex flex-col items-end gap-y-1'>
          <Text className='w-fit text-[16px] text-break-word rounded-[24px] px-6 py-[10px] bg-gray-32'>
            {parsedContent}
          </Text>
          {!loading && (
            <div className='self-end text-[12px]'>{formatDate()}</div>
          )}
        </div>
      )}
    </div>
  )
}
