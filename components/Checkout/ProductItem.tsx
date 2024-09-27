import { ChangeEvent, FC } from 'react'
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
  selectedProductType: string
  onChangeProduct: (type: string) => void
  onChangeProductQuantity: (products: IProduct[]) => void
}

const ProductItem: FC<ProductItemProps> = ({
  products,
  product,
  selectedProductType,
  onChangeProduct,
  onChangeProductQuantity
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && product.type !== selectedProductType) {
      onChangeProduct(product.type)
    }
  }

  const handleProductQuantityMinus = () => {
    if (product.quantity <= 0 || product.type !== selectedProductType) return

    const clonedProducts = [...products]
    const matchedProduct = products.find((v) => v.type === product.type)

    if (matchedProduct) {
      matchedProduct.quantity = matchedProduct.quantity - 1
      onChangeProductQuantity(clonedProducts)
    }
  }

  const handleProductQuantityPlus = () => {
    if (product.quantity >= 99 || product.type !== selectedProductType) return

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
        product.type === selectedProductType
          ? 'border-product-item-active-gradient'
          : 'border-product-item-gradient'
      )}
    >
      <div className='w-[80%] md:w-[430px]'>
        <div className='flex flex-row justify-between items-center mb-[14px]'>
          <Text className='text-[20px] md:text-[32px] font-bold text-white'>
            {product.name}
          </Text>
          <input
            type='radio'
            value={product.type}
            checked={product.type === selectedProductType}
            className='productItem-checkbox'
            onChange={handleSelectChange}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <Text>Select quantity</Text>
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
              <span className='text-[16px] text-co-gray-7'>/item</span>
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
