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
    <div className='border-[#666] rounded-[32px] mt-4'>
      <div className='flex flex-col gap-4'>
        <Text className='text-[24px] font-semibold'>{title}</Text>
        <Table aria-label='Example table with dynamic content'>
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.title}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
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
