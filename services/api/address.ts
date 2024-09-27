import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'

import {
  ApiGetAddressResponse,
  ApiSaveAddressParams,
  ApiSaveAddressResponse
} from '@type/api'

import axios from '../axios/client'

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
