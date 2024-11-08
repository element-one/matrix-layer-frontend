// src/components/Interactions/BollingerBands.tsx
import React from 'react'

import { Text } from '@components/Text'
import type { ChartSeries } from '@type/graphqlApiSchema'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface BollingerBandsProps {
  title: string
  series: ChartSeries[] // Array of three series: Upper, Middle, Lower bands
  metadata?: {
    interval?: string
    [key: string]: any
  }
}

export const BollingerBandsChart: React.FC<BollingerBandsProps> = ({
  title,
  series,
  metadata
}) => {
  const interval = metadata?.interval || 'days'
  const [upperBand, middleBand, lowerBand] = series

  // Transform data to combine all bands
  const chartData = upperBand.data.map((point, index) => ({
    x: point.x,
    Upper: point.y,
    Middle: middleBand.data[index].y,
    Lower: lowerBand.data[index].y
  }))

  // Calculate current band width as percentage
  const lastPoint = chartData[chartData.length - 1]
  const bandWidth = (
    ((lastPoint.Upper - lastPoint.Lower) / lastPoint.Middle) *
    100
  ).toFixed(2)

  return (
    <div className='p-4 outline-none rounded-[24px] bg-[#323232] text-co-text-1 h-[300px]'>
      <div className='w-full flex flex-col gap-y-4 h-full'>
        <div className='flex flex-row items-center justify-between px-1 cursor-pointer rounded-md'>
          <Text className='text-lg font-semibold'>{title}</Text>
          <Text className='text-sm font-semibold'>
            Band Width: {bandWidth}%
          </Text>
        </div>
        <div className='flex-1 p-4'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <XAxis
                dataKey='x'
                interval='preserveStartEnd'
                tick={{ fontSize: 12 }}
                angle={interval === 'hours' ? -45 : 0}
                textAnchor={interval === 'hours' ? 'end' : 'middle'}
                height={interval === 'hours' ? 60 : 30}
              />
              <YAxis />
              <Tooltip
                formatter={(value: number) => value.toLocaleString()}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type='monotone'
                dataKey='Upper'
                stroke='#82ca9d'
                dot={false}
                name={upperBand.name || 'Upper Band'}
                strokeWidth={1}
              />
              <Line
                type='monotone'
                dataKey='Middle'
                stroke='#8884d8'
                dot={false}
                name={middleBand.name || 'Middle Band (SMA)'}
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='Lower'
                stroke='#82ca9d'
                dot={false}
                name={lowerBand.name || 'Lower Band'}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default BollingerBandsChart
