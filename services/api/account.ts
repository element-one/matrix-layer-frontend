import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { Address } from 'viem'

import axios from '@services/axios/client'
import {
  ApiConfirmDeliveryResponse,
  ApiGetAddressResponse,
  ApiHoldingsResponse,
  ApiProductsResponse,
  ApiSaveAddressParams,
  ApiSaveAddressResponse
} from '@type/api'

export const getProducts = async (): Promise<ApiProductsResponse> => {
  const { data } = await axios.get(`/products`)
  return data
}

export const useGetProducts = (
  options?: Partial<UseQueryOptions<ApiProductsResponse, Error>>
) => {
  return useQuery<ApiProductsResponse, Error>({
    queryKey: ['all', 'products'],
    queryFn: () => getProducts(),
    ...options
  })
}

export const getUserHolding = async (
  address?: Address
): Promise<ApiHoldingsResponse> => {
  const { data } = await axios.get(`/users/holding/${address}`)

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

export const saveAddress = async (params: ApiSaveAddressParams) => {
  try {
    const { data } = await axios.post('/shipping-address', params)
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useSaveAddress = (
  options?: UseMutationOptions<
    ApiSaveAddressResponse,
    Error,
    ApiSaveAddressParams
  >
) => {
  return useMutation<ApiSaveAddressResponse, Error, ApiSaveAddressParams>({
    mutationKey: ['save', 'address'],
    mutationFn: (data) => saveAddress(data),
    ...options
  })
}

export const getAllAddresses = async (): Promise<ApiGetAddressResponse> => {
  const { data } = await axios.get('/shipping-address')
  return data
}

export const useGetAllAddresses = () => {
  return useQuery<ApiGetAddressResponse, Error>({
    queryKey: ['all', 'addresses'],
    queryFn: () => getAllAddresses()
  })
}

export const updateAddressService = async (
  id: string,
  params: ApiSaveAddressParams
) => {
  try {
    const { data } = await axios.put(`/shipping-address/${id}`, params)
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useUpdateAddress = (
  options?: UseMutationOptions<
    ApiSaveAddressResponse,
    Error,
    { id: string; data: ApiSaveAddressParams }
  >
) => {
  return useMutation<
    ApiSaveAddressResponse,
    Error,
    { id: string; data: ApiSaveAddressParams }
  >({
    mutationKey: ['update', 'address'],
    mutationFn: ({ id, data }) => updateAddressService(id, data),
    ...options
  })
}

export const deleteAddressService = async (id: string) => {
  try {
    const { data } = await axios.delete(`/shipping-address/${id}`)
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useDeleteAddress = (
  options?: UseMutationOptions<ApiSaveAddressResponse, Error, { id: string }>
) => {
  return useMutation<ApiSaveAddressResponse, Error, { id: string }>({
    mutationKey: ['delete', 'address'],
    mutationFn: ({ id }) => deleteAddressService(id),
    ...options
  })
}

export const activeDeliveryService = async (
  paymentId: string,
  addressId: string
) => {
  try {
    const { data } = await axios.post(
      `/payments/delivery/${paymentId}/${addressId}`
    )
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useActiveDelivery = (
  options?: UseMutationOptions<
    ApiSaveAddressResponse,
    Error,
    { paymentId: string; addressId: string }
  >
) => {
  return useMutation<
    ApiSaveAddressResponse,
    Error,
    { paymentId: string; addressId: string }
  >({
    mutationKey: ['active', 'delivery'],
    mutationFn: ({ paymentId, addressId }) =>
      activeDeliveryService(paymentId, addressId),
    ...options
  })
}

export const confirmDeliveryService = async (paymentId: string) => {
  try {
    const { data } = await axios.post(`/payments/confirm-receipt/${paymentId}`)
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useConfirmDelivery = (
  options?: UseMutationOptions<
    ApiConfirmDeliveryResponse,
    Error,
    { paymentId: string }
  >
) => {
  return useMutation<ApiConfirmDeliveryResponse, Error, { paymentId: string }>({
    mutationKey: ['confirm', 'delivery'],
    mutationFn: ({ paymentId }) => confirmDeliveryService(paymentId),
    ...options
  })
}
