import { ChangeEvent, FC, Ref } from 'react'
import { Button, Input } from '@nextui-org/react'

import { SendMessageIcon } from '@components/Icon/SendMessage'

interface ChatBoxProps {
  onSend: (content: string) => void
  message: string
  setMessage: (value: string) => void
  disabled?: boolean
  onChange?: () => void
  inputRef: Ref<HTMLInputElement>
}

const ChatBox: FC<ChatBoxProps> = ({
  onSend,
  message,
  setMessage,
  disabled,
  onChange,
  inputRef
}) => {
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
        placeholder='Your Sentence Here...'
        classNames={{
          mainWrapper: 'border border-gray-666 rounded-[12px]',
          inputWrapper:
            'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
          input: 'text-[14px] group-data-[has-value=true]:text-white'
        }}
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
        <SendMessageIcon />
      </Button>
    </div>
  )
}

export default ChatBox
