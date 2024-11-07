import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Avatar } from '@nextui-org/react'

import { Text } from '@components/Text'
import {
  getMessageText,
  getSingleSelectionNewsTimeScope
} from '@helpers/components/message'
import { Message, Role } from '@type/internal/message'
import rehypeRaw from 'rehype-raw'

import ChatLink from './Markdown/ChatLink'

interface ChatMessageProps {
  message: Message
  loading?: boolean
  chatLoading: boolean
  isChatTyping: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  // loading,
  // chatLoading,
  isChatTyping
}: ChatMessageProps) => {
  const { createdAt, role } = message

  const [showDot, setShowDot] = useState(false)

  const isUserMessage = role === Role.User
  const alignment = isUserMessage ? 'flex-end' : 'flex-start'
  const createdDate = new Date(createdAt)
  console.log(createdDate)

  const resolveRehypePlugins = (message: Message) => {
    const plugins = []

    if (getSingleSelectionNewsTimeScope(message)) {
      plugins.push(rehypeRaw)
    }

    return plugins
  }

  // const formatDate = () => {
  //   if (chatLoading) return 'Just now'

  //   const now = new Date()
  //   const timeDifference = now.getTime() - createdDate.getTime()
  //   const minutesAgo = Math.floor(timeDifference / 60000)

  //   const isToday = (createdDate: Date) => {
  //     const today = dayjs()
  //     return today.isSame(createdDate, 'day')
  //   }

  //   if (minutesAgo < 1) {
  //     return 'Just Now'
  //   } else if (minutesAgo < 15) {
  //     return `${minutesAgo} minutes ago`
  //   } else if (isToday(createdDate)) {
  //     return dayjs(createdDate).format('hh:mm a')
  //   } else {
  //     return dayjs(createdDate).format('MM/dd/yyyy hh:mm a')
  //   }
  // }

  const DotCharacter = '⚫'
  const DOT_DISAPPEAR_DELAY = 1000

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

  const parsedContent = parseContent(messageText, message, showDot)

  return (
    <div
      className='flex flex-col'
      style={{
        alignItems: alignment
      }}
    >
      <div>
        {!isUserMessage && (
          <div className='flex gap-x-5'>
            <Avatar className='w-6 h-6 shrink-0' />
            <div className='whitespace-normal gap-5'>
              <div>
                <Text>
                  <Markdown
                    rehypePlugins={resolveRehypePlugins(message)}
                    components={{
                      a: (props) => <ChatLink {...props} />
                    }}
                  >
                    {parsedContent}
                  </Markdown>
                </Text>
              </div>
            </div>
          </div>
        )}
        {isUserMessage && <div>{messageText}</div>}
      </div>
    </div>
  )
}
