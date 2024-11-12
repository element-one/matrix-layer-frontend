import { useState } from 'react'
import { useTranslations } from 'next-intl'
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
import { useAccount } from 'wagmi'

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
  const t = useTranslations('Ai.sidebar.delete')
  const { isConnected } = useAccount()

  const [modalOpened, setModalOpened] = useState(false)

  const handleDeleteClick = () => {
    if (!isConnected) return

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
          <DropdownItem key='delete' className='h-10 text-[#f31260]'>
            {t('delete')}
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
            <div className='font-semibold text-[32px]'>{t('title')}</div>
            <div>{t('info')}</div>

            <div className='flex flex-row items-center justify-center gap-2'>
              <Button onClick={handleDeleteClick} color='danger'>
                {t('confirm')}
              </Button>
              <Button onClick={() => setModalOpened(false)}>
                {t('cancel')}
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
