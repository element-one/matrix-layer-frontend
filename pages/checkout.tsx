import { useEffect, useState } from 'react'

import { Button } from '@components/Button'
import PaymentField from '@components/Checkout/PaymentField'
import ProductItem, { Product } from '@components/Checkout/ProductItem'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { SelectItemSkeleton } from '@components/Skeleton/SelectItemSkeleton'
import { Text } from '@components/Text'

const mock_products: Product[] = [
  {
    id: '0',
    name: 'Matrix Lager Protocol',
    price: 699,
    img: '/images/checkout/product-1.png',
    quantity: 10
  },
  {
    id: '1',
    name: 'Matrix Lager Protocol',
    price: 699,
    img: '/images/checkout/product-2.png',
    quantity: 5
  },
  {
    id: '2',
    name: 'Matrix Lager Protocol',
    price: 699,
    img: '/images/checkout/product-3.png',
    quantity: 2
  },
  {
    id: '3',
    name: 'Matrix Lager Protocol',
    price: 699,
    img: '/images/checkout/product-4.png',
    quantity: 4
  }
]

const CheckoutPage = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [products, setProducts] = useState(mock_products)
  const [selectedProductId, setSelectedProductId] = useState('0')

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [isCopied])

  const handleCopy = async () => {
    if (navigator.clipboard && !isCopied) {
      try {
        await navigator.clipboard.writeText('')
      } finally {
        setIsCopied(true)
      }
    }
  }

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <ImagesField>
          <img
            className='w-screen absolute top-0 left-0'
            src='/images/product/product-top.png'
            alt='product-top'
          />
          <img
            className='rotate-[276deg] absolute top-[140px] -right-[28px] w-[156px] h-[156px]'
            style={{
              filter: 'blur(4.6px)'
            }}
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
          <img
            className='absolute rotate-[45deg] top-[180px] -left-[73px] w-[245px] h-[245px]'
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
        </ImagesField>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[220px]'>
            <Text className='mb-5 font-pressStart2P text-white text-[36px]'>
              CHECKOUT
            </Text>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <div
            className='flex flex-row justify-between items-center border-b border-co-gray-2 pt-[64px]
              pb-[64px]'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Customer Details
            </Text>
            <div
              className='flex flex-row border-gradient-desktop justify-between items-center p-[8px]
                pl-[12px] md:pl-[32px] md:pr-[24px] md:py-[20px] border rounded-[20px] w-full
                md:w-[582px] mt-2'
            >
              <span className='text-[12px] md:text-[18px] text-co-gray-7 bg-transparent'>
                Wallet Address
              </span>
              {!true ? (
                <Button
                  color='primary'
                  className='text-[12px] md:text-[16px] py-[10px] px-[20px] rounded-[35px] font-semibold'
                >
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  color='primary'
                  className='text-[12px] md:text-[16px] hidden md:block py-[10px] px-[20px] rounded-[35px]
                    font-semibold'
                  onClick={handleCopy}
                >
                  {isCopied ? 'Copied' : 'Copy Address'}
                </Button>
              )}
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <img
            className='absolute bottom-0 right-[-28px] w-[237px] h-[353px]'
            src='/images/checkout/checkout-float-1.png'
            alt='checkout-float-1'
          />
        </ImagesField>
        <Content>
          <div
            className='flex flex-row justify-between items-start pt-[64px] pb-[64px] border-b
              border-co-gray-2'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Select Item
            </Text>
            <div className='grid grid-cols-2 gap-x-[24px] gap-y-[32px]'>
              {false ? (
                <>
                  <SelectItemSkeleton />
                  <SelectItemSkeleton />
                </>
              ) : (
                products.map((item) => (
                  <ProductItem
                    key={item.id}
                    products={products}
                    product={item}
                    selectedProductId={selectedProductId}
                    onChangeProduct={setSelectedProductId}
                    onChangeProductQuantity={setProducts}
                  />
                ))
              )}
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <div
            className='flex flex-row justify-between items-start pt-[64px] pb-[64px] border-b
              border-co-gray-2'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Subtotal
            </Text>
            <div>
              <Text
                className='text-[16px] md:text-[20px] text-gray-78 mb-[12px] font-normal md:font-medium
                  md:mb-[24px] leading-none text-right'
              >
                123 USDT
              </Text>
              <Text
                className='text-[24px] md:text-[32px] font-semibold md:font-semibold text-white
                  leading-none text-right'
              >
                123 USDT
              </Text>
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <div className='absolute bottom-[100px] left-0 w-screen object-cover h-[1200px]'>
            <video
              className='w-fit absolute left-1/2 top-0 translate-x-[-50%] h-[1200px] object-cover
                opacity-15'
              autoPlay
              muted
              loop
              playsInline
            >
              <source src='/images/home/home_video_1.mp4' type='video/mp4' />
              your browser does not support video tag.
            </video>
            <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
          </div>
          <img
            className='absolute bottom-[120px] left-[-10px] w-[310px] h-[353px]'
            src='/images/checkout/checkout-float-2.png'
            alt='checkout-float-2'
          />
        </ImagesField>
        <Content>
          <div className='flex flex-row justify-between items-center pt-[64px] pb-[300px]'>
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Payment
            </Text>
            <PaymentField />
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default CheckoutPage
