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
        <ModalBody className='flex flex-col gap-6 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-white text-[32px] font-bold'>Success</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
