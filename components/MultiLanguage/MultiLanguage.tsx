import { Key } from 'react'
import { useRouter } from 'next/router'
import { LanguageIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'

export const MultiLanguage = () => {
  const router = useRouter()

  const handleDropdownAction = (key: Key) => {
    const pathname = router.pathname

    router.push(pathname, pathname, {
      locale: key as string
      // scroll: false
    })
  }

  return (
    <>
      <Dropdown className='bg-transparent' placement='bottom' offset={28}>
        <DropdownTrigger>
          <Button isIconOnly={true} variant='light'>
            <LanguageIcon className='w-7 h-7 text-co-text-1' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='language'
          onAction={handleDropdownAction}
          className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
          selectedKeys={new Set([router.locale ?? 'en'])}
          disallowEmptySelection
          selectionMode='single'
        >
          <DropdownItem key='en' className='h-10'>
            English
          </DropdownItem>
          <DropdownItem key='zh' className='h-10'>
            简体中文
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Divider
        orientation='vertical'
        className='bg-[rgba(102,102,102,0.40)] h-9 hidden sm:block sm:mr-2'
      />
    </>
  )
}
