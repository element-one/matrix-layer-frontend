import { FC, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  ArrowLeftIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { Button as OriginButton, Divider, Input } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'

import { ConversationList } from './SidebarComponents/ConversationList'

interface SidebarProps {
  activeConversationId: string
  setActiveConversationId: (id: string) => void
  onDeleteConversation: (conversationId: string) => void
  createNewConversation: () => void
  isSidebarOpen: boolean
  onSidebarChange: (open: boolean) => void
}
const Sidebar: FC<SidebarProps> = ({
  activeConversationId,
  createNewConversation,
  setActiveConversationId,
  onDeleteConversation,
  isSidebarOpen,
  onSidebarChange
}) => {
  const t = useTranslations('Ai.sidebar')
  const { isConnected } = useAccount()

  const sidebarRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [maxWidth, setMaxWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 640) {
        setMaxWidth(windowWidth - 16) // padding: 8 x 2
      } else {
        setMaxWidth(360)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCreateNewConversation = () => {
    if (!isConnected) return

    createNewConversation()
    onSidebarChange(false)
  }

  const handleSelect = (conversationId: string) => {
    if (!isConnected) return

    setActiveConversationId(conversationId)
    onSidebarChange(false)
  }

  const handleDelete = (conversationId: string) => {
    if (!isConnected) return

    onDeleteConversation(conversationId)
    onSidebarChange(false)
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className='top-0 left-0 bottom-0 right-0 absolute bg-black/60 z-[99]'
          onClick={() => onSidebarChange(false)}
        />
      )}
      <div className='top-0 left-0 bottom-0 absolute text-co-text-1'>
        <OriginButton
          isIconOnly
          size='sm'
          variant='light'
          radius='full'
          className='m-5 absolute z-20'
          onPress={() => onSidebarChange(true)}
        >
          <Bars3CenterLeftIcon className='w-6 h-6 text-co-text-1' />
        </OriginButton>
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${maxWidth}px`, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='relative h-full z-[100]'
              >
                <div
                  className='w-full h-full p-5 border-2 border-[#666] rounded-[32px] bg-co-bg-1 flex flex-col'
                  ref={sidebarRef}
                >
                  <div className='flex flex-row items-center justify-between'>
                    <div className='bg-gradient-text-1 clip-text text-[24px] font-bold flex items-center gap-x-1'>
                      <OriginButton
                        isIconOnly
                        size='sm'
                        variant='light'
                        radius='full'
                        onPress={() => onSidebarChange(false)}
                      >
                        <ArrowLeftIcon className='w-4 h-4 text-co-text-1' />
                      </OriginButton>
                      {t('history')}
                    </div>
                    <Button
                      isDisabled={!isConnected}
                      color='primary'
                      className='text-lg font-semibold'
                      startContent={<PlusIcon className='w-4 h-4' />}
                      onPress={handleCreateNewConversation}
                    >
                      <span>{t('new')}</span>
                    </Button>
                  </div>
                  <Divider className='bg-[rgba(102,102,102,0.40)] my-2' />
                  <Input
                    placeholder={t('searchMessage')}
                    classNames={{
                      mainWrapper: 'border border-gray-666 rounded-[12px] mb-3',
                      inputWrapper:
                        'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
                      input:
                        'text-[12px] group-data-[has-value=true]:text-white'
                    }}
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.currentTarget.value)
                    }
                    endContent={
                      <MagnifyingGlassIcon className='w-4 h-4 text-co-text-1' />
                    }
                  />
                  <ConversationList
                    activeConversationId={activeConversationId}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    searchQuery={searchQuery}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Sidebar
