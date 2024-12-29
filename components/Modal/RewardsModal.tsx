import { FC, useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import clsx from 'clsx'
import { Address } from 'viem'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import PAYMENT_ABI from '@abis/Payment.json'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetUserReferralRewards } from '@services/api'
import { useStore } from '@store/store'
import { formatUSDT } from '@utils/currency'
import { formatClaimWalletAddress } from '@utils/formatWalletAddress'
import dayjs from 'dayjs'

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

  // table hooks
  const PAGE_SIZE = 6
  const { address } = useAccount()
  const [page, setPage] = useState(1)
  const handleCloseSuccessModal = async () => {
    await onClaimSuccess()
    onClaimClose()
  }

  const { data, isPending: getHistoryPending } = useGetUserReferralRewards({
    address: address as Address,
    page,
    pageSize: PAGE_SIZE
  })
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || PAGE_SIZE)),
    [data]
  )

  return (
    <Modal
      isOpen={isModalShown(ModalType.REWARDS_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size={isMobile ? 'full' : 'xl'}
      placement='center'
      classNames={{
        base: 'w-[1000px] max-w-[100vw] md:!max-w-[80vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-0 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-co-text-primary text-[32px] md:text-[48px] font-bold'>
            {t('title')}
          </Text>
          <Text className='text-co-text-primary text-[12px] md:text-[22px]'>
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
                  className='shrink-0 rounded-[35px] bg-transparent border-[#666] text-co-text-primary
                    text-[12px] md:text-[14px] py-2 md:py-3 px-4 md:px-8 md:w-[154px]'
                  variant='bordered'
                  onClick={handleShowHistoryModal}
                >
                  {t('claimHistory')}
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
          <Divider className='bg-gray-a5/20 mt-8 mb-4' />
          <div className='flex flex-col gap-y-8 h-fit transition-height'>
            <Text className='text-co-text-primary text-[16px] md:text-[24px] font-bold'>
              {t('invitationRewardsHistory')}
            </Text>
            <Table
              aria-label='Reward History'
              classNames={{
                wrapper:
                  'rounded-[12px] border-2 border-[#666] bg-black-15 backdrop-blur-[6px] p-0',
                th: 'table-th-bg text-co-text-primary text-[20px] font-bold text-co-text-primary text-center py-3 !rounded-none font-chakraPetch',
                td: 'p-4 text-[18px] font-medium text-center whitespace-nowrap',
                tr: 'odd:bg-black-20 even:bg-black-15 hover:bg-black-15 font-chakraPetch'
              }}
            >
              <TableHeader>
                <TableColumn>{t('address')}</TableColumn>
                <TableColumn>{t('txID')}</TableColumn>
                <TableColumn>{t('commissionAmount')}</TableColumn>
                <TableColumn>{t('createdAt')}</TableColumn>
              </TableHeader>
              <TableBody
                isLoading={getHistoryPending}
                loadingContent={
                  <div className='w-full flex items-center justify-center'>
                    <Spinner color='secondary' />
                  </div>
                }
              >
                {(data?.data ?? []).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {formatClaimWalletAddress(item.address)}
                    </TableCell>
                    <TableCell>{formatClaimWalletAddress(item.txid)}</TableCell>
                    <TableCell className='font-bold'>
                      {formatUSDT(item.rewardAmount)}
                    </TableCell>
                    <TableCell className='text-gray-150'>
                      {dayjs(item.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='flex w-full justify-center'>
              <Pagination
                variant='light'
                showControls
                page={page}
                total={totalPage}
                disableAnimation
                classNames={{
                  cursor: 'bg-transparent',
                  item: 'text-base text-co-text-primary !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
                  next: 'text-co-text-primary !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
                  prev: 'text-co-text-primary !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
                }}
                onChange={setPage}
              />
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
