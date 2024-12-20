import { FC, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslations } from 'next-intl'
import {
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
  TableRow
} from '@nextui-org/react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetMLPRewardsHistory } from '@services/api'
import { formatUSDT } from '@utils/currency'
import { formatClaimWalletAddress } from '@utils/formatWalletAddress'
import dayjs from 'dayjs'

export interface RewardsMLPHistoryModalProps {
  onClose?: () => void
}

const statusClass = (status: string) => {
  switch (status) {
    case 'claimed':
      return 'border-[#34D399] bg-[rgba(4,120,87,0.20)]'
    case 'onprogress':
      return 'border-[#FACC15] bg-[rgba(161,98,7,0.20)]'
    default:
      return ''
  }
}

const statusCommonClass =
  'w-[103px] h-[34px] rounded-[24px] flex items-center justify-center font-semibold capitalize text-sm border'

const PAGE_SIZE = 6

export const RewardsMLPHistoryModal: FC<RewardsMLPHistoryModalProps> = ({
  onClose
}) => {
  const t = useTranslations('Modals.rewardsMLPHistoryModal')

  const { address } = useAccount()
  const [page, setPage] = useState(1)
  const { hideModal, isModalShown } = useModal()

  const { data, isLoading, isRefetching } = useGetMLPRewardsHistory(
    {
      address: address as Address,
      page,
      pageSize: PAGE_SIZE
    },
    {
      enabled: !!address
    }
  )

  const history = useMemo(() => data?.data || [], [data])
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || PAGE_SIZE)),
    [data]
  )

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.REWARDS_MLP_HISTORY_MODAL)}
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
      <ModalContent className='bg-black-15 md:border md:border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-6 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-white text-[24px] md:text-[32px] font-bold'>
            {t('title')}
          </Text>
          <Table
            aria-label='Reward History'
            classNames={{
              wrapper:
                'rounded-[12px] border-2 border-[#666] bg-black-15 backdrop-blur-[6px] p-0',
              th: 'bg-black text-white text-[20px] font-bold text-white text-center py-3 !rounded-none font-chakraPetch',
              td: 'p-4 text-[18px] font-medium text-center whitespace-nowrap',
              tr: 'odd:bg-black-20 even:bg-black-15 hover:bg-black-15 font-chakraPetch'
            }}
          >
            <TableHeader>
              <TableColumn>{t('time')}</TableColumn>
              <TableColumn>{t('address')}</TableColumn>
              <TableColumn>{t('reward')}</TableColumn>
              <TableColumn>{t('status')}</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading || isRefetching}
              loadingContent={
                <div className='w-full flex items-center justify-center'>
                  <Spinner color='secondary' />
                </div>
              }
            >
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='text-gray-150'>
                    {dayjs(item.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {formatClaimWalletAddress(item.address)}
                  </TableCell>
                  <TableCell className='font-bold'>
                    {formatUSDT(item.tokenAmount)}
                  </TableCell>
                  <TableCell className='flex flex-row justify-center'>
                    <span
                      className={`${statusCommonClass} ${statusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
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
                item: 'text-base text-white !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
                next: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
                prev: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
              }}
              onChange={setPage}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
