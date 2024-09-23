import { FC, Key, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner
} from '@nextui-org/react'
import clsx from 'clsx'
import { useAccount, useSignMessage } from 'wagmi'

import { BtnArrowIcon } from '@components/Icon/BtnArrow'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useDisconnect } from '@hooks/useDisconnect'
import { useGetNonce, usePostWalletLogin } from '@services/api/auth'
import { useStore } from '@store/store'
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
  const { data: signData, signMessage, isPending: isSigning } = useSignMessage()
  const { data: nonceData, isLoading: isGettingNonce } = useGetNonce(address, {
    enabled: !!address,
    retry: false
  })
  const { mutate: login, isPending: isLogging } = usePostWalletLogin()

  const { hasSignSuccess, setHasSignSuccess } = useStore((state) => ({
    hasSignSuccess: state.hasSignSuccess,
    setHasSignSuccess: state.setHasSignSuccess
  }))
  const { isAuthenticated, setAuthenticated } = useAuth()

  const handleClick = () => {
    showModal(ModalType.CONNECT_WALLET_MODAL)
  }

  useEffect(() => {
    if (
      isConnected &&
      !isAuthenticated &&
      nonceData?.nonce &&
      address &&
      !hasSignSuccess
    ) {
      signMessage(
        {
          message: `Login to Wphone with one-time nonce: ${nonceData.nonce}`
        },
        {
          onSuccess() {
            setHasSignSuccess(true)
          },
          onError(err) {
            console.log('sign error: ', err)
            toast.error('signature error:' + (err as Error).message)
            disconnect()
          }
        }
      )
    }
  }, [
    nonceData?.nonce,
    address,
    isConnected,
    isAuthenticated,
    signMessage,
    hasSignSuccess,
    setHasSignSuccess,
    disconnect
  ])

  useEffect(() => {
    if (address && signData && hasSignSuccess && !isAuthenticated) {
      login(
        {
          address,
          signature: signData
        },
        {
          onSuccess: () => {
            setAuthenticated(true)
          },
          onError: () => {
            disconnect()
          }
        }
      )
    }
  }, [
    address,
    login,
    signData,
    hasSignSuccess,
    isAuthenticated,
    disconnect,
    setAuthenticated
  ])

  const handleDropdownAction = (key: Key) => {
    switch (key) {
      case 'logout':
        disconnect()
        break
      case 'myAccount':
        router.push('my-account')
        break
      default:
        break
    }
  }

  if (isConnected && isAuthenticated) {
    return (
      <>
        <Dropdown className='bg-transparent' placement='bottom' offset={28}>
          <DropdownTrigger>
            <div className='gap-2 items-center justify-center cursor-pointer hidden md:flex'>
              <div
                color='primary'
                className={clsx(
                  `px-3 md:px-7 flex items-center md:text-lg text-xs justify-center gap-2
                    !rounded-2xl h-[28px] md:h-[42px] leading-[42px] text-co-text-1 font-semibold
                    bg-gradient-to-r from-co-button-gradient-from to-co-button-gradient-to`,
                  className
                )}
              >
                {(isConnecting || isReconnecting) && (
                  <Spinner size='sm' color='default' aria-label='Loading...' />
                )}
                {formatWalletAddress(address)}
              </div>
              <img src='/images/svg/user-icon.svg' alt='user' width={43} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='my account actions'
            onAction={handleDropdownAction}
            className='bg-co-bg-1 text-co-text-1 py-2 border rounded-2xl border-co-border-gray'
          >
            <DropdownItem key='myAccount' className='h-10'>
              My Account
            </DropdownItem>
            <DropdownItem key='logout' className='h-10'>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div
          color='primary'
          className={clsx(
            `px-3 md:px-7 flex md:hidden cursor-pointer items-center md:text-lg text-xs
              justify-center gap-2 !rounded-2xl h-[28px] md:h-[42px] leading-[42px]
              text-co-text-1 font-semibold bg-gradient-to-r from-co-button-gradient-from
              to-co-button-gradient-to`,
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
          md:h-[48px] text-base font-bold gap-x-1`,
        className
      )}
      color='primary'
      onClick={handleClick}
      isLoading={isGettingNonce || isLogging || isSigning}
    >
      <BtnArrowIcon />
      <span>Connect Wallet</span>
    </Button>
  )
}
