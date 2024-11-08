import { FC, useMemo } from 'react'
import { useTranslations } from 'next-intl'
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

function getConversationGroupKey(date: dayjs.Dayjs): string {
  const today = dayjs()
  const oneWeekAgo = today.subtract(7, 'day')
  const oneMonthAgo = today.subtract(1, 'month')

  if (date.isSame(today, 'day')) {
    return 'today'
  }

  if (date.isSame(today.subtract(1, 'day'), 'day')) {
    return 'yesterday'
  }

  if (date.isAfter(oneWeekAgo) && date.isBefore(today)) {
    return 'oneWeekAgo'
  }

  if (date.isAfter(oneMonthAgo) && date.isBefore(today)) {
    return 'oneMonthAgo'
  }

  return 'all'
}

interface IConversations {
  onSelect: (conversationId: string) => void
  activeConversationId: string
  onDelete: (conversationId: string) => void
  searchQuery?: string
}

export const ConversationList: FC<IConversations> = ({
  searchQuery = '',
  activeConversationId,
  onSelect,
  onDelete
}) => {
  const t = useTranslations('Ai.sidebar')

  const conversations = useStore((store) => store.conversations)

  const filteredConversations = useMemo(() => {
    if (conversations) {
      return conversations
        .filter((conversation) =>
          generateTitleFromMessages(conversation.messages)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }
    return []
  }, [conversations, searchQuery])

  const groupedConversations = useMemo(() => {
    return filteredConversations.reduce(
      (acc, conversation) => {
        const dateCategory = conversation.createdAt
          ? getConversationGroupKey(dayjs(new Date(conversation.createdAt)))
          : 'all'

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
    onSelect(conversationId)
  }

  return (
    <div className='flex flex-col gap-y-2 flex-1 min-h-0 overflow-y-scroll'>
      {Object.keys(groupedConversations).map((group) => {
        return (
          <div key={group}>
            <div className='text-sm font-semibold px-1 mb-1 bg-gradient-text-1 clip-text'>
              {t(`group.${group}` as any)}
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
