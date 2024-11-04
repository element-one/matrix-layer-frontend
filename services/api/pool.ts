import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { PoolType } from '@type/enums'

import axios from '../axios/client'

export interface ApiGetPoolRewardSummaryResponse {
  totalRewardAmount: string
  yesterdayRewardAmount: string
}

export const getPoolRewardSummary = async (poolType: PoolType) => {
  const url = `/pool-reward-summary/${poolType}`
  const { data } = await axios.get<ApiGetPoolRewardSummaryResponse>(url)

  return data
}

export const useGetPoolRewardSummary = (
  poolType: PoolType,
  options?: Partial<UseQueryOptions<ApiGetPoolRewardSummaryResponse, any, any>>
) => {
  return useQuery({
    queryKey: ['get', 'pool-reward-summary', ''],
    queryFn: () => getPoolRewardSummary(poolType),
    ...options
  })
}

export const getPoolAUserDailyRewards = async (address: string) => {
  const url = `/users/reward-details/${address}`
  const { data } = await axios.get<any>(url)

  return data
}

export const useGetPoolAUserDailyRewards = (address: string) => {
  return useQuery({
    queryKey: ['poola', 'userDailyRewards', address],
    queryFn: () => getPoolAUserDailyRewards(address),
    enabled: !!address
  })
}
