'use client'

import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import clsx from 'clsx'
import { useAccount } from 'wagmi'

import { Button, ConnectWalletButton } from '@components/Button'
import { MenuItemIcon } from '@components/Icon/MenuItemsIcon'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useDisconnect } from '@hooks/useDisconnect'

import { MenuList } from './ProfileMenu'

interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const { asPath } = useRouter()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { isAuthenticated } = useAuth()
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
          md:py-6 px-4 md:px-[60px] justify-between rounded-[32px] border`,
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
      <div className='hidden md:flex items-center justify-center gap-[80px]'>
        {MenuList.map(({ key, label, href }) => {
          return (
            <Link
              className={clsx(
                'text-co-text-1 text-[24px] font-bold pb-3 pt-1',
                asPath === href && 'bg-gradient-text-1 clip-text'
              )}
              href={href}
              key={key}
            >
              {label}
            </Link>
          )
        })}
      </div>
      <div className='flex items-center justify-end gap-2'>
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
          <PopoverTrigger className='md:hidden'>
            <div onClick={() => setMenuVisible(true)}>
              <MenuItemIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-screen left-0'>
            <div
              className='border-gradient w-full h-full flex flex-col gap-7 items-center justify-start
                py-[30px] px-[25px]'
            >
              <div className='flex flex-col items-center justify-center gap-4'>
                {MenuList.map(({ key, label, href }) => {
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
                      {label}
                    </Link>
                  )
                })}
              </div>

              {isAuthenticated && isConnected ? (
                <>
                  <Button
                    onClick={handleMyAccountButtonClick}
                    color='primary'
                    className='w-full h-[50px] !rounded-full text-[20px]'
                  >
                    My Account
                  </Button>
                  <div className='w-full'>
                    <Divider className='bg-co-bg-3' />
                    <div
                      onClick={handleLogout}
                      className='cursor-pointer mt-5 text-center w-fit px-12 mx-auto text-xl'
                    >
                      Log out
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleConnectWalletButtonClick}
                  className='w-full h-[50px] !rounded-full text-[20px]'
                >
                  Connect Wallet
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
