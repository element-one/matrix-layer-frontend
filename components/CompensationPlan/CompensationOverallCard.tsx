import { FC } from 'react'
import { Tooltip } from '@nextui-org/react'

import { QuestionColorIcon } from '@components/Icon/QuestionColorIcon'
import { Text } from '@components/Text'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

interface CardProps {
  title: string
  tipInfo?: string
  info?: string
}
export const CompensationOverallCard: FC<CardProps> = ({
  title,
  info,
  tipInfo
}) => {
  return (
    <div
      className={`px-8 py-6 border-2 rounded-2xl flex flex-col items-center justify-center gap-y-2
        ${gradientBorderClass}`}
    >
      <div className='flex flex-row items-center gap-x-1'>
        <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
          {title}
        </Text>
        {tipInfo && (
          <Tooltip
            placement='right'
            className='bg-co-bg-black'
            content={
              <span className='max-w-[260px] text-[14px] text-center bg-co-bg-black text-co-text-3 px-1 py-2'>
                {tipInfo}
              </span>
            }
          >
            <span>
              <QuestionColorIcon />
            </span>
          </Tooltip>
        )}
      </div>
      <Text className='font-semibold text-[24px] md:text-[40px]'>
        {info || '- -'}
      </Text>
    </div>
  )
}
