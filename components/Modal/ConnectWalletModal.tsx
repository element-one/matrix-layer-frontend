import { FC, useCallback, useEffect } from 'react'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { WalletButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'

export interface ConnectWalletModalProps {
  onClose?: () => void
}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = () => {
  const { isModalShown, hideModal } = useModal()

  const { isConnected } = useAccount()

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
          'right-12 top-12 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-co-bg-1 border border-co-border-gray'>
        <ModalBody>
          <div className='flex flex-col gap-5 items-center py-10 px-6 text-co-text-1'>
            <div className='text-xl leading-9'>Connect Wallet</div>

            <WalletButton.Custom wallet='metamask'>
              {({ ready, connect }) => {
                return (
                  <Button
                    disabled={!ready}
                    onClick={connect}
                    color='default'
                    className='py-4 w-full h-[56px] md:h-[64px]'
                  >
                    <img
                      src='/images/png/metamask.png'
                      alt='metamask'
                      height={32}
                    />
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
                    className='py-4 w-full h-[56px] md:h-[64px]'
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
                    className='py-4 w-full h-[56px] md:h-[64px]'
                    disabled={!ready}
                    onClick={connect}
                  >
                    <img
                      src='/images/png/wallet-connect.png'
                      alt='wallet connect'
                      height={32}
                    />
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
                    className='py-4 w-full h-[56px] md:h-[64px]'
                  >
                    <img src='/images/png/okx.png' alt='okx' height={32} />
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
