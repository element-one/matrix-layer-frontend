import { useCallback, useEffect, useState } from 'react'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { Address } from 'viem'

import {
  ApiHoldingsResponse,
  ApiInWhitelistResponse,
  ApiRewardHistoryResponse,
  ApiUserResponse
} from '@type/api'

import axios from '../axios/client'

export const getUser = async (address?: Address) => {
  try {
    const { data } = await axios.get(`/users/${address}`)
    return data
  } catch (err) {
    throw err
  }
}

export const useGetUser = (
  address?: Address,
  options?: Partial<UseQueryOptions<ApiUserResponse, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiUserResponse, Error>({
    queryKey: ['user', address],
    queryFn: () => getUser(address),
    ...options
  })
}

export const patchReferralCode = async (
  referralCode: string,
  signature: string
) => {
  const url = `/users/referral`
  const { data } = await axios.patch<ApiUserResponse>(url, {
    referralCode,
    signature
  })

  return data
}

export const usePatchReferralCode = (
  referralCode: string,
  options?: Partial<UseMutationOptions<ApiUserResponse, any, any>> //eslint-disable-line
) => {
  return useMutation<ApiUserResponse, Error, { signature: string }>({
    mutationFn: ({ signature }) => patchReferralCode(referralCode, signature),
    mutationKey: ['patch', 'referralCode', referralCode],
    ...options
  })
}

export const getRewardsHistory = async (
  address: Address,
  page = 1,
  pageSize = 20
): Promise<ApiRewardHistoryResponse> => {
  const { data } = await axios.get(
    `/users/rewards/${address}?page=${page}&pageSize=${pageSize}`
  )

  return data
}

export const useGetRewardsHistory = (
  address: Address,
  page: number,
  pageSize = 6,
  options?: Partial<UseQueryOptions<ApiRewardHistoryResponse, Error>>
) => {
  return useQuery<ApiRewardHistoryResponse, Error>({
    queryKey: ['history', 'rewards', address, page, pageSize],
    queryFn: () => getRewardsHistory(address, page, pageSize),
    ...options
  })
}

interface GetMLPRewardsHistoryParams {
  address: Address
  page?: number
  pageSize?: number
  type?: MiningType
}

export const getMLPRewardsHistory = async ({
  address,
  page = 1,
  pageSize = 20,
  type
}: GetMLPRewardsHistoryParams) => {
  const url = `/users/rewards/mlp-token/${address}`
  const { data } = await axios.get(url, { params: { page, pageSize, type } })

  return data
}

export const useGetMLPRewardsHistory = (
  params: GetMLPRewardsHistoryParams,
  options?: Partial<UseQueryOptions<ApiRewardHistoryResponse, Error>>
) => {
  return useQuery<ApiRewardHistoryResponse, Error>({
    queryKey: ['history', 'rewards', 'mlp-token', params],
    queryFn: () => getMLPRewardsHistory(params),
    ...options
  })
}

export const getUserHolding = async (
  address?: Address
): Promise<ApiHoldingsResponse> => {
  const { data } = await axios.get(`/users/holdings/${address}`)

  return data
}

export const useGetUserHolding = (
  address?: Address,
  options?: Partial<UseQueryOptions<ApiHoldingsResponse, Error>>
) => {
  return useQuery<ApiHoldingsResponse, Error>({
    queryKey: ['user', 'holding', address],
    queryFn: () => getUserHolding(address),
    ...options
  })
}

export const getIsInWhitelist = async (
  address?: Address
): Promise<ApiInWhitelistResponse> => {
  try {
    const url = `/users/is-in-whitelist/${address}`
    const { data } = await axios.get(url)
    return data
  } catch (err) {
    throw err
  }
}

export const useGetIsInWhitelist = (
  address?: Address,
  options?: Partial<UseQueryOptions<ApiInWhitelistResponse, Error>>
) => {
  return useQuery<ApiInWhitelistResponse, Error>({
    queryKey: ['user', 'whitelist', address],
    queryFn: () => getIsInWhitelist(address),
    ...options
  })
}

