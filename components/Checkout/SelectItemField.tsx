import { FC, useCallback, useEffect, useState } from 'react'

import { SelectItemSkeleton } from '@components/Skeleton/SelectItemSkeleton'
import { Text } from '@components/Text'
import { useStore } from '@store/store'
import type { ProductType } from '@type/api'

import ProductItem, { Product } from './ProductItem'

export interface SelectItemFieldProps {
  defaultProduct?: ProductType
  products: Product[]
  isLoading?: boolean
}

const SelectItemField: FC<SelectItemFieldProps> = ({
  defaultProduct,
  products,
  isLoading
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | undefined>(defaultProduct)

  const setCurrentProduct = useStore(state => state.setCurrentProduct)

  const handleProductChange = useCallback((product: Product) => {
    setSelectedProduct(product.type)
    setCurrentProduct(product)
  }, [setCurrentProduct])

  useEffect(() => {
    if (!selectedProduct && defaultProduct) {
      setSelectedProduct(defaultProduct)
    }
  }, [defaultProduct, selectedProduct])

  return (
    <div
      className='flex flex-col md:flex-row justify-start md:justify-between md:items-center
        items-start gap-y-[12px] gap-x-[30px] text-nowrap'
    >
      <Text className='text-[14px] md:text-[20px] font-medium md:font-semibold text-white' size='semibold'>
        Select item
      </Text>
      <div className='flex w-full items-end flex-col gap-y-[40px] md:gap-y-[53px]'>
        {
          isLoading ?
            <>
              <SelectItemSkeleton />
              <SelectItemSkeleton />
            </> :
            products.map((item) => (
              <ProductItem
                key={item.id}
                selectedProduct={selectedProduct}
                product={item}
                onChange={handleProductChange}
              />
            ))
        }
      </div>
    </div>
  )
}

export default SelectItemField
