import { FC } from 'react'
import clsx from 'clsx'

export interface AddressItemSkeletonProps {
  className?: string
}

export const AddressItemSkeleton: FC<AddressItemSkeletonProps> = ({
  className
}) => {
  return (
    <div
      className={clsx(
        `animate-pulse flex flex-col w-full h-[128px] border border-gray-78
          rounded-[16px] p-4 gap-y-1`,
        className
      )}
    >
      <div className='w-full h-[30px] bg-co-bg-white bg-opacity-10 rounded-xl mb-3'></div>
      <div className='w-full h-[27px] bg-co-bg-white bg-opacity-10 rounded-xl mb-3'></div>
      <div className='w-full flex flex-row justify-end items-center gap-x-2'>
        <div className='w-[80px] h-[29px] bg-co-bg-white bg-opacity-10 rounded-xl'></div>
        <div className='w-[80px] h-[29px] bg-co-bg-white bg-opacity-10 rounded-xl'></div>
      </div>
    </div>
  )
}
