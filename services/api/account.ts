import {
  useMutation,
  UseMutationOptions,
  useQuery
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

export const useGetProducts = () => {
  return useQuery<ApiProductsResponse, Error>({
    queryKey: ['all', 'products'],
    queryFn: () => getProductsService()
  })
}

export const getUserHoldingService = async (): Promise<ApiHoldingsResponse> => {
  const { data } = await axios.get('/user-holding/holding-counts')

  return data
}

export const useGetUserHolding = () => {
  return useQuery<ApiHoldingsResponse, Error>({
    queryKey: ['user', 'holding'],
    queryFn: () => getUserHoldingService()
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
