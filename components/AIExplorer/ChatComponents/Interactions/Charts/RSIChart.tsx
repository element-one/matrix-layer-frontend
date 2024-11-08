import React from 'react'

import { Text } from '@components/Text'
import type { ChartSeries } from '@type/graphqlApiSchema'
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface RSIChartProps {
  title: string
  series: ChartSeries // Changed to use ChartSeries
  metadata?: {
    interval?: string
    [key: string]: any
  }
}

export const RSIChart: React.FC<RSIChartProps> = ({
  title,
  series,
  metadata
}) => {
  const interval = metadata?.interval || 'days'

  return (
    <div className='p-4 outline-none rounded-[24px] bg-[#323232] text-co-text-1 h-[300px]'>
      <div className='w-full flex flex-col gap-y-4 h-full'>
        <div className='flex flex-row items-center justify-between px-1 cursor-pointer rounded-md'>
          <Text className='text-lg font-semibold'>{title}</Text>
          <Text
            className='text-sm font-semibold'
            style={{
              color:
                series.data[series.data.length - 1].y > 70
                  ? 'red'
                  : series.data[series.data.length - 1].y < 30
                    ? 'green'
                    : 'inherit'
            }}
          >
            Current: {series.data[series.data.length - 1].y.toFixed(2)}
          </Text>
        </div>
        <div className='flex-1 p-4'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={series.data}>
              <XAxis
                dataKey='x'
                interval='preserveStartEnd'
                tick={{ fontSize: 12 }}
                angle={interval === 'hours' ? -45 : 0}
                textAnchor={interval === 'hours' ? 'end' : 'middle'}
                height={interval === 'hours' ? 60 : 30}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <ReferenceLine y={70} stroke='red' strokeDasharray='3 3' />
              <ReferenceLine y={30} stroke='green' strokeDasharray='3 3' />
              <Line
                type='monotone'
                dataKey='y'
                stroke='#8884d8'
                name={series.name}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
