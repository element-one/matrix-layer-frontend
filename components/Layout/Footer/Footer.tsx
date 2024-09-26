import { FC } from 'react'
import clsx from 'clsx'

export interface FooterProps {
  className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        `w-full md:px-14 flex flex-col md:flex-row gap-2 items-center justify-between
          text-co-text-1 pb-[58px]`,
        className
      )}
    >
      <div className='flex items-center gap-8 text-[10px] md:text-sm'>
        <a
          href='/'
          target='_blank'
          className='flex items-center justify-center gap-2'
        >
          <img src='/images/svg/x.svg' alt='x' width={18} />
          <span>MatrixLayerProtocol_MLP</span>
        </a>
        <a
          href='/'
          target='_blank'
          className='flex items-center justify-center gap-2'
        >
          <img src='/images/svg/telegram.svg' alt='x' width={18} />
          <span>MatrixLayerCommunity</span>
        </a>
      </div>
      <div className='text-[10px] md:text-sm'>
        Copyright © Matrix Layer Protocol 2024 – All rights reserved.
      </div>
    </div>
  )
}

export default Footer
