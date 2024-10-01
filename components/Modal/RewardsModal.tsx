import { FC } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure
} from '@nextui-org/react'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'

import { RewardsClaimSuccessModal } from './RewardsClaimSuccessModal'
import { RewardsHistoryModal } from './RewardsHistoryModal'

export interface RewardsModalProps {
  onClose: () => void
  onSubmit?: () => void
}

export const RewardsModal: FC<RewardsModalProps> = ({ onClose }) => {
  const { isModalShown, hideModal } = useModal()
  const {
    isOpen: isOpenHistory,
    onOpen: onHistoryOpen,
    onOpenChange: onOpenHistoryChange,
    onClose: onHistoryClose
  } = useDisclosure()

  const {
    isOpen: isOpenClaim,
    onOpen: onClaimOpen,
    onOpenChange: onOpenClaimChange,
    onClose: onClaimClose
  } = useDisclosure()

  const handleClose = () => {
    onClose()
    hideModal()
  }

  const handleShowHistoryModal = () => {
    onHistoryOpen()
  }

  const handleShowClaimModal = () => {
    onClaimOpen()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.REWARDS_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size='xl'
      placement='center'
      scrollBehavior={'outside'}
      classNames={{
        base: 'w-[1000px] !max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-0 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-white text-[32px] font-bold'>
            Reward Details
          </Text>
          <Text className='text-white text-[14px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <div className='grid grid-cols-2 justify-between items-center gap-x-8 mt-8'>
            <div
              className={`p-5 border-2 rounded-[20px] flex flex-col border-gradient gap-y-2`}
            >
              <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
                TOTAL REWARD
              </Text>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-x-3'>
                  <img
                    src={'/images/account/rewards-icon.png'}
                    alt={'rewards'}
                    className='h-[40px]'
                  />
                  <Text
                    className={clsx(
                      'font-semibold mt-1 grow !leading-[24px] md:!leading-[40px]',
                      'text-[24px] md:text-[40px]'
                    )}
                  >
                    3200
                  </Text>
                </div>
                <Button
                  className='shrink-0 h-10 rounded-[35px] min-w-fit bg-transparent border-[#666] text-white
                    text-base font-semibold text-[14px] py-2 px-8'
                  variant='bordered'
                  onClick={handleShowHistoryModal}
                >
                  HISTORY
                </Button>
              </div>
            </div>
            <div
              className={`p-5 border-2 rounded-[20px] flex flex-col gap-y-2 border-gradient`}
            >
              <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
                TOTAL REWARD
              </Text>
              <div className='flex flex-row justify-between items-center'>
                <Text
                  className={clsx(
                    'font-semibold mt-1 grow !leading-[24px] md:!leading-[40px]',
                    'text-[24px] md:text-[40px]'
                  )}
                >
                  3200
                </Text>
                <Button
                  className='text-[14px] py-2 px-8 rounded-[35px]'
                  onClick={handleShowClaimModal}
                >
                  CLAIM
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
      <RewardsHistoryModal
        isOpen={isOpenHistory}
        onOpenChange={onOpenHistoryChange}
        onClose={onHistoryClose}
      />
      <RewardsClaimSuccessModal
        isOpen={isOpenClaim}
        onOpenChange={onOpenClaimChange}
        onClose={onClaimClose}
      />
    </Modal>
  )
}
