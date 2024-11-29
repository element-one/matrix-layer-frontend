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

export interface ApiGetUserStakingListParams {
  address: string
  type: 'pool_b1' | 'pool_b2'
  page?: number
  pageSize?: number
  take?: number
  startDate?: string
  endDate?: string
  order?: 'ASC' | 'DESC'
}

export interface UserStakingListItem {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  type: number
  startStakingAt: string
  endStakingAt: string
  cancelStakingAt: string | null
  stakingTransactionHash: string
  cancelStakingTransactionHash: string | null
  estimatedRewardAmount: string
  actualRewardAmount: string
  accumulatedRewardAmount: string
  rewardDiscount: string
  stakedTokenAmount: string
  contractDays: number
  coefficientA: number
  coefficientB: number
  isActive: boolean
  stakeId: number
  rewardAmount: string
}
export interface ApiGetUserStakingListResponse {
  data: Array<UserStakingListItem>
  total: number
  page: number
  pageSize: number
}

export const getUserStakingList = async (
  params: ApiGetUserStakingListParams
) => {
  const url = `/users/contract/${params.type}/${params.address}`
  const { data } = await axios.get<ApiGetUserStakingListResponse>(url, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      take: params.take,
      startDate: params.startDate,
      endDate: params.endDate,
      order: params.order
    }
  })
  return data
}

export const useGetUserStakingList = (
  params: ApiGetUserStakingListParams,
  options?: Partial<UseQueryOptions<ApiGetUserStakingListResponse, any, any>>
) => {
  return useQuery<ApiGetUserStakingListResponse>({
    queryKey: ['get', 'user-staking-list', params],
    queryFn: () => getUserStakingList(params),
    enabled: !!params.address,
    ...options
  })
}
export interface ApiGetUserWithdrawMlpTokenResponse {
  expectedRewardAmount: string
  rewardDiscount: string
  actualRewardAmount: string
}

export const getUserWithdrawMlpToken = async (
  address: string,
  stakeId: number
) => {
  const url = `/users/contract/withdraw-mlp-token/${address}/${stakeId}`
  const { data } = await axios.get<ApiGetUserWithdrawMlpTokenResponse>(url)
  return data
}

export const useGetUserWithdrawMlpToken = (
  address: string,
  stakeId: number,
  options?: Partial<
    UseQueryOptions<ApiGetUserWithdrawMlpTokenResponse, any, any>
  >
) => {
  return useQuery<ApiGetUserWithdrawMlpTokenResponse>({
    queryKey: ['get', 'user-withdraw-mlp-token', address, stakeId],
    queryFn: () => getUserWithdrawMlpToken(address, stakeId),
    ...options
  })
}
