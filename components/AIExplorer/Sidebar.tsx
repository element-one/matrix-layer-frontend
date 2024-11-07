import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { Button as OriginButton, Divider, Input } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/Button'

import { ConversationList } from './SidebarComponents/ConversationList'

interface SidebarProps {
  activeConversationId: string
  setActiveConversationId: (id: string) => void
  onDeleteConversation: (conversationId: string) => void
  createNewConversation: () => void
  isSidebarOpen: boolean
  onSidebarChange: (open: boolean) => void
  // onToggleNotifications: () => void;
  // notificationOpen: boolean;
  // setSelected: (icon: "chat" | "tasks" | "notifications") => void;
}
const Sidebar: FC<SidebarProps> = ({
  activeConversationId,
  createNewConversation,
  setActiveConversationId,
  onDeleteConversation,
  isSidebarOpen,
  onSidebarChange
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState('')

  const handleClickOutside = useCallback(
    (event: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onSidebarChange(false)
      }
    },
    [onSidebarChange]
  )

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleClickOutside as unknown as EventListener
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as unknown as EventListener
      )
    }
  }, [])

  const handleCreateNewConversation = () => {
    createNewConversation()
    onSidebarChange(false)
    // setSelected("chat");
  }

  const handleSelect = (conversationId: string) => {
    setActiveConversationId(conversationId)
    // setSelected("chat");
    onSidebarChange(false)
  }

  const handleDelete = (conversationId: string) => {
    onDeleteConversation(conversationId)
    onSidebarChange(false)
  }

  return (
    <div className='top-0 left-0 bottom-0 absolute text-co-text-1'>
      <OriginButton
        isIconOnly
        size='sm'
        variant='light'
        radius='full'
        className='m-5 absolute'
        onPress={() => onSidebarChange(true)}
      >
        <Bars3CenterLeftIcon className='w-6 h-6 text-co-text-1' />
      </OriginButton>
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '360px', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='relative h-full z-[100]'
            >
              <div
                className='w-full h-full p-5 border-2 border-[#666] rounded-tl-[32px] rounded-bl-[32px]
                  bg-co-bg-1 flex flex-col'
                ref={sidebarRef}
              >
                <div className='flex flex-row items-center justify-between'>
                  <div className='bg-gradient-text-1 clip-text text-[24px] font-bold'>
                    History
                  </div>
                  <Button
                    color='primary'
                    className='text-lg font-semibold'
                    startContent={<PlusIcon className='w-4 h-4' />}
                    onPress={handleCreateNewConversation}
                  >
                    <span>New</span>
                  </Button>
                </div>
                <Divider className='bg-[rgba(102,102,102,0.40)] my-2' />
                <Input
                  placeholder='Search Message'
                  classNames={{
                    mainWrapper: 'border border-gray-666 rounded-[12px] mb-3',
                    inputWrapper:
                      'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
                    input: 'text-[12px] group-data-[has-value=true]:text-white'
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
  )
}

export default Sidebar
