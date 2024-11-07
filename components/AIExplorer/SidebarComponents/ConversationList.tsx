import { FC, useMemo } from 'react'
import clsx from 'clsx'

import { getMessageText } from '@helpers/components/message'
import { quotesAndAsterisksGlobal } from '@helpers/regExp'
import { useStore } from '@store/store'
import { Message } from '@type/internal/message'
import dayjs from 'dayjs'

import ConversationDelete from './ConversationDelete'

const generateTitleFromMessages = (messages: Message[]) => {
  if (messages.length > 0) {
    const messageText = getMessageText(messages[0])
    let content = messageText || ''

    content = content.replace(quotesAndAsterisksGlobal, '')

    return content.length > 0
      ? content.split(' ').slice(0, 4).join(' ')
      : 'Untitled Conversation'
  }
  return 'New Conversation'
}

function formatConversationDate(date: dayjs.Dayjs): string {
  const today = dayjs()
  const oneWeekAgo = today.subtract(7, 'day')
  const oneMonthAgo = today.subtract(1, 'month')

  if (date.isSame(today, 'day')) {
    return 'Today'
  }

  if (date.isSame(today.subtract(1, 'day'), 'day')) {
    return 'Yesterday'
  }

  if (date.isAfter(oneWeekAgo) && date.isBefore(today)) {
    return 'Previous 1 week'
  }

  if (date.isAfter(oneMonthAgo) && date.isBefore(today)) {
    return 'Previous 1 month'
  }

  return 'All'
}

interface IConversations {
  onSelect: (conversationId: string) => void
  // toggleDrawer: () => void
  activeConversationId: string
  onDelete: (conversationId: string) => void
  searchQuery?: string
  // notificationOpen: boolean;
  // onToggleNotifications: () => void;
}

// TODO query
export const ConversationList: FC<IConversations> = ({
  searchQuery = '',
  activeConversationId,
  onSelect,
  onDelete
}) => {
  const conversations = useStore((store) => store.conversations)

  const filteredConversations = useMemo(() => {
    if (conversations) {
      return conversations.filter((conversation) =>
        generateTitleFromMessages(conversation.messages)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    }
    return []
  }, [conversations, searchQuery])

  const groupedConversations = useMemo(() => {
    return filteredConversations.reduce(
      (acc, conversation) => {
        const dateCategory = conversation.createdAt
          ? formatConversationDate(dayjs(new Date(conversation.createdAt)))
          : 'All'

        if (!acc[dateCategory]) {
          acc[dateCategory] = []
        }
        acc[dateCategory].push(conversation)
        return acc
      },
      {} as Record<string, typeof conversations>
    )
  }, [filteredConversations])

  const handleSelect = (conversationId: string) => {
    // if (notificationOpen) {
    //   onToggleNotifications();
    // }

    onSelect(conversationId)
    // toggleDrawer()
  }

  return (
    <div className='flex flex-col gap-y-2 flex-1 min-h-0 overflow-y-scroll'>
      {Object.keys(groupedConversations).map((group) => {
        return (
          <div key={group}>
            <div className='text-sm font-semibold text-gray-a5 px-1 mb-1'>
              {group}
            </div>
            <div className='flex flex-col gap-y-1'>
              {groupedConversations[group].map((conversation) => (
                <div
                  key={conversation.id}
                  className={clsx(
                    `flex flex-row items-center justify-between px-1 cursor-pointer rounded-md
                      hover:bg-default hover:text-default-foreground transition-all`,
                    conversation.id === activeConversationId &&
                      'bg-default text-default-foreground'
                  )}
                  onClick={() => handleSelect(conversation.id)}
                >
                  <div>{generateTitleFromMessages(conversation.messages)}</div>
                  <ConversationDelete
                    conversationId={conversation.id}
                    onDelete={onDelete}
                    iconClass={
                      conversation.id === activeConversationId
                        ? 'text-default-foreground'
                        : 'text-co-text-1'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
