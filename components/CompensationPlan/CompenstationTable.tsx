import { FC, useMemo, useState } from 'react'
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

interface TableProps {
  title: string
  data?: {
    total: number
    pageSize: number
  }
}
export const CompensationTable: FC<TableProps> = ({ data, title }) => {
  const [page, setPage] = useState(1)
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || 1)),
    [data]
  )
  return (
    <Table
      topContent={
        <Text className='text-[14px] md:text-[20px] mx-3 text-co-text-2 font-semibold whitespace-nowrap'>
          {title}
        </Text>
      }
      aria-label={title}
      classNames={{
        wrapper:
          'rounded-2xl border-2 border-[#666] bg-[#151515] backdrop-blur-[6px] p-6',
        th: 'bg-transparent text-white text-[18px] font-semibold border-b border-[#666]',
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
        <TableColumn>Date</TableColumn>
        <TableColumn>Released Amount</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='whitespace-nowrap'>
            {/* {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')} */}
            date
          </TableCell>
          <TableCell className='whitespace-nowrap'>
            {/* {formatUSDT(Number(order.price) * order.quantity)}
    &nbsp;USDT */}
            amount
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='whitespace-nowrap'>
            {/* {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')} */}
            date
          </TableCell>
          <TableCell className='whitespace-nowrap'>
            {/* {formatUSDT(Number(order.price) * order.quantity)}
    &nbsp;USDT */}
            amount
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
