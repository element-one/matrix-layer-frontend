import { useQuery } from '@tanstack/react-query'

import http from '@services/axios/client'
import { ApiPaymentResponse } from '@type/api'

export const getPayments = async (
  page = 1,
  pageSize = 20
): Promise<ApiPaymentResponse> => {
  const { data } = await http.get(`/payments?page=${page}&pageSize=${pageSize}`)

  return data
}

export const useGetPayments = (page: number, pageSize = 6) => {
  return useQuery({
    queryKey: ['all', 'payments', page, pageSize],
    queryFn: () => getPayments(page, pageSize)
  })
}
