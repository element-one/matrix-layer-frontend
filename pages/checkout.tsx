import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Address } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import PAYMENT_ABI from '@abis/Payment.json'
import USDT_ABI from '@abis/USDT.json'
import { Button } from '@components/Button'
import PaymentField from '@components/Checkout/PaymentField'
import ProductItem, { IProduct } from '@components/Checkout/ProductItem'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { SelectItemSkeleton } from '@components/Skeleton/SelectItemSkeleton'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetProducts } from '@services/api/account'
import { convertTypeToInt, convertTypeToName } from '@utils/payment'

const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS

const CheckoutPage = () => {
  const { isConnected, address } = useAccount()
  const { showModal } = useModal()

  const [isCopied, setIsCopied] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [selectedProductType, setSelectedProductType] = useState('')

  const { data: allProducts = [], isLoading: isLoadingProducts } =
    useGetProducts()

  const [successModalHasShown, setSuccessModalHasShown] = useState(false)

  const { data: accountBalance, refetch: refetchAccount } = useReadContract({
    abi: USDT_ABI,
    address: USDT_ADDRESS as Address,
    functionName: 'balanceOf',
    args: [address]
  })

  const {
    data: approveHash,
    writeContract: approveContract,
    isPending: isApprovingContract
  } = useWriteContract()

  const {
    data: txHash,
    writeContract: payContract,
    isPending: isPayingContract
  } = useWriteContract()

  const { data: txData, isLoading: isWaitingPayingReceipt } =
    useWaitForTransactionReceipt({
      hash: txHash,
      query: {
        enabled: txHash !== undefined,
        initialData: undefined
      }
    })

  const { data: approveData, isLoading: isWaitingApproveReceipt } =
    useWaitForTransactionReceipt({
      hash: approveHash,
      query: {
        enabled: approveHash !== undefined,
        initialData: undefined
      }
    })

  useEffect(() => {
    if (txData && !successModalHasShown) {
      showModal(ModalType.PAY_SUCCESS_MODAL)
      setSuccessModalHasShown(true)
    }
  }, [txData, showModal, successModalHasShown])

  const selectedProduct: IProduct | undefined = useMemo(
    () => products.find((p) => p.type === selectedProductType) ?? undefined,
    [products, selectedProductType]
  )

  useEffect(() => {
    if (allProducts.length) {
      setProducts(() =>
        allProducts
          .map((item) => ({
            name: convertTypeToName(item.type),
            price: item.price,
            priceInUsdt: item.price / 1000000,
            type: item.type,
            quantity: 0
          }))
          .filter((v) => v.name)
      )
    }
  }, [allProducts])

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
        await navigator.clipboard.writeText(address as string)
      } finally {
        setIsCopied(true)
      }
    }
  }

  const handleConnectButtonClick = () => {
    showModal(ModalType.CONNECT_WALLET_MODAL)
  }

  const handlePayButtonClick = async () => {
    if (!isConnected || !address) {
      toast.info('Please connect your wallet first')
      return
    }

    if (!selectedProduct) return

    const amount = Number(selectedProduct.price) * selectedProduct.quantity

    if (accountBalance && Number(accountBalance) >= amount) {
      approveContract(
        {
          abi: USDT_ABI,
          address: USDT_ADDRESS as Address,
          functionName: 'approve',
          args: [PAYMENT_ADDRESS, String(amount)]
        },
        {
          onSuccess() {
            console.log('approve success paid: ', String(amount))
            refetchAccount()
          },
          onError(err: Error) {
            console.log(err.message)
            toast.error('Please try again')
          }
        }
      )
    } else {
      toast.info('your account balance is not enough to pay')
    }
  }

  const handlePay = useCallback(() => {
    if (!selectedProduct) return

    const amount = selectedProduct.price * selectedProduct.quantity

    const type = convertTypeToInt(selectedProduct.type)
    if (type === -1) return

    console.log('going to pay: ', amount)
    payContract(
      {
        abi: PAYMENT_ABI,
        functionName: 'payPublicSale',
        args: [String(amount), type, selectedProduct.quantity],
        address: PAYMENT_ADDRESS as Address
      },
      {
        onSuccess() {
          console.log('pay contract success')
        },
        onError(err) {
          console.log(err.message)
          toast.error('pay: Please try again')
        }
      }
    )
  }, [selectedProduct, payContract])

  useEffect(() => {
    if (approveData) {
      handlePay()
    }
  }, [approveData, handlePay])

  const isPaying =
    isApprovingContract ||
    isPayingContract ||
    isWaitingApproveReceipt ||
    isWaitingPayingReceipt

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
            className='rotate-[276deg] absolute md:top-[140px] md:-right-[28px] md:w-[156px]
              md:h-[156px] w-[80px] h-[80px] top-[140px] right-0'
            style={{
              filter: 'blur(4.6px)'
            }}
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
          <img
            className='absolute rotate-[45deg] w-[100px] h-[100px] top-[200px] left-[-30px]
              md:top-[180px] md:-left-[73px] md:w-[245px] md:h-[245px]'
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
        </ImagesField>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[150px] md:pt-[220px]'>
            <Text className='mb-5 font-pressStart2P text-white text-[24px] md:text-[36px]'>
              CHECKOUT
            </Text>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <div
            className='flex flex-col gap-y-[10px] md:flex-row justify-between items-start
              md:items-center border-b border-co-gray-2 py-[32px] md:py-[64px]'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Customer Details
            </Text>
            <div
              className='flex flex-row border-gradient-desktop justify-between items-center p-[8px]
                pl-[12px] md:pl-[32px] md:pr-[24px] md:py-[20px] border rounded-[20px] w-full
                md:w-[582px]'
            >
              <span className='text-[12px] md:text-[18px] text-co-gray-7 bg-transparent'>
                {address ?? 'Wallet Address'}
              </span>
              {!isConnected ? (
                <Button
                  color='primary'
                  className='text-[12px] md:text-[16px] py-[10px] px-[20px] rounded-[35px] font-semibold'
                  onClick={handleConnectButtonClick}
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
                  {isCopied ? 'Copied' : 'Copy'}
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
            className='flex flex-col gap-y-[10px] md:flex-row md:items-center justify-between
              items-start py-[32px] md:py-[64px] border-b border-co-gray-2'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Select Item
            </Text>
            <div className='w-full md:w-fit grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[32px]'>
              {isLoadingProducts ? (
                <>
                  <SelectItemSkeleton />
                  <SelectItemSkeleton />
                  <SelectItemSkeleton />
                  <SelectItemSkeleton />
                </>
              ) : (
                products.map((item) => (
                  <ProductItem
                    key={item.type}
                    products={products}
                    product={item}
                    selectedProductType={selectedProductType}
                    onChangeProduct={setSelectedProductType}
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
            className='flex flex-row justify-between items-start py-[32px] md:py-[64px] border-b
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
                {selectedProduct
                  ? `${selectedProduct.quantity} x ${selectedProduct.priceInUsdt}`
                  : 0}
                &nbsp;USDT
              </Text>
              <Text
                className='text-[24px] md:text-[32px] font-semibold md:font-semibold text-white
                  leading-none text-right'
              >
                {selectedProduct
                  ? selectedProduct.priceInUsdt * selectedProduct.quantity
                  : 0}
                &nbsp;USDT
              </Text>
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <div className='hidden md:block absolute bottom-[100px] left-0 w-screen object-cover h-[1200px]'>
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
            className='hidden md:block absolute bottom-[120px] left-[-10px] w-[310px] h-[353px]'
            src='/images/checkout/checkout-float-2.png'
            alt='checkout-float-2'
          />
        </ImagesField>
        <Content>
          <div
            className='flex flex-col md:flex-row justify-between items-start md:items-center pt-[32px]
              md:pt-[64px] pb-[150px] md:pb-[300px] gap-y-[20px]'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              Payment
            </Text>
            <PaymentField
              isPaying={isPaying}
              selectedProduct={selectedProduct}
              onPayButtonClick={handlePayButtonClick}
            />
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default CheckoutPage
