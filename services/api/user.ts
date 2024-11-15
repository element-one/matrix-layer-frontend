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

export const getMLPRewardsHistory = async (
  address: Address,
  page = 1,
  pageSize = 20
) => {
  const url = `/users/rewards/mlp-token/${address}`
  const { data } = await axios.get(url, { params: { page, pageSize } })

  return data
}

export const useGetMLPRewardsHistory = (
  address: Address,
  page: number,
  pageSize = 6,
  options?: Partial<UseQueryOptions<ApiRewardHistoryResponse, Error>>
) => {
  return useQuery<ApiRewardHistoryResponse, Error>({
    queryKey: ['history', 'rewards', 'mlp-token', address, page, pageSize],
    queryFn: () => getMLPRewardsHistory(address, page, pageSize),
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
  poolB1StakingAmount: string
  poolB1TotalRewards: string
  poolB2StakingAmount: string
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
