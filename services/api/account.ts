import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'

import axios from '@services/axios/client'
import {
  ApiConfirmDeliveryResponse,
  ApiGetAddressResponse,
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

export const updateAddress = async (
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
    mutationFn: ({ id, data }) => updateAddress(id, data),
    ...options
  })
}

export const deleteAddress = async (id: string) => {
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
    mutationFn: ({ id }) => deleteAddress(id),
    ...options
  })
}

export const postActivateDelivery = async (
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
      postActivateDelivery(paymentId, addressId),
    ...options
  })
}

export const postConfirmDelivery = async (paymentId: string) => {
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
    mutationFn: ({ paymentId }) => postConfirmDelivery(paymentId),
    ...options
  })
}
