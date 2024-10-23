import { useQuery } from '@tanstack/react-query'

import { ProductEnum } from '@utils/payment'

import axios from '../axios/client'

export interface ProductSalesData {
  productType: ProductEnum
  soldQuantity: number
}

export const getProductSales = async () => {
  const url = '/product-sales'
  const { data } = await axios.get<ProductSalesData[]>(url)

  const result = data.reduce(
    (pre, d) => {
      pre[d.productType] = d
      return pre
    },
    {} as Record<ProductEnum, ProductSalesData>
  )

  return result
}

export const useGetProductSales = () => {
  return useQuery({
    queryKey: ['get', 'product-sales'],
    queryFn: () => getProductSales()
  })
}
