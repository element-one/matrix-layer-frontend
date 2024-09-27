import { FC } from 'react'
import clsx from 'clsx'

export interface SelectItemSkeletonProps {
  className?: string
}

export const SelectItemSkeleton: FC<SelectItemSkeletonProps> = ({
  className
}) => {
  return (
    <div
      className={clsx(
        `animate-pulse w-full md:w-[500px] h-[294px] border border-gray-78 rounded-[32px]
          p-8`,
        className
      )}
    >
      <div className='w-full h-[30px] md:h-[42px] bg-co-bg-white bg-opacity-10 rounded-xl mb-3'></div>
      <div className='flex flex-row justify-between items-center gap-3 md:gap-6'>
        <div className='w-[200px] h-[153px] md:h-[152px] bg-co-bg-white bg-opacity-10 rounded-xl'></div>

        <div
          className='rounded-xl w-[100px] md:w-[172px] h-[100px] md:h-[172px] bg-co-bg-white
            bg-opacity-10'
        ></div>
      </div>
    </div>
  )
}
