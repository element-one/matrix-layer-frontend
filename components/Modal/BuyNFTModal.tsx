import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'

export interface BuyNFTModalProps {
  onClose?: () => void
}

const GradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

export const BuyNFTModal: FC<BuyNFTModalProps> = ({ onClose }) => {
  const { hideModal, isModalShown } = useModal()
  const router = useRouter()

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  const handleBuyNFT = () => {
    handleClose()
    router.push('/presale?tab=nft')
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.BUY_NFT_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size='xl'
      placement='center'
      classNames={{
        base: 'w-[1000px] !max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-6 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <div className='flex flex-col items-center justify-center gap-6'>
            <img
              src='/images/stake/buy-nft.png'
              alt='buy nft'
              className='w-[588px]'
            />

            <div className='font-bold text-[32px] text-center'>
              You don&apos;t own any{' '}
              <span className={clsx(GradientTextClass, 'font-extra-bold')}>
                NFTs
              </span>
              , buy{' '}
              <span className={clsx(GradientTextClass, 'font-extra-bold')}>
                NFTs
              </span>{' '}
              to start your journey with $MLP/ earn $MLP
            </div>

            <div className='w-full gap-4 flex items-center justify-center'>
              <button
                className='rounded-full border-1 text-white text-[16px] h-[48px] w-[300px] uppercase
                  bg-img-inherit !bg-black !bg-opacity-0 border-white border-opacity-60'
                onClick={handleClose}
              >
                Cancel
              </button>
              <Button
                className='rounded-full uppercase text-[16px] h-[48px] w-[300px]'
                onClick={handleBuyNFT}
              >
                Buy NFT
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
