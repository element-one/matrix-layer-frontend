import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Address } from 'viem'

import { ApiGetSignatureResponse, ApiPaymentResponse } from '@type/api'

import axios from '../axios/client'

export const getPayments = async (
  address: Address,
  page = 1,
  pageSize = 20
): Promise<ApiPaymentResponse> => {
  const { data } = await axios.get(
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
  const { data } = await axios.get(
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