export interface ApiGetUserRewardsSummaryResponse {
  currentDayAllPoolTotalRewards: string
  currentDayAllPoolTotalStakingAmount: string
  poolAStakingAmount: string
  poolATotalRewards: string
  poolB1StakingTokenAmount: string
  poolB1MedianStakingTokenAmount: string
  poolB1TotalRewards: string
  poolB2StakingTokenAmount: string
  poolB2MedianStakingTokenAmount: string
  poolB2TotalRewards: string
  poolCStakingAmount: string
  poolCTotalRewards: string
  poolPhoneTotalRewards: string
  yesterdayPoolARewards: string
  yesterdayPoolB1Rewards: string
  yesterdayPoolB2Rewards: string
  yesterdayPoolCRewards: string
  yesterdayPoolPhoneRewards: string
  userHoldingCount: number
  teamUserHoldingSales: string
  teamDailyUserHoldingSales: string
  validPhoneCount: number
}

export const getUserRewardsSummary = async (address?: string) => {
  try {
    const url = `/users/rewards-summary/${address}`
    const { data } = await axios.get<ApiGetUserRewardsSummaryResponse>(url)
    return data
  } catch (err) {
    throw err
  }
}

export const useGetUserRewardsSummary = (
  address?: Address,
  options?: Partial<UseQueryOptions<ApiGetUserRewardsSummaryResponse, Error>>
) => {
  return useQuery<ApiGetUserRewardsSummaryResponse, Error>({
    queryKey: ['user', 'rewards-summary', address],
    queryFn: () => getUserRewardsSummary(address),
    enabled: !!address,
    ...options
  })
}

export interface ApiGetUserRewardsMlpTokenResponse {
  data: {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    tokenAmount: string
    status: string
    type: number
    transactionHash: string
    merchantReferralLevel: string | null
    merchantAddress: string | null
    blockDate: string | null
    address: string
  }[]
  total: number
  page: number
  pageSize: number
}
export enum MiningType {
  Phone = 0,
  POW = 1,
  NFTBoosted = 2,
  MLPBoosted = 3,
  Promotional = 4
}

interface GetUserRewardsMlpTokenParams {
  address?: Address
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
  order?: string
  type?: MiningType
}

