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
import clsx from 'clsx'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetUserRewardDetails } from '@services/api'
import { formatCurrency, formatForMatrix } from '@utils/currency'
import dayjs from 'dayjs'

export interface RewardsPoolBHistoryModalProps {
  onClose?: () => void
  poolType: 'pool_a' | 'pool_b1' | 'pool_b2' | 'pool_phone' | 'pool_c'
}

const PAGE_SIZE = 6

export const RewardsPoolBHistoryModal: FC<RewardsPoolBHistoryModalProps> = ({
  onClose,
  poolType
}) => {
  const { address } = useAccount()
  const [page, setPage] = useState(1)
  const { hideModal, isModalShown } = useModal()
  const t = useTranslations('Modals.rewardsPoolBHistoryModal')

  const { data, isLoading, isRefetching } = useGetUserRewardDetails(
    {
      address: address as Address,
      page,
      pageSize: PAGE_SIZE,
      poolType
    },
    {
      enabled: !!address
    }
  )

  const title = {
    pool_a: 'Basic Pool',
    pool_b1: 'NFT',
    pool_b2: 'MLP',
    pool_phone: 'MLPhone',
    pool_c: 'Promotion Pool'
  }

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
      isOpen={isModalShown(ModalType.REWARDS_POOL_B_HISTORY_MODAL)}
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
          <Text className='text-co-text-primary text-[24px] md:text-[32px] font-bold'>
            {title[poolType]} {t('title')}
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
              <TableColumn>{t('date')}</TableColumn>
              <TableColumn
                className={poolType === 'pool_phone' ? 'hidden' : ''}
              >
                {t('acceleratedMLP')}
              </TableColumn>
              <TableColumn>{t('rewards')}</TableColumn>
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
                  <TableCell
                    className={clsx(
                      'font-bold',
                      poolType === 'pool_phone' && 'hidden'
                    )}
                  >
                    {poolType === 'pool_a'
                      ? formatForMatrix(item.stakingAmount)
                      : formatCurrency(item.stakingAmount)}
                  </TableCell>
                  <TableCell className='flex flex-row justify-center'>
                    {formatCurrency(item.amount)}
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
