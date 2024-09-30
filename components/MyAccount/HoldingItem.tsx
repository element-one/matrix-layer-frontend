import { FC } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

interface HoldingItemProps {
  item: {
    title: string
    count: number
    icon: string
    key: string
  }
}

const HoldingItem: FC<HoldingItemProps> = ({ item }) => {
  return (
    <div
      className={`px-8 py-6 border-2 rounded-[20px] flex flex-row justify-between items-center
        ${gradientBorderClass}`}
    >
      <div className='flex flex-col md:flex-row items-center md:justify-between w-full gap-x-4 gap-y-2'>
        <img
          src={item.icon}
          alt={item.title}
          className='h-[77px] md:h-[86px]'
        />
        <div className='flex flex-col-reverse md:flex-col items-center md:items-end'>
          <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
            {item.title}
          </Text>
          <Text
            className={clsx(
              'font-semibold mt-1 grow !leading-[32px] md:!leading-[72px]',
              String(item.count).length > 5
                ? 'text-[16px] md:text-[20px]'
                : 'text-[24px] md:text-[48px]'
            )}
          >
            {item.count}
          </Text>
        </div>
      </div>
    </div>
  )
}
export default HoldingItem
