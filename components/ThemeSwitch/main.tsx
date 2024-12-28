'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'

import { MoonIcon } from './MoonIcon'
import { SunIcon } from './SunIcon'

export function ThemeSwitch(props: { showText?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      isIconOnly
      variant='light'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle theme'
      className='w-full text-xl text-co-text-primary'
    >
      {theme === 'dark' ? (
        <SunIcon color='#fff' className='size-7' />
      ) : (
        <MoonIcon className='size-7' />
      )}
      {props.showText ? (theme === 'dark' ? 'Light' : 'Dark') : ''}
    </Button>
  )
}
