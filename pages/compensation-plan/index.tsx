import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import { CompensationGuidePage } from '@components/CompensationPlan/CompensationGuidePage'
import { CompensationPlanPage } from '@components/CompensationPlan/CompensationPlanPage'
import compensation_list from '@constants/compensation_list.json'

const CompensationPlan = () => {
  const { address } = useAccount()

  const isAuthorized = useMemo(() => {
    if (address) {
      return compensation_list.whitelist.indexOf(address) > -1
    }
    return false
  }, [address])

  if (!isAuthorized) {
    return <CompensationGuidePage />
  }

  return <CompensationPlanPage />
}

export default CompensationPlan
