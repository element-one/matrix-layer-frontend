import { FC } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'

export interface WithdrawDetailModalProps {
  onClose?: () => void
  withdrawDate: string
  stakedAmount: string
  rewards: string
  transactionHash: string
}

export const WithdrawDetailModal: FC<WithdrawDetailModalProps> = ({
  withdrawDate,
  stakedAmount,
  rewards,
  transactionHash,
  onClose
}) => {
  const t = useTranslations('WithdrawModal')

  const { isModalShown, hideModal } = useModal()

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.WITHDRAW_DETAIL_MODAL)}
      onClose={handleClose}
      size='md'
      placement='center'
      hideCloseButton
      classNames={{
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='border-accelerate-modal-gradient font-chakraPetch'>
        <ModalBody className='flex flex-col p-6 md:px-12 md:py-10 text-co-text-1 items-center'>
          <div className='text-center text-[32px] font-bold'>
            {t('withdrawDetails')}
          </div>
          <div className='w-full flex flex-col gap-2'>
            {[
              { label: t('withdrawDate'), value: withdrawDate },
              { label: t('stakedAmount'), value: stakedAmount },
              { label: t('rewards'), value: rewards }
            ].map(({ label, value }) => (
              <div key={label} className='flex items-center justify-between'>
                <div className='flex items-center justify-between basis-[142px]'>
                  <span>{label}</span>
                  <span>:</span>
                </div>
                <div className='text-[14px] md:text-[18px]'>{value}</div>
              </div>
            ))}
          </div>
          <Link
            href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${transactionHash}`}
            target='_blank'
            className='w-full mt-2 text-[14px] font-bold text-gray-a5 flex justify-end underline'
          >
            {t('viewTransaction')}
          </Link>
        </ModalBody>
        <ModalFooter className='flex justify-center gap-6'>
          <Button
            className='px-3 h-[40px] py-2 md:p-[10px] w-[120px] rounded-[32px] text-[12px]
              md:text-[16px] font-bold !bg-transparent !bg-img-inherit text-co-text-primary
              border-[2px] border-solid border-white'
            onClick={handleClose}
          >
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
