import { FC } from 'react'
import { Modal, ModalBody, ModalContent, ModalProps } from '@nextui-org/react'

import { Text } from '@components/Text'

export interface ClaimRewardsSuccessModalProps
  extends Omit<ModalProps, 'children'> {}

export const RewardsClaimSuccessModal: FC<ClaimRewardsSuccessModalProps> = ({
  isOpen,
  onOpenChange,
  onClose
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={false}
      size='xl'
      placement='center'
      scrollBehavior={'outside'}
      classNames={{
        base: 'md:mt-[500px]',
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
            Claim Reward
          </Text>
          <Text className='text-white text-[48px] font-bold font-chakraPetch'>
            Success
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}