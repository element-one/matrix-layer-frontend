import { useMemo } from 'react'
import { Spinner } from '@nextui-org/react'
import { useAccount } from 'wagmi'

import { CompensationGuidePage } from '@components/CompensationPlan/CompensationGuidePage'
import { CompensationPlanPage } from '@components/CompensationPlan/CompensationPlanPage'
import Layout from '@components/Layout/Layout'
import { useGetCompensateList } from '@services/api'

const CompensationPlan = () => {
  const { address } = useAccount()
  const { data, isLoading } = useGetCompensateList()

  const isAuthorized = useMemo(() => {
    if (address) {
      return (data?.list ?? []).indexOf(address) > -1
    }
    return false
  }, [address, data?.list])

  if (isLoading) {
    return (
      <Layout
        className='overflow-y-hidden relative bg-black max-w-screen h-screen flex flex-col gap-4
          items-center justify-center'
      >
        <Spinner color='white' />
      </Layout>
    )
  }

  if (!isAuthorized) {
    return <CompensationGuidePage />
  }

  return <CompensationPlanPage />
}

export default CompensationPlan
