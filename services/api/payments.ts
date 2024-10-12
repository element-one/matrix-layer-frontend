import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Address } from 'viem'

import http from '@services/axios/client'
import {
  ApiClaimHistoryResponse,
  ApiGetSignatureResponse,
  ApiPaymentResponse
} from '@type/api'

export const getPayments = async (
  address: Address,
  page = 1,
  pageSize = 20
): Promise<ApiPaymentResponse> => {
  const { data } = await http.get(
    `/payments/${address}?&page=${page}&pageSize=${pageSize}`
  )

  return data
}

export const useGetPayments = (
  address: Address,
  page: number,
  pageSize = 6,
  options?: Partial<UseQueryOptions<ApiPaymentResponse, Error>>
) => {
  return useQuery<ApiPaymentResponse, Error>({
    queryKey: ['all', 'payments', address, page, pageSize],
    queryFn: () => getPayments(address, page, pageSize),
    ...options
  })
}

export const getSignature = async (
  address: Address,
  totalAmount: number
): Promise<ApiGetSignatureResponse> => {
  const { data } = await http.get(
    `/contracts/signature/${address}/${totalAmount}`
  )

  return data
}

export const useGetSignature = (
  address: Address,
  totalAmount: number,
  options?: Partial<UseQueryOptions<ApiGetSignatureResponse, Error>>
) => {
  return useQuery<ApiGetSignatureResponse, Error>({
    queryKey: ['all', 'signature', address, totalAmount],
    queryFn: () => getSignature(address, totalAmount),
    ...options
  })
}

export const getRewardsHistory = async (
  page = 1,
  pageSize = 20
): Promise<ApiClaimHistoryResponse> => {
  const { data } = await http.get(
    `/user-reward-claims?page=${page}&pageSize=${pageSize}`
  )

  return data
}

export const useGetRewardsHistory = (
  page: number,
  pageSize = 6,
  options?: Partial<UseQueryOptions<ApiClaimHistoryResponse, Error>>
) => {
  return useQuery<ApiClaimHistoryResponse, Error>({
    queryKey: ['history', 'rewards', page, pageSize],
    queryFn: () => getRewardsHistory(page, pageSize),
    ...options
  })
}
