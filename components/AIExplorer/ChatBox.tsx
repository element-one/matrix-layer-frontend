import { ChangeEvent, FC, Ref } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input } from '@nextui-org/react'

import {
  ReSendMessageIcon,
  SendMessageIcon
} from '@components/Icon/SendMessage'

interface ChatBoxProps {
  onSend: (content: string) => void
  message: string
  setMessage: (value: string) => void
  disabled?: boolean
  onChange?: () => void
  inputRef: Ref<HTMLInputElement>
  isError?: boolean
  messageToResend?: string
  showMessageSelections: boolean
}

const ChatBox: FC<ChatBoxProps> = ({
  onSend,
  message,
  setMessage,
  disabled,
  onChange,
  inputRef,
  isError,
  messageToResend
}) => {
  const t = useTranslations('Ai.conversation')
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    onChange?.()
  }

  const handleSend = () => {
    if (message.trim() === '') {
      return
    }

    setMessage('')

    onSend(message)
  }

  return (
    <div className='w-full py-5 px-5 flex gap-x-4 items-center'>
      <Input
        ref={inputRef}
        placeholder={t('sentenceHere')}
        classNames={{
          mainWrapper: 'border border-gray-666 rounded-[12px]',
          inputWrapper:
            'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
          input: 'text-[16px] group-data-[has-value=true]:text-white'
        }}
        isDisabled={disabled}
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !disabled && message.trim()) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      <Button
        isDisabled={disabled || !message.trim()}
        isIconOnly
        variant='bordered'
        onClick={handleSend}
      >
        {isError && messageToResend === message ? (
          <ReSendMessageIcon />
        ) : (
          <SendMessageIcon />
        )}
      </Button>
    </div>
  )
}

export default ChatBox
