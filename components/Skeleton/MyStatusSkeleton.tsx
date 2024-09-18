import { FC } from 'react';
import clsx from 'clsx';

export interface MyStatusSkeletonProps {
  className?: string
}

export const MyStatusSkeleton: FC<MyStatusSkeletonProps> = ({ className }) => {
  return (
    <div
      className={
        clsx(
          'flex flex-col gap-9 justify-between items-center w-full animate-pulse',
          className
        )
      }
    >
      <div className='flex gap-3 md:gap-6 w-full flex-col md:flex-row border border-gray-78 rounded-xl md:border-none bg-co-bg-white bg-opacity-10 md:bg-transparent'>
        <div className='flex-1 flex px-4 items-center py-4 md:py-0 justify-center gap-4 flex-col md:h-[146px] md:bg-co-bg-white md:bg-opacity-10 border-none md:border-solid border border-gray-78 rounded-xl'>
          <div className='w-[100px] h-[20px] rounded-full bg-co-bg-white bg-opacity-10'></div>
          <div className='w-full h-[50px] rounded-full bg-co-bg-white bg-opacity-10'></div>
        </div>
        <div className='flex-1 flex px-4 items-center  py-4 md:py-0 justify-center gap-4 flex-col md:h-[146px] md:bg-co-bg-white md:bg-opacity-10 border-none md:border-solid border border-gray-78 rounded-xl'>
          <div className='w-[100px] h-[20px] rounded-full bg-co-bg-white bg-opacity-10'></div>
          <div className='w-full h-[50px] rounded-full bg-co-bg-white bg-opacity-10'></div>
        </div>
      </div>
      <div className='rounded-xl py-4 px-4 md:px-0 md:py-0 w-full gap-y-4 flex-col md:flex-row flex justify-around items-center md:w-full h-[100px] md:h-[100px] bg-co-bg-white bg-opacity-10 border border-gray-78'>
        <div className='w-full md:w-[40%] h-[50px] rounded-full bg-co-bg-white bg-opacity-10'></div>
        <div className='w-full md:w-[40%] h-[50px] rounded-full bg-co-bg-white bg-opacity-10'></div>
      </div>
    </div>
  )
}
