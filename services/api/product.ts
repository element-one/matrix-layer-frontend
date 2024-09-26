import { useQuery } from '@tanstack/react-query'

import http from '@services/axios/client'
import { ApiProductsResponse } from '@type/api'

export const getProductsService = async (): Promise<ApiProductsResponse> => {
  const { data } = await http.get('/products')

  return data
}

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['all', 'products'],
    queryFn: () => getProductsService()
  })
}
