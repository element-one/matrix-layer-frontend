import { Key, useState } from 'react'
import { useMount } from 'react-use'
import { useRouter } from 'next/router'
import { ArrowLeftIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import clsx from 'clsx'

const LANGS = [
  {
    key: 'en',
    label: 'English'
  },
  {
    key: 'zh',
    label: '简体中文'
  }
]

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
          {LANGS.map((item) => (
            <DropdownItem key={item.key} className='h-10'>
              {item.label}
            </DropdownItem>
          ))}
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
  const [isChoosing, setIsChoosing] = useState(true)

  useMount(() => {
    setIsChoosing(false)
  })

  const handleDropdownAction = (key: Key) => {
    const pathname = router.pathname

    router.push(pathname, pathname, {
      locale: key as string
      // scroll: false
    })
    setIsChoosing(false)
  }

  return (
    <div className='items-center sm:hidden text-co-text-1 text-xl pb-1 pt-1'>
      <div onClick={() => setIsChoosing(true)}>
        {locale === 'en' ? 'LANGUAGE' : '语言'}
      </div>
      {isChoosing && (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-[1000] bg-black'>
          <div onClick={() => setIsChoosing(false)} className='p-5 pb-4'>
            <ArrowLeftIcon className='w-6 h-6' />
          </div>
          <div className='flex flex-col gap-y-4'>
            {LANGS.map((item) => (
              <div
                className={clsx(
                  'w-full py-2 px-5',
                  locale === item.key && 'clip-text bg-gradient-home-text-1'
                )}
                onClick={() => handleDropdownAction(item.key)}
                key={item.key}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
