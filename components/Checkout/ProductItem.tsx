import { FC } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { MinusIcon } from '@components/Icon/MinusIcon'
import { PlusIcon } from '@components/Icon/PlusIcon'
import { Text } from '@components/Text'

export interface IProduct {
  name: string
  price: number
  priceInUsdt: number
  quantity: number
  type: string
}

interface ProductItemProps {
  products: IProduct[]
  product: IProduct
  onChangeProductQuantity: (products: IProduct[]) => void
}

const ProductItem: FC<ProductItemProps> = ({
  products,
  product,

  onChangeProductQuantity
}) => {
  const t = useTranslations('Checkout')

  const handleProductQuantityMinus = () => {
    if (product.quantity <= 0) return

    const clonedProducts = [...products]
    const matchedProduct = products.find((v) => v.type === product.type)

    if (matchedProduct) {
      matchedProduct.quantity = matchedProduct.quantity - 1
      onChangeProductQuantity(clonedProducts)
    }
  }

  const handleProductQuantityPlus = () => {
    if (product.quantity >= 99) return

    const clonedProducts = [...products]
    const matchedProduct = products.find((v) => v.type === product.type)

    if (matchedProduct) {
      matchedProduct.quantity = matchedProduct.quantity + 1
      onChangeProductQuantity(clonedProducts)
    }
  }

  return (
    <div
      className={clsx(
        `w-full md:w-[500px] h-[360px] md:h-[294px] box-border transition flex flex-col
          justify-center items-center`,
        product.quantity
          ? 'border-product-item-active-gradient'
          : 'border-product-item-gradient'
      )}
    >
      <div className='w-[80%] md:w-[430px]'>
        <div className='flex flex-row justify-between items-center mb-[14px]'>
          <Text className='text-[20px] md:text-[32px] font-bold text-white'>
            {product.name}
          </Text>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <Text>{t('selectQuantity')}</Text>
            <div className='flex flex-row items-center gap-x-[12px] mt-[12px] mb-[20px]'>
              <div
                className={clsx(
                  'p-[12px] border border-white rounded-[16px]',
                  !product.quantity
                    ? 'bg-black cursor-not-allowed'
                    : 'bg-white cursor-pointer'
                )}
                onClick={handleProductQuantityMinus}
              >
                <MinusIcon
                  className={clsx(
                    !product.quantity ? 'fill-white' : 'fill-black'
                  )}
                />
              </div>
              <div
                className='py-[10px] px-[24px] border-co-gray-7 border rounded-[16px] leading-[36px]
                  text-[20px]'
              >
                {product.quantity}
              </div>
              <div
                className={clsx(
                  'p-[12px] border border-white rounded-[16px] cursor-pointer',
                  'bg-white'
                )}
                onClick={handleProductQuantityPlus}
              >
                <PlusIcon className={clsx('fill-black')} />
              </div>
            </div>
            <Text className='text-[24px] md:text-[32px] text-white font-bold'>
              ${product.priceInUsdt}&nbsp;
              <span className='text-[16px] text-co-gray-7'>/{t('item')}</span>
            </Text>
          </div>
          <img
            className='h-[100px] md:h-[172px]'
            src={`/images/checkout/${product.type}.png`}
            alt='product-1'
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
