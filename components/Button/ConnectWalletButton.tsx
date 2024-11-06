import { FC, Key } from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner
} from '@nextui-org/react'
import clsx from 'clsx'
import { useAccount, useDisconnect } from 'wagmi'

import { ModalType, useModal } from '@contexts/modal'
import { formatWalletAddress } from '@utils/formatWalletAddress'

import Button from './Button'

export interface ConnectWalletButtonProps {
  className?: string
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  className
}) => {
  const router = useRouter()
  const { showModal } = useModal()
  const { isConnected, isConnecting, isReconnecting, address } = useAccount()
  const { disconnect } = useDisconnect()

  const t = useTranslations('Navigation')

  const handleClick = () => {
    showModal(ModalType.CONNECT_WALLET_MODAL)
  }

  const handleDropdownAction = (key: Key) => {
    switch (key) {
      case 'logout':
        disconnect()
        break
      case 'myAccount':
        router.push('my-account')
        break
      case 'stake':
        router.push('stake')
        break
      default:
        break
    }
  }

  if (isConnected) {
    return (
      <>
        <Dropdown className='bg-transparent' placement='bottom' offset={28}>
          <DropdownTrigger>
            <div className='gap-2 items-center justify-center cursor-pointer hidden md:flex'>
              <div
                color='primary'
                className={clsx(
                  `px-3 md:px-4 flex items-center md:text-[16px] text-xs justify-center gap-2
                    rounded-[35px] h-[28px] md:h-[48px] text-black font-semibold
                    bg-gradient-button-1`,
                  className
                )}
              >
                {(isConnecting || isReconnecting) && (
                  <Spinner size='sm' color='default' aria-label='Loading...' />
                )}
                {formatWalletAddress(address)}
              </div>
              <img src='/images/svg/user-icon.svg' alt='user' width={48} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='my account actions'
            onAction={handleDropdownAction}
            className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
          >
            <DropdownItem key='myAccount' className='h-10'>
              {t('myAccount')}
            </DropdownItem>
            <DropdownItem key='logout' className='h-10'>
              {t('logout')}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div
          color='primary'
          className={clsx(
            `px-3 md:px-7 flex md:hidden cursor-pointer items-center md:text-lg text-[10px]
              justify-center gap-2 !rounded-2xl h-[28px] md:h-[42px] leading-[42px]
              font-semibold bg-gradient-button-1 text-black`,
            className
          )}
        >
          {(isConnecting || isReconnecting) && (
            <Spinner size='sm' color='default' aria-label='Loading...' />
          )}
          {formatWalletAddress(address)}
        </div>
      </>
    )
  }

  return (
    <Button
      className={clsx(
        `flex flex-row items-center justify-center px-3 md:px-7 !rounded-[35px] h-[28px]
          md:h-[48px] text-base font-semibold gap-x-1 md:w-[190px]`,
        className
      )}
      color='primary'
      onClick={handleClick}
      isLoading={isConnecting || isReconnecting}
    >
      <span>{t('connectWallet')}</span>
    </Button>
  )
}
