import { FC, ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'

export interface WithdrawModalProps {
  content?: ReactNode
  onConfirm?: () => void
  onClose?: () => void
}

export const WithdrawModal: FC<WithdrawModalProps> = ({
  content,
  onClose,
  onConfirm
}) => {
  const t = useTranslations('WithdrawModal')

  const { isModalShown, hideModal, isConfirmLoading } = useModal()

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.WITHDRAW_MODAL)}
      onClose={handleClose}
      size='2xl'
      placement='center'
      hideCloseButton
      classNames={{
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='border-accelerate-modal-gradient font-chakraPetch'>
        <ModalBody className='flex flex-col p-6 md:px-12 md:py-10 text-co-text-1 items-center'>
          <div className='text-center text-[24px]'>{t('withdraw')}</div>
          {content ?? (
            <>
              <div className='w-full'>{t('desc', { amount: '123.84' })}</div>
              <div className='w-full'>{t('total', { amount: '123.84' })}</div>
            </>
          )}
        </ModalBody>
        <ModalFooter className='flex justify-center gap-6'>
          <Button
            className='px-3 h-[40px] py-2 md:p-[10px] w-[120px] rounded-[32px] text-[12px]
              md:text-[16px] font-bold !bg-transparent !bg-img-inherit text-co-text-primary
              border-[2px] border-solid border-white'
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <Button
            className='px-3 h-[40px] md:p-[10px] w-[120px] rounded-[32px] text-[12px] md:text-[16px]
              font-bold'
            onClick={onConfirm}
            isLoading={isConfirmLoading?.[ModalType.WITHDRAW_MODAL]}
          >
            {t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
