import { useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent
} from '@nextui-org/react'
import clsx from 'clsx'

import { useStore } from '@store/store'

interface IConversationDelete {
  conversationId: string
  onDelete: (conversationId: string) => void
  iconClass?: string
}

export default function ConversationDelete({
  onDelete,
  conversationId,
  iconClass = ''
}: IConversationDelete) {
  const conversations = useStore((store) => store.conversations)
  const setConversations = useStore((store) => store.setConversations)
  const [modalOpened, setModalOpened] = useState(false)

  const handleDeleteClick = () => {
    setConversations(conversations.filter((conv) => conv.id !== conversationId))
    onDelete(conversationId)
    setModalOpened(false)
  }

  const handleDropdownAction = (key: React.Key) => {
    switch (key) {
      case 'delete':
        setModalOpened(true)
        break
      default:
        break
    }
  }

  return (
    <>
      <Dropdown className='bg-transparent' placement='bottom'>
        <DropdownTrigger>
          <Button isIconOnly={true} variant='light'>
            <EllipsisVerticalIcon className={clsx('w-5 h-5', iconClass)} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='language'
          onAction={handleDropdownAction}
          className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
          disallowEmptySelection
          selectionMode='single'
        >
          <DropdownItem key='delete' className='h-10 text-red-300'>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={modalOpened}
        onClose={() => setModalOpened(false)}
        placement='center'
        size='lg'
        classNames={{
          wrapper: 'z-[1000]',
          closeButton: 'hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
        }}
      >
        <ModalContent className='bg-co-bg-1 border border-co-border-gray text-co-text-1 py-10'>
          <ModalBody className='flex flex-col items-center justify-center gap-8'>
            <div className='font-semibold text-[32px]'>Confirm Delete</div>
            <div>Are you sure you want to delete this conversation?</div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <Button onClick={handleDeleteClick} color='danger'>
                Confirm
              </Button>
              <Button onClick={() => setModalOpened(false)}>Cancel</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
