import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'

import axios from '@services/axios/client'
import {
  ApiGetAddressResponse,
  ApiHoldingsResponse,
  ApiProductsResponse,
  ApiSaveAddressParams,
  ApiSaveAddressResponse
} from '@type/api'

export const getProductsService = async (): Promise<ApiProductsResponse> => {
  const { data } = await axios.get('/products')

  return data
}

export const useGetProducts = (
  options?: Partial<UseQueryOptions<ApiProductsResponse, Error>>
) => {
  return useQuery<ApiProductsResponse, Error>({
    queryKey: ['all', 'products'],
    queryFn: () => getProductsService(),
    ...options
  })
}

export const getUserHoldingService = async (): Promise<ApiHoldingsResponse> => {
  const { data } = await axios.get('/user-holding/holding-counts')

  return data
}

export const useGetUserHolding = (
  options?: Partial<UseQueryOptions<ApiHoldingsResponse, Error>>
) => {
  return useQuery<ApiHoldingsResponse, Error>({
    queryKey: ['user', 'holding'],
    queryFn: () => getUserHoldingService(),
    ...options
  })
}

export const saveAddressService = async (params: ApiSaveAddressParams) => {
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
    mutationFn: (data) => saveAddressService(data),
    ...options
  })
}

export const getAllAddressesService =
  async (): Promise<ApiGetAddressResponse> => {
    const { data } = await axios.get('/shipping-address')
    return data
  }

export const useGetAllAddresses = () => {
  return useQuery<ApiGetAddressResponse, Error>({
    queryKey: ['all', 'addresses'],
    queryFn: () => getAllAddressesService()
  })
}

export const activeDeliveryService = async (id: string) => {
  try {
    const { data } = await axios.post(`/payments/delivery/${id}`)
    return data
  } catch (err) {
    console.log('logout error:', err)
    throw err
  }
}

export const useActiveDelivery = (
  options?: UseMutationOptions<ApiSaveAddressResponse, Error, { id: string }>
) => {
  return useMutation<ApiSaveAddressResponse, Error, { id: string }>({
    mutationKey: ['active', 'delivery'],
    mutationFn: ({ id }) => activeDeliveryService(id),
    ...options
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
