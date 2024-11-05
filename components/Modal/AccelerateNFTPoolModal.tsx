import { FC, useState } from 'react'
import { Modal, ModalBody, ModalContent, Tooltip } from '@nextui-org/react'

import { Button } from '@components/Button'
import { QuestionColorIcon } from '@components/Icon/QuestionColorIcon'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'

export interface AccelerateNFTPoolModalProps {
  onClose?: () => void
  onConfirm?: () => void
}

export const AccelerateNFTPoolModal: FC<AccelerateNFTPoolModalProps> = ({
  onClose,
  onConfirm
}) => {
  const { isModalShown, hideModal } = useModal()

  const [amount, setAmount] = useState('')

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.ACCELERATE_NFT_POOL_MODAL)}
      onClose={handleClose}
      size='xl'
      placement='center'
      hideCloseButton
      classNames={{
        base: 'w-[1080px] !max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='border-accelerate-modal-gradient'>
        <ModalBody
          className='flex flex-col gap-y-[12px] md:gap-y-[30px] p-6 md:px-12 md:py-10 text-co-text-1
            items-center'
        >
          <div className='flex gap-x-5 items-center'>
            <Text className='text-[14px] md:text-[32px] font-bold'>
              <span>Accelerate NFT Boosted Pool</span>
            </Text>
            <Tooltip
              placement='bottom'
              className='bg-co-bg-black'
              content={
                <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                  MLPhone NFT come with 10 days of mining rights in the basic
                  pool. Once staking begins, it cannot be ended prematurely;
                  canceling the stake early will render the NFT invalid.
                </span>
              }
            >
              <span>
                <QuestionColorIcon />
              </span>
            </Tooltip>
          </div>
          <div className='w-full'>
            <div className='p-4 py-2 md:px-8 md:py-4 bg-black rounded-[16px] flex justify-between gap-x-10'>
              <Text className='text-[10px] md:text-[24px] text-co-gray-7 font-bold'>
                <span className='hidden md:inline-block'>INPUT </span>AMOUNT :
              </Text>
              <input
                className='grow bg-transparent text-right text-[10px] md:text-[24px] text-white font-bold
                  placeholder:text-co-gray-8'
                placeholder='$MLP AMOUNT'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              />
            </div>
            <Text className='mt-[10px] text-right text-[10px] md:text-[18px] text-co-gray-7 font-bold'>
              Best Acceleration Rate : 998 MLP
            </Text>
          </div>
          <Button
            className='px-3 py-2 md:p-[10px] w-[130px] md:w-[320px] rounded-[32px] text-[12px]
              md:text-[16px] font-bold'
            onClick={onConfirm}
          >
            CONFIRM
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
