import { FC, useCallback, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { WalletButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'
import { MetamaskIcon } from '@components/Icon/MetamaskIcon'
import { OKXIcon } from '@components/Icon/OKXIcon'
import { WalletConnectIcon } from '@components/Icon/WalletConnectIcon'
import { ModalType, useModal } from '@contexts/modal'

export interface ConnectWalletModalProps {
  onClose?: () => void
}

const buttonClass =
  'py-4 w-full h-[56px] md:h-[64px] hover:bg-gray-42 disabled:bg-purple-500'

export const ConnectWalletModal: FC<ConnectWalletModalProps> = () => {
  const { isModalShown, hideModal } = useModal()

  const { isConnected } = useAccount()
  const { theme } = useTheme()

  const handleClose = useCallback(() => {
    hideModal()
  }, [hideModal])

  useEffect(() => {
    if (isConnected) {
      handleClose()
    }
  }, [isConnected, handleClose])

  if (isConnected) {
    return null
  }

  return (
    <Modal
      size='xl'
      placement='center'
      onClose={handleClose}
      isOpen={isModalShown(ModalType.CONNECT_WALLET_MODAL)}
      classNames={{
        closeButton:
          'right-12 top-12 text-gray-90 text-lg hover:bg-co-bg-3 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-co-bg-default border border-gray-32'>
        <ModalBody>
          <div className='flex flex-col gap-5 items-center py-10 px-6 text-co-text-primary'>
            <div className='text-xl leading-9'>Connect Wallet</div>

            <WalletButton.Custom wallet='metamask'>
              {({ ready, connect }) => {
                return (
                  <Button
                    disabled={!ready}
                    onClick={connect}
                    color='default'
                    className={buttonClass}
                  >
                    <div>
                      <MetamaskIcon
                        color={theme === 'dark' ? '#fff' : '#000'}
                      />
                    </div>
                  </Button>
                )
              }}
            </WalletButton.Custom>

            <WalletButton.Custom wallet='binance'>
              {({ ready, connect }) => {
                return (
                  <Button
                    disabled={!ready}
                    onClick={connect}
                    color='default'
                    className={buttonClass}
                  >
                    <img
                      src='/images/png/binance.png'
                      alt='binance'
                      height={32}
                    />
                  </Button>
                )
              }}
            </WalletButton.Custom>

            <WalletButton.Custom wallet='walletConnect'>
              {({ ready, connect }) => {
                return (
                  <Button
                    color='default'
                    className={buttonClass}
                    disabled={!ready}
                    onClick={connect}
                  >
                    <div>
                      <WalletConnectIcon />
                    </div>
                  </Button>
                )
              }}
            </WalletButton.Custom>

            <WalletButton.Custom wallet='okx'>
              {({ ready, connect }) => {
                return (
                  <Button
                    disabled={!ready}
                    onClick={connect}
                    color='default'
                    className={buttonClass}
                  >
                    <div>
                      <OKXIcon color={theme === 'dark' ? '#fff' : '#000'} />
                    </div>
                  </Button>
                )
              }}
            </WalletButton.Custom>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
