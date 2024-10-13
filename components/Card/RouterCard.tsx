import { FC } from 'react'
import clsx from 'clsx'

export interface RouterCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export const RouterCard: FC<RouterCardProps> = ({
  icon,
  title,
  description,
  className
}) => {
  return (
    <div
      className={clsx(
        'flex relative flex-col items-start justify-center w-full',
        'md:w-[590px] pl-8 md:pl-[92px] h-fit py-2 md:py-6',
        `card-border-gradient before:w-1 before:h-full before:absolute before:left-[-2px]
          before:top-0 before:bg-co-bg-1`,
        className
      )}
    >
      <img
        src={icon}
        alt='high performance'
        className='absolute py-2 h-[64px] md:h-[120px] md:w-[120px] left-[-24px] md:left-[-60px]'
      />
      <div
        className='text-sm md:text-2xl font-semibold bg-gradient-text-4 bg-clip-text
          text-transparent'
      >
        {title}
      </div>
      <div className='text-xs text-co-text-3 md:text-base leading-5 md:leading-6 mt-1 md:mt-3 pr-4'>
        {description}
      </div>
    </div>
  )
}
