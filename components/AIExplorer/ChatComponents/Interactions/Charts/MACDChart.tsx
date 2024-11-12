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

interface MACDChartProps {
  title: string
  series: ChartSeries[] // Array of series for MACD, Signal, and Histogram
  metadata?: {
    interval?: string
    [key: string]: any
  }
}

export const MACDChart: React.FC<MACDChartProps> = ({
  title,
  series,
  metadata
}) => {
  const interval = metadata?.interval || 'days'
  const [macdSeries, signalSeries, histogramSeries] = series

  // Transform data to combine all series
  const chartData = macdSeries.data.map((point, index) => ({
    x: point.x,
    MACD: point.y,
    Signal: signalSeries.data[index].y,
    Histogram: histogramSeries.data[index].y
  }))

  return (
    <div
      className='p-4 outline-none rounded-[24px] bg-[#323232] text-co-text-1 h-[300px]
        overflow-x-scroll'
    >
      <div className='w-full flex flex-col gap-y-4 h-full min-w-[600px]'>
        <div className='flex flex-row items-center justify-between px-1 cursor-pointer rounded-md'>
          <Text className='text-lg font-semibold'>{title}</Text>
          <Text
            className='text-sm font-semibold'
            style={{
              color:
                chartData[chartData.length - 1].Histogram > 0 ? 'green' : 'red'
            }}
          >
            Histogram: {chartData[chartData.length - 1].Histogram.toFixed(2)}
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
              <Tooltip />
              <Line
                type='monotone'
                dataKey='MACD'
                stroke='#8884d8'
                name={macdSeries.name}
              />
              <Line
                type='monotone'
                dataKey='Signal'
                stroke='#82ca9d'
                name={signalSeries.name}
              />
              <Line
                type='monotone'
                dataKey='Histogram'
                stroke='#ffc658'
                name={histogramSeries.name}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
