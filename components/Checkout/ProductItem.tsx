import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import clsx from 'clsx'

import { MinusIcon } from '@components/Icon/MinusIcon'
import { PlusIcon } from '@components/Icon/PlusIcon'
import { Text } from '@components/Text'
import type { ProductType } from '@type/api'
import { currencyFormatter } from '@utils/currencyFormatter'

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  img: string
  type: ProductType
}

interface ProductItemProps {
  product: Product
  selectedProduct?: ProductType
  onChange: (product: Product) => void
}

const ProductItem: FC<ProductItemProps> = ({
  product,
  selectedProduct,
  onChange
}) => {
  const [productQuantity, setProductQuantity] = useState(product.quantity)

  const handleAddProductQuantity = () => {
    setProductQuantity((quantity) => {
      const q = quantity + 1

      onChange({
        ...product,
        quantity: q
      })

      return q
    })
  }

  const handleSubProductQuantity = () => {
    setProductQuantity((quantity) => {
      if (quantity <= 1) {
        return 1
      }

      const q = quantity - 1

      onChange({
        ...product,
        quantity: q
      })
      return q
    })
  }

  const handleSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      onChange(product)
    }
  }

  const isCurrent = selectedProduct === product.type

  useEffect(() => {
    if (!isCurrent) {
      return
    }

    onChange({
      id: product.id,
      price: product.price,
      quantity: productQuantity,
      img: product.img,
      name: product.name,
      type: product.type
    })
  }, [product.id, product.price, productQuantity, onChange, product.img, product.name, isCurrent, product.type])

  return (
    <div className='w-full md:w-[970px] border border-gray-78  bg-black-17 bg-opacity-80 backdrop:blur-2xl rounded-[32px] p-3 md:p-[24px]'>
      <div
        className='flex flex-row w-full justify-between md:justify-start items-center gap-x-4 md:gap-x-[32px]'
      >
        <input
          type='radio'
          value={product.id}
          checked={isCurrent}
          className='productItem-checkbox'
          onChange={(handleSelectChange)}
        />
        <div className='max-w-[150px] md:max-w-max'>
          <Text className='text-xl md:text-[34px] mb-1 md:mb-[20px] text-wrap' size='semibold'>
            {product.name}
          </Text>
          <div className='flex flex-row justify-between items-center gap-x-[20px]'>
            <Text as='div' className='text-base md:text-[32px]' size='semibold'>
              {currencyFormatter.format(product.price)} USDT
              <Text as='span' className='text-xs md:text-[20px] text-gray-78'>
                /item
              </Text>
            </Text>
            <div
              className='hidden md:flex flex-row justify-between items-center p-[4px] pl-[20px] border
                  border-gray-42 rounded-[24px] gap-x-[24px] bg-gray-42/50'
            >
              <Text className='text-[16px] font-normal'>Select Quantity</Text>
              <div
                className={
                  clsx(
                    'flex flex-row justify-between items-center border-gradient-desktop gap-x-[5px] p-[4px] border rounded-[24px]',
                    !isCurrent && 'pointer-events-none opacity-50'
                  )
                }
              >
                <MinusIcon onClick={handleSubProductQuantity} className='cursor-pointer' />
                <span className='rounded-[px] min-w-[40px] select-none bg-black/50 px-[12px] text-[24px] font-semibold'>
                  {productQuantity}
                </span>
                <PlusIcon onClick={handleAddProductQuantity} className='cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
        <div className='ml-auto select-none'>
          <img className='w-[100px] md:w-[196px]' src={product.img} alt='handheld_wifi' />
        </div>
      </div>
      <div
        className='flex md:hidden flex-row justify-between items-center p-[4px] pl-[20px] border
                  border-gray-42 rounded-[24px] gap-x-[24px] bg-gray-42/50 mt-3'
      >
        <Text className='text-[10px] md:text-[16px]'>Select Quantity</Text>
        <div
          className={
            clsx(
              'flex flex-row justify-between items-center gap-x-[5px] border-gradient-desktop p-[4px] border rounded-[24px]',
              !isCurrent && 'pointer-events-none opacity-50'
            )
          }
        >
          <MinusIcon
            onClick={handleSubProductQuantity}
            className={productQuantity <= 1 ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
            width={28}
            height={28}
          />
          <span className='rounded-[px] min-w-[40px] select-none bg-black/50 px-[12px] text-base font-semibold'>
            {productQuantity}
          </span>
          <PlusIcon onClick={handleAddProductQuantity} className='cursor-pointer' width={28} height={28} />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
