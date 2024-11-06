import { Key } from 'react'
import { useRouter } from 'next/router'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'

export const MultiLanguagePC = () => {
  const router = useRouter()

  const handleDropdownAction = (key: Key) => {
    const pathname = router.pathname

    router.push(pathname, pathname, {
      locale: key as string
      // scroll: false
    })
  }

  return (
    <div className='items-center hidden sm:flex'>
      <Dropdown className='bg-transparent' placement='bottom' offset={28}>
        <DropdownTrigger>
          <Button isIconOnly={true} variant='light'>
            <GlobeAltIcon className='w-7 h-7 text-co-text-1' />
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
        className='bg-[rgba(102,102,102,0.40)] h-9 mx-2'
      />
    </div>
  )
}

export const MultiLanguageMobile = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'

  const handleDropdownAction = (key: Key) => {
    const pathname = router.pathname

    router.push(pathname, pathname, {
      locale: key as string
      // scroll: false
    })
  }

  return (
    <div className='items-center sm:hidden text-co-text-1 text-xl pb-1 pt-1'>
      <Dropdown className='bg-transparent' placement='bottom' offset={28}>
        <DropdownTrigger>
          {locale === 'en' ? 'Language' : '语言'}
        </DropdownTrigger>
        <DropdownMenu
          aria-label='language'
          onAction={handleDropdownAction}
          className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
          selectedKeys={new Set([locale])}
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
    </div>
  )
}
