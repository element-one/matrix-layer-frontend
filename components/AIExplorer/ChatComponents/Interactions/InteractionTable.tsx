import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { Text } from '@components/Text'
import type { ChatInteractionTable } from '@type/graphqlApiSchema'

interface TableProps {
  data: ChatInteractionTable
}

export const ChatTable: React.FC<TableProps> = ({ data }) => {
  const { content } = data
  const { title, columns, rows } = content

  return (
    <div className='border-[#666] rounded-[32px] mt-4 w-full'>
      <div className='flex flex-col gap-4 w-full'>
        <Text className='text-[24px] font-semibold'>{title}</Text>
        <Table
          aria-label='dynamic content'
          className='max-w-full'
          classNames={{
            wrapper: 'border-2 border-[#666] bg-[#151515]',
            th: 'bg-transparent !text-co-text-primary',
            td: '!text-co-text-primary'
          }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.title}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row, row_i) => (
              <TableRow key={`${row.id}-${row_i}`}>
                {row.cells.map((cell, i) => (
                  <TableCell
                    key={`${row.id}-${i}`}
                    className='text-black'
                    style={{
                      textAlign: 'left',
                      ...cell.metadata?.style
                    }}
                  >
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
