import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'

import {
  ApiAuthNonce,
  ApiAuthResponse,
  ApiMessageResponse,
  ApiWalletLoginParams,
  ApiWalletLoginResponse
} from '@type/api'

import axios from '../axios/client'

export const getAuth = async () => {
  try {
    const { data } = await axios.get('/auth/check-auth')
    return data
  } catch (err) {
    throw err
  }
}

export const useGetAuth = (
  options?: Partial<UseQueryOptions<ApiAuthResponse, Error>>
) => {
  return useQuery<ApiAuthResponse, Error>({
    queryKey: ['auth', 'status'],
    queryFn: () => getAuth(),
    ...options
  })
}

export const getGoogleSignIn = async () => {
  try {
    const { data } = await axios.get('/auth/google')
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const usePostGoogleSignIn = (
  options?: UseQueryOptions<ApiMessageResponse, any, any> //eslint-disable-line
) => {
  return useQuery<ApiMessageResponse, Error>({
    queryKey: ['google', 'signin'],
    queryFn: () => getGoogleSignIn(),
    ...options
  })
}

export const postLogout = async () => {
  try {
    const { data } = await axios.post('/auth/logout')
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const usePostLogout = (
  options?: UseMutationOptions<ApiMessageResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiMessageResponse, Error>({
    mutationKey: ['logout'],
    mutationFn: () => postLogout(),
    ...options
  })
}

export const postWalletLogin = async (params: ApiWalletLoginParams) => {
  const url = '/auth/login'

  try {
    const { data } = await axios.post(url, { ...params })

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const usePostWalletLogin = (
  options?: UseMutationOptions<ApiWalletLoginResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiWalletLoginResponse, Error, ApiWalletLoginParams>({
    mutationKey: ['wallet', 'login'],
    mutationFn: (data) => postWalletLogin(data),
    ...options
  })
}

export const getNonce = async (address?: `0x${string}`) => {
  if (!address) {
    return undefined
  }

  const { data } = await axios.get<ApiAuthNonce>(`/auth/nonce/${address}`)
  return data
}

export const useGetNonce = (
  address?: `0x${string}`,
  options?: Partial<UseQueryOptions<ApiAuthNonce | undefined, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiAuthNonce | undefined, Error>({
    queryKey: ['auth', 'nonce', address],
    queryFn: () => getNonce(address),
    ...options
  })
}
