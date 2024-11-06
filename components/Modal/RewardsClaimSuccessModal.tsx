import { FC, useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, ModalProps } from '@nextui-org/react'

import { Text } from '@components/Text'

export interface ClaimRewardsSuccessModalProps
  extends Omit<ModalProps, 'children'> {}

export const RewardsClaimSuccessModal: FC<ClaimRewardsSuccessModalProps> = ({
  isOpen,
  onOpenChange,
  onClose
}) => {
  const t = useTranslations('Modals.rewardClaimSuccessModal')

  const [count, setCount] = useState(5)

  useInterval(
    () => {
      setCount(count - 1)
    },
    count > 0 ? 1000 : null
  )

  useEffect(() => {
    if (count === 0) {
      onClose && onClose()
    }
  }, [count, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={false}
      size='xl'
      placement='center'
      hideCloseButton
      classNames={{
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col items-center gap-0 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <img
            className='w-[219px] object-cover'
            src='/images/account/claim-success.png'
            alt='claim-success'
          />
          <Text className='text-white text-[24px] font-chakraPetch'>
            {t('title')}
          </Text>
          <Text className='text-white text-[48px] font-bold font-chakraPetch'>
            {t('success')}
          </Text>
          <Text className='text-white text-[24px] font-chakraPetch'>
            {count} {t('second')}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
