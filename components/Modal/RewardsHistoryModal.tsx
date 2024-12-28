import { FC, useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslations } from 'next-intl'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalProps,
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
import { useGetRewardsHistory } from '@services/api'
import { formatUSDT } from '@utils/currency'
import { formatClaimWalletAddress } from '@utils/formatWalletAddress'
import dayjs from 'dayjs'

export interface RewardsHistoryModalProps extends Omit<ModalProps, 'children'> {
  onSubmit?: () => void
  title?: string
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

export const RewardsHistoryModal: FC<RewardsHistoryModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  title
}) => {
  const t = useTranslations('Modals.rewardHistoryModal')

  const { address } = useAccount()
  const [page, setPage] = useState(1)

  const { data, refetch, isLoading, isRefetching } = useGetRewardsHistory(
    address as Address,
    page,
    PAGE_SIZE,
    {
      enabled: !!address
    }
  )

  useEffect(() => {
    if (isOpen) {
      setPage(1)
      refetch()
    }
  }, [isOpen, setPage, refetch])

  const history = useMemo(() => data?.data || [], [data])
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || PAGE_SIZE)),
    [data]
  )

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
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
          <Text className='text-co-text-primary text-[24px] md:text-[32px] font-bold'>
            {title ?? t('title')}
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
                    {formatUSDT(item.claimedAmount)}
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
                item: 'text-base text-co-text-primary !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
                next: 'text-co-text-primary !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
                prev: 'text-co-text-primary !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
              }}
              onChange={setPage}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
