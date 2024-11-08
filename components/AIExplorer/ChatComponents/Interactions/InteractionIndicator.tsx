import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import clsx from 'clsx'

import { ArrowDownIcon, ArrowUpIcon } from '@components/Icon/ChatArrow'
import { Text } from '@components/Text'
import type { ChatInteractionIndicator } from '@type/graphqlApiSchema'

interface IndicatorProps {
  data: ChatInteractionIndicator
}

export const Indicator: React.FC<IndicatorProps> = ({ data }) => {
  const { content } = data
  const { name, value, signal, metadata } = content

  return (
    <Card>
      <CardHeader className='flex justify-between px-4'>
        <Text className='text-[24px] font-semibold text-black'>{name}</Text>
        {signal && (
          <div className='flex gap-1 items-center'>
            {signal === 'bullish' ? (
              <ArrowUpIcon style={{ color: '#40c057' }} />
            ) : (
              <ArrowDownIcon style={{ color: '#fa5252' }} />
            )}
            <Text
              className={clsx(
                'text-[14px]',
                signal === 'bullish' ? 'text-green-500' : 'text-red-500'
              )}
            >
              {signal.charAt(0).toUpperCase() + signal.slice(1)}
            </Text>
          </div>
        )}
      </CardHeader>
      <CardBody className='px-4'>
        <div
          className='bg-[#b3b5b8] rounded-[16px] p-4 flex flex-col justify-center items-center
            gap-y-1'
        >
          <Text className='text-center text-[14px] font-semibold text-black'>
            Current Value
          </Text>
          <Text className='text-center text-[24px] font-extrabold text-black'>
            {metadata?.format ? metadata.format(value) : value.toLocaleString()}
          </Text>
        </div>
      </CardBody>
    </Card>
  )
}
