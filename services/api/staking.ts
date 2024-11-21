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

export interface ApiGetClaimSignatureResponse {
  signature: string
  amount: string
}

interface GetClaimSignatureParams {
  type: 'pool_a' | 'pool_b1' | 'pool_b2' | 'pool_c'
  address: string
}

export const getClaimSignature = async (params: GetClaimSignatureParams) => {
  const url = `/contracts/claim-signature/${params.type}/${params.address}`
  const { data } = await axios.get<ApiGetClaimSignatureResponse>(url)
  return data
}

export const useGetClaimSignature = (
  params: GetClaimSignatureParams,
  options?: Partial<UseQueryOptions<ApiGetClaimSignatureResponse, any, any>>
) => {
  return useQuery<ApiGetClaimSignatureResponse>({
    queryKey: ['get', 'claim-signature', params.type, params.address],
    queryFn: () => getClaimSignature(params),
    ...options
  })
}
