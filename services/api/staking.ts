import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import axios from '../axios/client'

export interface ApiGetStakingApySummaryResponse {
  '30': string
  '60': string
  '90': string
  '180': string
}

export const getStakingApySummary = async () => {
  const url = '/staking-contract/apy-summary'
  const { data } = await axios.get<ApiGetStakingApySummaryResponse>(url)
  return data
}

export const useGetStakingApySummary = (
  options?: Partial<UseQueryOptions<ApiGetStakingApySummaryResponse, any, any>>
) => {
  return useQuery<ApiGetStakingApySummaryResponse>({
    queryKey: ['get', 'staking-apy-summary'],
    queryFn: () => getStakingApySummary(),
    ...options
  })
}
