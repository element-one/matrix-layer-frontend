import { ChangeEvent, FC } from 'react'
import clsx from 'clsx'

import { MinusIcon } from '@components/Icon/MinusIcon'
import { PlusIcon } from '@components/Icon/PlusIcon'
import { Text } from '@components/Text'

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  img: string
}

interface ProductItemProps {
  products: Product[]
  product: Product
  selectedProductId: string
  onChangeProduct: (productId: string) => void
  onChangeProductQuantity: (products: Product[]) => void
}

const ProductItem: FC<ProductItemProps> = ({
  products,
  product,
  selectedProductId,
  onChangeProduct,
  onChangeProductQuantity
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && product.id !== selectedProductId) {
      onChangeProduct(product.id)
    }
  }

  const handleProductQuantityMinus = () => {
    if (product.quantity <= 0 || product.id !== selectedProductId) return

    const clonedProducts = [...products]
    const matchedProduct = products.find((v) => v.id === product.id)

    if (matchedProduct) {
      matchedProduct.quantity = matchedProduct.quantity - 1
      onChangeProductQuantity(clonedProducts)
    }
  }

  const handleProductQuantityPlus = () => {
    if (product.quantity >= 99 || product.id !== selectedProductId) return

    const clonedProducts = [...products]
    const matchedProduct = products.find((v) => v.id === product.id)

    if (matchedProduct) {
      matchedProduct.quantity = matchedProduct.quantity + 1
      onChangeProductQuantity(clonedProducts)
    }
  }

  return (
    <div
      className={clsx(
        `w-[500px] h-[294px] box-border transition flex flex-col justify-center
          items-center`,
        product.id === selectedProductId
          ? 'border-product-item-active-gradient'
          : 'border-product-item-gradient'
      )}
    >
      <div className='w-[430px]'>
        <div className='flex flex-row justify-between items-center mb-[14px]'>
          <Text className='text-[32px] font-bold text-white'>
            {product.name}
          </Text>
          <input
            type='radio'
            value={product.id}
            checked={product.id === selectedProductId}
            className='productItem-checkbox'
            onChange={handleSelectChange}
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-4'>
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
            <Text className='text-[32px] text-white font-bold'>
              ${product.price}&nbsp;
              <span className='text-[16px] text-co-gray-7'>/item</span>
            </Text>
          </div>
          <img className='h-[172px]' src={product.img} alt='product-1' />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
