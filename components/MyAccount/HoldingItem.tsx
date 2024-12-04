import { FC } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { Text } from '@components/Text'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

interface HoldingItemProps {
  group: number
  item: {
    title: string
    count: number | string
    icon: string
    key: string
  }
  OnClickItem: () => void
}

const HoldingItem: FC<HoldingItemProps> = ({ item, group, OnClickItem }) => {
  const t = useTranslations('MyAccount')

  return (
    <div
      className={`px-8 py-6 border-2 rounded-[20px] flex flex-row justify-between items-center
        ${gradientBorderClass}`}
    >
      <div
        className={clsx(
          'flex md:flex-row items-center justify-between w-full gap-x-4 gap-y-2',
          group === 0 ? 'flex-row' : 'flex-col'
        )}
      >
        <img
          src={item.icon}
          alt={item.title}
          className='h-[77px] md:h-[86px]'
        />
        <div
          className={clsx(
            'flex md:flex-col items-center md:items-end',
            item.key === 'availableRewards' ? 'flex-col' : 'flex-col-reverse'
          )}
        >
          <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
            {t(item.key as any)}
          </Text>
          <Text
            className={clsx(
              'font-semibold mt-1 grow !leading-[32px] md:!leading-[62px]',
              String(item.count).length > 5
                ? 'text-[16px] md:text-[20px]'
                : 'text-[24px] md:text-[48px]'
            )}
          >
            {item.count}
          </Text>
          {item.key === 'availableRewards' && (
            <Button
              onClick={OnClickItem}
              className='text-[12px] py-1 md:py-2 px-4'
            >
              {t('rewardDetails')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default HoldingItem
