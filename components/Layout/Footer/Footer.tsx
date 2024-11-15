import { FC } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export interface FooterProps {
  className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
  const t = useTranslations('Footer')
  return (
    <div
      className={clsx(
        `w-full lg:px-14 flex flex-col lg:flex-row gap-2 items-center justify-between
          text-co-text-1 pb-[58px]`,
        className
      )}
    >
      <div className='flex items-center gap-8 text-[10px] md:text-sm'>
        <a
          href='https://x.com/matrix_mlp?s=21&t=wSC_Z_s-s2P9fwoumryd9A'
          target='_blank'
          className='flex items-center justify-center gap-2'
        >
          <img src='/images/svg/x.svg' alt='x' width={18} />
          <span>MatrixLayerProtocol_MLP</span>
        </a>
        <a
          href='https://t.me/MLP_Community'
          target='_blank'
          className='flex items-center justify-center gap-2'
        >
          <img src='/images/svg/telegram.svg' alt='x' width={18} />
          <span>MatrixLayerCommunity</span>
        </a>
      </div>
      <div className='text-[10px] md:text-sm'>{t('copyright')}</div>
    </div>
  )
}

export default Footer
