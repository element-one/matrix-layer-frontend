import { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure
} from '@nextui-org/react'
import clsx from 'clsx'
import { Address } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import PAYMENT_ABI from '@abis/Payment.json'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useStore } from '@store/store'
import { formatUSDT } from '@utils/currency'

import { RewardsClaimSuccessModal } from './RewardsClaimSuccessModal'
import { RewardsHistoryModal } from './RewardsHistoryModal'

export interface RewardsModalProps {
  onClose?: () => void
  onClaimSuccess: () => void
}

const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS

export const RewardsModal: FC<RewardsModalProps> = ({
  onClose,
  onClaimSuccess
}) => {
  const t = useTranslations('Modals.rewardModal')

  const { holdings } = useStore((state) => ({
    holdings: state.holdings
  }))

  const { totalRewards, availableRewards } = useMemo(
    () => ({
      totalRewards: holdings.totalRewards ? Number(holdings.totalRewards) : 0,
      availableRewards: holdings.availableRewards
        ? Number(holdings.availableRewards)
        : 0
    }),
    [holdings]
  )

  const { isModalShown, hideModal } = useModal()
  const [successClaimHasShown, setSuccessClaimHasShown] = useState(false)

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

  const {
    data: claimHash,
    writeContract: claimContract,
    isPending: isClaimingContract
  } = useWriteContract()

  const { data: txData, isLoading: isWaitingClaimReceipt } =
    useWaitForTransactionReceipt({
      hash: claimHash,
      query: {
        enabled: claimHash !== undefined,
        initialData: undefined
      }
    })

  const isLoading = useMemo(
    () => isClaimingContract || isWaitingClaimReceipt,
    [isClaimingContract, isWaitingClaimReceipt]
  )

  useEffect(() => {
    if (txData && !successClaimHasShown) {
      onClaimOpen()
      setSuccessClaimHasShown(true)
    }
  }, [txData, onClaimOpen, successClaimHasShown, onClaimSuccess])

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  const handleShowHistoryModal = () => {
    onHistoryOpen()
  }

  const handleShowClaimModal = () => {
    if (!availableRewards) return

    setSuccessClaimHasShown(false)
    claimContract(
      {
        abi: PAYMENT_ABI,
        functionName: 'claimReferralReward',
        address: PAYMENT_ADDRESS as Address
      },
      {
        onSuccess() {
          console.log('claim success')
        },
        onError(err) {
          console.log(err.message)
          toast.error('claim failed: Please try again')
        }
      }
    )
  }

  const handleCloseSuccessModal = async () => {
    await onClaimSuccess()
    onClaimClose()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.REWARDS_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size='xl'
      placement='center'
      classNames={{
        base: 'w-[1200px] !max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-0 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-white text-[32px] md:text-[48px] font-bold'>
            {t('title')}
          </Text>
          <Text className='text-white text-[12px] md:text-[22px]'>
            {t('info')}
          </Text>
          <div
            className='grid grid-cols-1 lg:grid-cols-2 justify-between items-center gap-x-8 gap-y-4
              mt-8'
          >
            <div
              className={`p-4 md:p-7 border-2 rounded-[20px] flex flex-col border-gradient gap-y-3`}
            >
              <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
                {t('totalReward')}
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
                      'font-semibold grow !leading-[24px] md:!leading-[40px]',
                      'text-[20px] md:text-[48px]'
                    )}
                  >
                    {formatUSDT(totalRewards)}
                  </Text>
                </div>
                <Button
                  className='shrink-0 rounded-[35px] bg-transparent border-[#666] text-white text-[12px]
                    md:text-[14px] py-2 md:py-3 px-4 md:px-8 md:w-[154px]'
                  variant='bordered'
                  onClick={handleShowHistoryModal}
                >
                  {t('history')}
                </Button>
              </div>
            </div>
            <div
              className={`p-4 md:p-7 border-2 rounded-[20px] flex flex-col gap-y-2 border-gradient`}
            >
              <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
                {t('claimableReward')}
              </Text>
              <div className='flex flex-row justify-between items-center'>
                <Text
                  className={clsx(
                    'font-semibold grow !leading-[24px] md:!leading-[40px]',
                    'text-[20px] md:text-[48px]'
                  )}
                >
                  {formatUSDT(availableRewards)}
                </Text>
                <Button
                  isDisabled={!availableRewards}
                  isLoading={isLoading}
                  className='text-[12px] md:text-[14px] py-2 md:py-3 px-4 md:px-8 rounded-[35px] md:w-[154px]'
                  onClick={handleShowClaimModal}
                >
                  {t('claim')}
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
      {isOpenHistory && (
        <RewardsHistoryModal
          isOpen={isOpenHistory}
          onOpenChange={onOpenHistoryChange}
          onClose={onHistoryClose}
        />
      )}
      {isOpenClaim && (
        <RewardsClaimSuccessModal
          isOpen={isOpenClaim}
          onOpenChange={onOpenClaimChange}
          onClose={handleCloseSuccessModal}
        />
      )}
    </Modal>
  )
}
