import { FC, useMemo, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalProps,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { Text } from '@components/Text'
import { useGetRewardsHistory } from '@services/api'

export interface RewardsHistoryModalProps extends Omit<ModalProps, 'children'> {
  onSubmit?: () => void
}

const Mock_data = [
  {
    time: '2024.9.17',
    address: '0x12454545****151545',
    reward: 500,
    status: 'onprogress'
  },
  {
    time: '2024.9.17',
    address: '0x12454545****151545',
    reward: 500,
    status: 'claimed'
  }
]

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

export const RewardsHistoryModal: FC<RewardsHistoryModalProps> = ({
  isOpen,
  onOpenChange,
  onClose
}) => {
  const [page, setPage] = useState(1)

  const { data } = useGetRewardsHistory(page, 6)

  const history = useMemo(() => data?.data || [], [data])
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || 1)),
    [data]
  )

  console.log(history)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={false}
      size='xl'
      placement='center'
      scrollBehavior={'outside'}
      classNames={{
        base: 'w-[1000px] !max-w-[80vw] md:mt-[500px]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody className='flex flex-col gap-6 px-2 pt-10 pb-5 md:py-10 md:px-8 text-co-text-1'>
          <Text className='text-white text-[24px] md:text-[32px] font-bold'>
            History
          </Text>
          <Table
            aria-label='Reward History'
            classNames={{
              wrapper:
                'rounded-[12px] border-2 border-[#666] bg-black-15 backdrop-blur-[6px] p-0',
              th: 'bg-gradient-rewards-history text-white text-[20px] font-bold text-black-15 text-center py-3 !rounded-none font-chakraPetch',
              td: 'p-4 text-[18px] font-medium text-center whitespace-nowrap',
              tr: 'odd:bg-black-20 even:bg-black-15 hover:bg-black-15 font-chakraPetch'
            }}
          >
            <TableHeader>
              <TableColumn>Time</TableColumn>
              <TableColumn>Address</TableColumn>
              <TableColumn>Reward</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {Mock_data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='text-gray-150'>{item.time}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell className='font-bold'>{item.reward}</TableCell>
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
