import { FC } from 'react';
import clsx from 'clsx';

export interface SelectItemSkeletonProps {
  className?: string
}

export const SelectItemSkeleton: FC<SelectItemSkeletonProps> = ({ className }) => {
  return (
    <div
      className={
        clsx(
          'flex justify-between items-center animate-pulse w-full md:w-[970px] border border-gray-78 rounded-[32px] p-6',
          className
        )
      }
    >
      <div className='flex flex-col gap-3 md:gap-6'>
        <div className='w-[80px] md:w-[200px] h-[30px] md:h-[52px] bg-co-bg-white bg-opacity-10 rounded-xl'></div>
        <div className='w-[120px] md:w-[500px] h-[30px] md:h-[52px] bg-co-bg-white bg-opacity-10 rounded-xl'></div>
      </div>
      <div className='rounded-xl w-[100px] md:w-[180px] h-[100px] md:h-[180px] bg-co-bg-white bg-opacity-10'></div>
    </div>
  )
}
