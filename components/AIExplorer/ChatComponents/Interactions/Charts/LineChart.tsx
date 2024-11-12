import React from 'react'

import { Text } from '@components/Text'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface ChartPoint {
  x: string
  y: number
}

interface ChartSeries {
  name: string
  type: string
  data: ChartPoint[]
  metadata?: {
    color?: string
    lineProps?: {
      strokeWidth?: number
      strokeDasharray?: string // Changed from string | null
    }
  }
}

interface LineChartProps {
  title: string
  series: ChartSeries[]
  metadata?: {
    interval?: string
    xAxis?: {
      interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'
      tick?: {
        fontSize?: number
      }
      angle?: number
      textAnchor?: string
      height?: number
    }
    yAxis?: {
      domain?: [number, number]
      tickCount?: number
      tickFormatter?: string
      scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log'
    }
  }
}

export const SimpleLineChart: React.FC<LineChartProps> = ({
  title,
  series,
  metadata
}) => {
  const formatXAxis = (tickItem: string) => {
    const time = new Date(tickItem)
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatPrice = (value: number) =>
    `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`
  const dataLength = series[0]?.data.length || 0
  const suggestedInterval = Math.max(Math.floor(dataLength / 6), 1)
  return (
    <div
      className='w-full overflow-hidden overflow-x-scroll p-4 outline-none rounded-[24px]
        bg-[#323232] text-co-text-1'
    >
      <div className='flex flex-col gap-y-4 min-w-[600px]'>
        <div className='p-4'>
          <Text className='text-lg font-semibold'>{title}</Text>
        </div>
        <div className='h-[350px] p-4'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={series[0].data}
              margin={{ top: 20, right: 30, left: 80, bottom: 45 }}
            >
              <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
              <XAxis
                dataKey='x'
                type='category'
                allowDuplicatedCategory={false}
                interval={metadata?.xAxis?.interval || suggestedInterval}
                tickFormatter={formatXAxis}
                {...metadata?.xAxis}
                height={metadata?.xAxis?.height || 60}
                angle={metadata?.xAxis?.angle || -45}
                textAnchor={metadata?.xAxis?.textAnchor || 'end'}
              />
              <YAxis
                tickFormatter={formatPrice}
                width={80}
                domain={['auto', 'auto']}
                scale='linear'
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [formatPrice(value), 'Price']}
                labelFormatter={(label) => {
                  const time = new Date(label)
                  return time.toLocaleString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }}
              />
              <Legend
                verticalAlign='top'
                height={36}
                wrapperStyle={{
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  opacity: 0.8
                }}
              />
              {series.map((s, i) => (
                <Line
                  key={i}
                  type='monotone'
                  dataKey='y'
                  data={s.data}
                  name={s.name}
                  stroke={s.metadata?.color}
                  strokeWidth={s.metadata?.lineProps?.strokeWidth || 1}
                  strokeDasharray={
                    s.metadata?.lineProps?.strokeDasharray || undefined
                  } // Changed handling here
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
