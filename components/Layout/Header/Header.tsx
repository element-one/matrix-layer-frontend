'use client'

import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import clsx from 'clsx'
import { useAccount, useDisconnect } from 'wagmi'

import { Button, ConnectWalletButton } from '@components/Button'
import { MenuItemIcon } from '@components/Icon/MenuItemsIcon'
import {
  MultiLanguageMobile,
  MultiLanguagePC
} from '@components/MultiLanguage/MultiLanguage'
import { ModalType, useModal } from '@contexts/modal'

import { MenuList } from './ProfileMenu'

interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const t = useTranslations('Navigation')

  const { asPath } = useRouter()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const { showModal } = useModal()

  const [menuVisible, setMenuVisible] = useState(false)

  const hideMenu = () => {
    setMenuVisible(false)
  }

  const handleMyAccountButtonClick = () => {
    router.push('/my-account')
    hideMenu()
  }

  const handleCompensationButtonClick = () => {
    router.push('/compensation-plan')
    hideMenu()
  }

  const handleConnectWalletButtonClick = () => {
    hideMenu()
    showModal(ModalType.CONNECT_WALLET_MODAL)
  }

  const handleLogout = () => {
    disconnect()
    hideMenu()
  }

  return (
    <div
      className={clsx(
        `flex items-center w-full border-co-border-1 bg-opacity-5 backdrop-blur-md py-3
          lg:py-6 px-4 lg:px-[60px] justify-between rounded-[32px] border`,
        className
      )}
    >
      <div className=''>
        <Link href='/'>
          <img
            width={'w-[172px] h-[53px]'}
            src='/images/svg/logo_matrix.svg'
            alt='worldphone'
          />
        </Link>
      </div>
      <div className='hidden lg:flex items-center justify-center gap-[50px]'>
        {MenuList.map(({ key, href }) => {
          return (
            <Link
              className={clsx(
                'text-co-text-1 text-[24px] font-bold pb-3 pt-1',
                asPath === href && 'bg-gradient-text-1 clip-text'
              )}
              href={href}
              key={key}
            >
              {t(key as any)}
            </Link>
          )
        })}
      </div>
      <div className='flex items-center justify-end gap-2'>
        <MultiLanguagePC />
        <ConnectWalletButton />
        <Popover
          backdrop='opaque'
          placement='bottom'
          className='left-0'
          offset={20}
          classNames={{
            base: 'ml-[-12px]',
            content: 'left-0 bg-transparent rounded-none text-white'
          }}
          triggerType='menu'
          isOpen={menuVisible}
          onClose={hideMenu}
        >
          <PopoverTrigger className='lg:hidden'>
            <div onClick={() => setMenuVisible(true)}>
              <MenuItemIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-screen left-0 relative md:px-10'>
            <div
              className='border-gradient w-full h-full flex flex-col gap-7 items-center justify-start
                py-[30px] px-[25px]'
            >
              <div className='flex flex-col items-center justify-center gap-4'>
                {MenuList.map(({ key, href }) => {
                  return (
                    <Link
                      className={clsx(
                        'text-co-text-1 text-xl pb-1 pt-1',
                        asPath === href &&
                          'border-b border-co-border-1 font-semibold'
                      )}
                      href={href}
                      key={key}
                      onClick={hideMenu}
                    >
                      {t(key as any)}
                    </Link>
                  )
                })}
                <MultiLanguageMobile />
              </div>

              {isConnected ? (
                <>
                  <Button
                    onClick={handleMyAccountButtonClick}
                    color='primary'
                    className='w-full h-[50px] !rounded-full text-[20px]'
                  >
                    {t('myAccount')}
                  </Button>
                  {/* TODO when to show */}
                  <Button
                    onClick={handleCompensationButtonClick}
                    color='primary'
                    className='w-full h-[50px] !rounded-full text-[20px]'
                  >
                    {t('compensationPlan')}
                  </Button>
                  <div className='w-full'>
                    <Divider className='bg-co-bg-3' />
                    <div
                      onClick={handleLogout}
                      className='cursor-pointer mt-5 text-center w-fit px-12 mx-auto text-xl'
                    >
                      {t('logout')}
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleConnectWalletButtonClick}
                  className='w-full h-[50px] !rounded-full text-[20px]'
                >
                  {t('connectWallet')}
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

Header.displayName = 'Header'
export default Header
