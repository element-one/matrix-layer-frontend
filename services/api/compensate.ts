import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Address } from 'viem'

import axios from '../axios/client'

export type ApiGetCompensateListResponse = Array<{
  user: Address
  id: Address
  amount: string
}>

export const getCompensateList = async () => {
  const url = '/users/compensation-plan'
  const { data } = await axios.get<ApiGetCompensateListResponse>(url)
  return data as ApiGetCompensateListResponse
}

export const useGetCompensateList = (
  options?: Partial<UseQueryOptions<ApiGetCompensateListResponse, any, any>>
) => {
  return useQuery<ApiGetCompensateListResponse>({
    queryKey: ['get', 'compensate'],
    queryFn: () => getCompensateList(),
    ...options
  })
}
