import React from 'react'

import type { ChatInteractionChart } from '@type/graphqlApiSchema'

import { BollingerBandsChart } from './Charts/BollingerBands'
import { SimpleLineChart } from './Charts/LineChart'
import { MACDChart } from './Charts/MACDChart'
import { RSIChart } from './Charts/RSIChart'

interface ChartInteractionProps {
  data: ChatInteractionChart
}

export const ChartInteraction: React.FC<ChartInteractionProps> = ({ data }) => {
  const { content } = data

  switch (content.type) {
    case 'line':
      return (
        <SimpleLineChart
          title={content.title}
          series={content.series} // Pass all series instead of just series[0]
          metadata={content.metadata}
        />
      )
    case 'rsi':
      return (
        <RSIChart
          title={content.title}
          series={content.series[0]}
          metadata={content.metadata}
        />
      )
    case 'macd':
      return (
        <MACDChart
          title={content.title}
          series={content.series}
          metadata={content.metadata}
        />
      )
    case 'bbands':
      return (
        <BollingerBandsChart
          title={content.title}
          series={content.series}
          metadata={content.metadata}
        />
      )
    default:
      return null
  }
}
