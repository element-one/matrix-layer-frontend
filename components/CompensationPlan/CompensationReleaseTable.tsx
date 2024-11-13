import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { Text } from '@components/Text'

const data = {
  total: 0,
  pageSize: 6
}

export const CompensationReleaseTable = () => {
  const t = useTranslations('CompensationPlan.tables')
  const [page, setPage] = useState(1)
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || 1)),
    [data]
  )
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
        th: 'bg-trans parent text-white text-[18px] font-semibold border-b border-[#666]',
        td: 'p-4 text-[18px] font-medium'
      }}
      bottomContent={
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
      }
    >
      <TableHeader>
        <TableColumn>{t('columns.date')}</TableColumn>
        <TableColumn>{t('columns.releaseAmount')}</TableColumn>
      </TableHeader>

      <TableBody emptyContent={'- -'}>
        {[].map((_, index) => (
          <TableRow key={index}>
            <TableCell className='whitespace-nowrap'>
              {/* {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')} */}
              123
            </TableCell>
            <TableCell>123</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
