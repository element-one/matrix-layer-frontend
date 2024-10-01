import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import http from '@services/axios/client'
import {
  ApiClaimHistoryResponse,
  ApiGetSignatureResponse,
  ApiPaymentResponse
} from '@type/api'

export const getPayments = async (
  page = 1,
  pageSize = 20
): Promise<ApiPaymentResponse> => {
  const { data } = await http.get(`/payments?page=${page}&pageSize=${pageSize}`)

  return data
}

export const useGetPayments = (
  page: number,
  pageSize = 6,
  options?: Partial<UseQueryOptions<ApiPaymentResponse, Error>>
) => {
  return useQuery<ApiPaymentResponse, Error>({
    queryKey: ['all', 'payments', page, pageSize],
    queryFn: () => getPayments(page, pageSize),
    ...options
  })
}

export const getSignature = async (
  totalAmount: number
): Promise<ApiGetSignatureResponse> => {
  const { data } = await http.get(`/contracts/signature/${totalAmount}`)

  return data
}

export const useGetSignature = (
  totalAmount: number,
  options?: Partial<UseQueryOptions<ApiGetSignatureResponse, Error>>
) => {
  return useQuery<ApiGetSignatureResponse, Error>({
    queryKey: ['all', totalAmount],
    queryFn: () => getSignature(totalAmount),
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