export const getUserRewardsMlpToken = async (
  params: GetUserRewardsMlpTokenParams
): Promise<ApiGetUserRewardsMlpTokenResponse> => {
  try {
    const { data } = await axios.get<ApiGetUserRewardsMlpTokenResponse>(
      `/users/rewards/mlp-token/${params.address}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
          startDate: params.startDate,
          endDate: params.endDate,
          order: params.order,
          type: params.type
        }
      }
    )
    return data
  } catch (err) {
    throw err
  }
}

export const useGetUserRewardsMlpToken = (
  params: GetUserRewardsMlpTokenParams,
  options?: Partial<UseQueryOptions<ApiGetUserRewardsMlpTokenResponse, Error>>
) => {
  return useQuery<ApiGetUserRewardsMlpTokenResponse, Error>({
    queryKey: ['user', 'rewards-mlp-token', params],
    queryFn: () => getUserRewardsMlpToken(params),
    enabled: !!params.address,
    ...options
  })
}

interface GetUserRewardDetailsParams {
  address?: Address
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
  order?: string
  poolType?: 'pool_phone' | 'pool_a' | 'pool_b1' | 'pool_b2' | 'pool_c'
}

export interface ApiGetUserRewardDetailsResponse {
  data: {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    date: string
    poolType: string
    type: string
    rate: string
    amount: string
    stakingAmount: string
    daySequence: number
    transactionHash: string | null
    stakingStartDate: string | null
    mlpTokenPrice: string
    totalContracts: number
    eligibleContracts: number
    blockTimestamp: string | null
    poolCParams: string | null
    userStakingIds: string[]
    totalHoldings: number
    holdingsByType: Record<string, unknown>
    isLock?: boolean
  }[]
  total: number
  page: number
  pageSize: number
}

export const getUserRewardDetails = async (
  params: GetUserRewardDetailsParams
): Promise<ApiGetUserRewardDetailsResponse> => {
  try {
    const { data } = await axios.get<ApiGetUserRewardDetailsResponse>(
      `/users/reward-details/${params.address}`,
      {
        params: {
          page: params.page,
          pageSize: params.pageSize,
          startDate: params.startDate,
          endDate: params.endDate,
          order: params.order,
          poolType: params.poolType
        }
      }
    )
    return data
  } catch (err) {
    throw err
  }
}

export const useGetUserRewardDetails = (
  params: GetUserRewardDetailsParams,
  options?: Partial<UseQueryOptions<ApiGetUserRewardDetailsResponse, Error>>
) => {
  return useQuery<ApiGetUserRewardDetailsResponse, Error>({
    queryKey: ['user', 'reward-details', params],
    queryFn: () => getUserRewardDetails(params),
    enabled: !!params.address,
    ...options
  })
}

export interface GetUserReferralRewardsParams {
  address?: Address
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
  order?: 'ASC' | 'DESC'
}

export interface ApiGetUserReferralRewardsResponse {
  data: {
    id: string
    createdAt: string
    updatedAt: string
    rewardAmount: string
    blockTimestamp: number
    txid: string
    address: string
  }[]
  total: number
  page: number
  pageSize: number
}

export const getUserReferralRewards = async (
  params: GetUserReferralRewardsParams
): Promise<ApiGetUserReferralRewardsResponse> => {
  try {
    const { data } = await axios.get<ApiGetUserReferralRewardsResponse>(
      `/users/referral-rewards`,
      {
        params
      }
    )
    return data
  } catch (err) {
    throw err
  }
}

export const useGetUserReferralRewards = (
  params: GetUserReferralRewardsParams,
  options?: Partial<UseQueryOptions<ApiGetUserReferralRewardsResponse, Error>>
) => {
  return useQuery<ApiGetUserReferralRewardsResponse, Error>({
    queryKey: ['user', 'referral-rewards', params],
    queryFn: () => getUserReferralRewards(params),
    enabled: !!params.address,
    ...options
  })
}

interface ApiGetUserCheckMlpClaimedResponse {
  claimed: boolean
}

export const getUsersCheckMlpClaimed = async (txID: string) => {
  const url = `/users/check-mlp-claimed/${txID}`
  const { data } = await axios.get<ApiGetUserCheckMlpClaimedResponse>(url)

  return data
}

export const usePollingUsersCheckMLpClaimed = (
  txID: string | undefined,
  options?: Partial<UseQueryOptions<ApiGetUserCheckMlpClaimedResponse, Error>>
) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(2000)
  const [timeout, setTimeout] = useState<boolean>(false)
  const [refetchCount, setRefetchCount] = useState(0)

  useEffect(() => {
    setRefetchInterval(2000)
    setTimeout(false)
    setRefetchCount(0)
  }, [txID])

  const stopPolling = useCallback(() => {
    setRefetchInterval(false)
  }, [])

  const startPolling = useCallback(() => {
    setRefetchInterval(2000)
  }, [])

  const query = useQuery({
    queryKey: ['users', 'check-mlp-claimed', txID],
    queryFn: () => {
      setRefetchCount((count) => {
        if (count >= 15) {
          setTimeout(true)
          setRefetchInterval(false)
        }

        return count + 1
      })
      return getUsersCheckMlpClaimed(txID!)
    },
    refetchInterval,
    enabled: !!txID && !!refetchInterval,
    ...options
  })

  return {
    ...query,
    stopPolling,
    startPolling,
    timeout,
    refetchCount
  }
}

export interface ApiGetUsersAiBalanceResponse {
  tokenAmount: string
  totalTimes: number
  totalUsage: number
  remainingTimes: number
  totalNetworkDeposit: string
  totalNetworkUsageCount: number
}

export const getUsersAiBalance = async (address: string) => {
  const url = `/users/ai-balance/${address}`
  const { data } = await axios.get<ApiGetUsersAiBalanceResponse>(url)

  return data
}

export const useGetUsersAiBalance = (address?: string) => {
  return useQuery({
    queryKey: ['get', 'users', 'ai-balance', address],
    queryFn: () => getUsersAiBalance(address!),
    enabled: !!address
  })
}
export interface ApiGetUsersAIToken {
  nonce: number
  token: string
}

export const getUsersAIToken = async (address: string) => {
  const url = `/users/ai-token/${address}`
  const { data } = await axios.get<ApiGetUsersAIToken>(url)

  return data
}
