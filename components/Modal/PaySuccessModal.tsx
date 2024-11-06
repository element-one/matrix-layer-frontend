import { useState } from 'react'
import { useInterval } from 'react-use'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'

export interface PaySuccessModalProps {
  onClose?: () => void
}

export const PaySuccessModal = () => {
  const t = useTranslations('Checkout')

  const { hideModal, isModalShown } = useModal()
  const router = useRouter()
  const [count, setCount] = useState(5)

  const handleClose = () => {
    hideModal()
  }

  const handleButtonClick = () => {
    router.push('/my-account')
    handleClose()
  }

  useInterval(
    () => {
      setCount(count - 1)
    },
    count > 0 ? 1000 : null
  )

  return (
    <Modal
      isOpen={isModalShown(ModalType.PAY_SUCCESS_MODAL)}
      onClose={handleClose}
      placement='center'
      size='lg'
      classNames={{
        closeButton: 'hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-co-bg-1 border border-co-border-gray text-co-text-1 py-10'>
        <ModalBody className='flex flex-col items-center justify-center gap-8'>
          <div className='font-semibold text-[32px]'>
            {t('paymentSuccessful')}
          </div>

          <div className='flex flex-col items-center justify-center gap-2'>
            <Button
              disabled={count > 0}
              color='primary'
              className='font-semibold mb-2 text-lg px-10 h-[48px]'
              onClick={handleButtonClick}
            >
              {t('ViewMyOrders')}
            </Button>
            {count > 0 && (
              <div className='text-sm text-co-text-3'>{count} S</div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
