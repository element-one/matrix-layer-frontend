import { ChangeEvent, useState } from 'react'
import { Button, Input } from '@nextui-org/react'

import { SendMessageIcon } from '@components/Icon/SendMessage'

const ChatBox = () => {
  const [message, setMessage] = useState('')

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className='w-full py-5 px-5 flex gap-x-4 items-center'>
      <Input
        placeholder='Your Sentence Here...'
        classNames={{
          mainWrapper: 'border border-gray-666 rounded-[12px]',
          inputWrapper:
            'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
          input: 'text-[12px] group-data-[has-value=true]:text-white'
        }}
        value={message}
        onChange={handleChangeMessage}
      />
      <Button isIconOnly variant='bordered'>
        <SendMessageIcon />
      </Button>
    </div>
  )
}

export default ChatBox
