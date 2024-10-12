import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { Address } from 'viem'

import { ApiProofResponse, ApiUserResponse } from '@type/api'

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

export const verifyIsInWhitelist = async () => {
  try {
    const url = '/users/is-in-whitelist'
    const { data } = await axios.get(url)
    return data
  } catch (err) {
    throw err
  }
}

export const useVerifyIsInWhitelist = () => {
  return useMutation<boolean, Error>({
    mutationFn: () => verifyIsInWhitelist(),
    mutationKey: ['verify', 'is in whitelist']
  })
}

export const getProof = async () => {
  try {
    const { data } = await axios.get(`/users/proof`)
    return data
  } catch (err) {
    throw err
  }
}

export const useGetProof = (
  address?: string,
  options?: Partial<UseQueryOptions<ApiProofResponse, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiProofResponse, Error>({
    queryKey: ['user', 'proof', address],
    queryFn: () => getProof(),
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
