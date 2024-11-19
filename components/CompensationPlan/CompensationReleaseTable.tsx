import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { Text } from '@components/Text'
import { formatCurrency } from '@utils/currency'
import dayjs from 'dayjs'

const RowsPerPage = 6

type ReleasedHistoryData = {
  amount: bigint
  timestamp: bigint
}

export const CompensationReleaseTable: FC<{
  contractData?: any
}> = ({ contractData = [] }) => {
  const t = useTranslations('CompensationPlan.tables')

  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [contractData])

  const data = useMemo(() => {
    if (contractData) {
      return (contractData as ReleasedHistoryData[]).map((item, index) => {
        const dateNum = Number(item.timestamp ?? 0)
        return {
          id: index,
          releaseAmount: formatCurrency(Number(item.amount?.toString() ?? 0)),
          date:
            dateNum > 0
              ? dayjs(dateNum * 1000).format('MMM D, YYYY HH:mm:ss')
              : '- -'
        }
      })
    }
    return []
  }, [contractData])

  const pages = Math.ceil(data.length / RowsPerPage)

  const currentItems = useMemo(() => {
    const start = (page - 1) * RowsPerPage
    const end = start + RowsPerPage

    return data.slice(start, end)
  }, [page, data])

  return (
    <Table
      topContent={
        <Text className='text-[14px] md:text-[20px] mx-3 text-co-text-2 font-semibold whitespace-nowrap'>
          {t('releaseHistory')}
        </Text>
      }
      aria-label='release history'
      classNames={{
        wrapper:
          'rounded-2xl border-2 border-[#666] bg-[#151515] backdrop-blur-[6px] p-6',
        th: 'bg-trans parent text-white text-[14px] md:text-[18px] font-semibold border-b border-[#666]',
        td: 'p-2 md:p-4 text-[14px] md:text-[18px] font-medium whitespace-nowrap text-center md:text-left'
      }}
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            variant='light'
            showControls
            disableAnimation
            classNames={{
              cursor: 'bg-transparent',
              item: 'text-base text-white !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
              next: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
              prev: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
            }}
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key='date'>{t('columns.date')}</TableColumn>
        <TableColumn key='releaseAmount'>
          {t('columns.releaseAmount')}
        </TableColumn>
      </TableHeader>

      <TableBody
        items={currentItems}
        emptyContent={
          <div className='h-40 md:h-[350px] flex items-center justify-center'>
            - -
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
