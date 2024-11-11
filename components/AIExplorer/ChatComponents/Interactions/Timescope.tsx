import clsx from 'clsx'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import {
  AgentStatus,
  ChatSingleSelectionContentOptionInput
} from '@type/graphqlApiSchema'

interface ITimescope {
  newsTimescopes: ChatSingleSelectionContentOptionInput[]
  newsTimescopesIndex: number
  onTimescopeSelect: (index: number) => void
  onUpgradeRequired: () => void
  agentStatus: string
}

export default function Timescope({
  newsTimescopes,
  onTimescopeSelect,
  onUpgradeRequired,
  agentStatus
}: ITimescope) {
  const canAgentUseTimescope = agentStatus === AgentStatus.Platinum

  const handleTimescopeSelect = (index: number) => {
    if (!canAgentUseTimescope) {
      return onUpgradeRequired()
    }

    onTimescopeSelect(index)
  }

  return (
    <div className='flex ml-12 mt-3 gap-6 flex-wrap'>
      {newsTimescopes.map((newsTimescope, index) => (
        <Button
          className={clsx(
            `font-semibold text-[14px] px-3 py-1`,
            !canAgentUseTimescope && 'text-gray-400'
          )}
          key={index}
          onClick={() => handleTimescopeSelect(index)}
        >
          {!canAgentUseTimescope ? (
            <Text>{newsTimescope.display_value} 🔒</Text>
          ) : (
            newsTimescope.display_value
          )}
        </Button>
      ))}
    </div>
  )
}
