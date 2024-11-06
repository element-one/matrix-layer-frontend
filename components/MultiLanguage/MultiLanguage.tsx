import { Key } from 'react'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'

import { Text } from '@components/Text'

export const MultiLanguage = () => {
  const router = useRouter()

  const handleDropdownAction = (key: Key) => {
    const pathname = router.pathname
    router.push(pathname, pathname, {
      locale: key as string
    })
  }

  return (
    <Dropdown className='bg-transparent' placement='bottom' offset={28}>
      <DropdownTrigger>
        <Text className='cursor-pointer mr-5'>Language</Text>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='my account actions'
        onAction={handleDropdownAction}
        className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
      >
        <DropdownItem key='en' className='h-10'>
          English
        </DropdownItem>
        <DropdownItem key='zh' className='h-10'>
          Chinese
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
