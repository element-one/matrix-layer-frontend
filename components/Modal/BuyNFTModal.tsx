import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslations } from 'next-intl'
import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import clsx from 'clsx'

import { ModalType, useModal } from '@contexts/modal'

export interface BuyNFTModalProps {
  onClose?: () => void
}

const GradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

export const BuyNFTModal: FC<BuyNFTModalProps> = ({ onClose }) => {
  const t = useTranslations('BuyNFTModal')

  const { hideModal, isModalShown } = useModal()

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  const handleBuyNFT = () => {
    handleClose()
    if (window) {
      window.location.replace('/presale?tab=nft')
    }
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.BUY_NFT_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size={isMobile ? 'full' : 'xl'}
      placement='center'
      classNames={{
        base: 'w-[1000px] max-w-[100vw] md:!max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 md:border md:border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-6 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <div className='flex flex-col items-center justify-center gap-6'>
            <img
              src='/images/stake/buy-nft.png'
              alt='buy nft'
              className='w-[588px]'
            />

            <div className='font-bold text-[26px] md:text-[32px] text-center'>
              {t.rich('statement', {
                text1: (chunks) => (
                  <span className={clsx(GradientTextClass, 'font-extra-bold')}>
                    {chunks}
                  </span>
                ),
                text2: (chunks) => (
                  <span className={clsx(GradientTextClass, 'font-extra-bold')}>
                    {chunks}
                  </span>
                )
              })}
            </div>

            <div className='w-full gap-4 flex items-center justify-center'>
              <button
                className='rounded-full border-1 text-white text-[16px] h-[48px] w-[300px] uppercase
                  bg-img-inherit !bg-black !bg-opacity-0 border-white border-opacity-60'
                onClick={handleClose}
              >
                {t('cancel')}
              </button>
              <Button
                href='/presale?tab=nft'
                className='rounded-full uppercase text-[16px] h-[48px] w-[300px]'
                onClick={handleBuyNFT}
              >
                {t('buyNFT')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
