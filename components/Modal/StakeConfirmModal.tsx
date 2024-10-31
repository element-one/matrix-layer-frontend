import { FC } from 'react'
import { Modal, ModalBody, ModalContent, ModalProps } from '@nextui-org/react'

import { Button } from '@components/Button'
import { ModalCloseIcon } from '@components/Icon/ModalCloseIcon'
import { Text } from '@components/Text'

export enum StakeTypeEnum {
  STAKE = 'stake',
  UNSTAKE = 'unstake'
}

export interface StakeConfirmModalProps extends Omit<ModalProps, 'children'> {
  type: StakeTypeEnum | null
  onConfirm?: () => void
  loading?: boolean
}

export const StakeConfirmModal: FC<StakeConfirmModalProps> = ({
  type,
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='xl'
      placement='center'
      hideCloseButton
      isDismissable={false}
      classNames={{
        base: 'w-[600px] !max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border-referral-gradient'>
        <ModalBody className='flex flex-col gap-y-[15px] md:gap-y-[37px] p-6 md:p-10 items-center'>
          <div className='w-full flex justify-between items-center'>
            <Text className='text-[24px] font-bold text-co-gray-6'>
              {type === 'stake' ? 'STAKE NFT' : 'UNSTAKE NFT'}
            </Text>
            <ModalCloseIcon className='cursor-pointer' onClick={onClose} />
          </div>
          <div className='flex gap-x-[25px] items-center'>
            <img
              className='w-[128px] object-cover'
              src='/images/stake/img-matrix@4.png'
              alt='matrix'
            />
            <div className='flex flex-col gap-y-3'>
              <Text className='text-[18px] font-bold text-co-gray-6'>
                After stake the NFT you will be able to obtain the reward MLP
                Token.
              </Text>
              <Text className='text-[18px] font-bold bg-clip-text text-transparent bg-gradient-text-1'>
                Are you sure you want to stake?
              </Text>
            </div>
          </div>
          <div className='flex gap-x-[34px] w-full'>
            <Button
              className='grow p-[10px] text-[16px] font-bold rounded-[35px] bg-white'
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button
              className='grow p-[10px] text-[16px] font-bold rounded-[35px]'
              isLoading={loading}
              onClick={onConfirm}
            >
              {type === 'stake' ? 'STAKE' : 'UNSTAKE'}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
