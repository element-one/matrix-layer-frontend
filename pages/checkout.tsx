import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Address } from 'viem'
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
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
import { useGetIsInWhitelist, useGetSignature, useGetUser } from '@services/api'
import { useGetProducts } from '@services/api/account'
import { formatUSDT } from '@utils/currency'
import { convertTypeToInt, convertTypeToName } from '@utils/payment'
import BigNumber from 'bignumber.js'
import { serializeError } from 'eth-rpc-errors'

const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS
const IS_PRIVATE = process.env.NEXT_PUBLIC_IS_PRIVATE === 'true'
const TARGET_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

const CheckoutPage = () => {
  const t = useTranslations('Checkout')
  const { isConnected, address } = useAccount()
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()
  const { showModal } = useModal()

  const { query } = useRouter()

  const [isCopied, setIsCopied] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])

  const { data: userData, refetch: refetchUser } = useGetUser(address, {
    enabled: !!address
  })
  const { data: allProducts = [], isLoading: isLoadingProducts } =
    useGetProducts()
  const { data: whitelistData } = useGetIsInWhitelist(address, {
    enabled: !!address && IS_PRIVATE
  })

  const [successModalHasShown, setSuccessModalHasShown] = useState(false)
  const [isAblePay, setIsAblePay] = useState(true)

  const { selectedProducts, amount, amountInUSDT } = useMemo(() => {
    const selectedProducts = products.filter((p) => p.quantity)
    return {
      selectedProducts,
      amountInUSDT: selectedProducts.reduce(
        (sum, product) => sum + Number(product.priceInUsdt) * product.quantity,
        0
      ),
      amount: selectedProducts.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity,
        0
      )
    }
  }, [products])

  const { refetch: getSignature } = useGetSignature(
    address as Address,
    amount,
    {
      enabled: false
    }
  )

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

  console.log(accountBalance)

  useEffect(() => {
    if (allProducts.length) {
      setProducts(() =>
        allProducts
          .map((item) => ({
            name: convertTypeToName(item.type),
            price: item.price,
            priceInUsdt: Number(formatUSDT(item.price)),
            type: item.type,
            quantity: query.type === item.type ? 1 : 0
          }))
          .filter((v) => v.name)
      )
    }
  }, [allProducts, query])

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

  const handlePayButtonClick = useCallback(async () => {
    if (!isConnected || !address) {
      toast.info('Please connect your wallet first')
      return
    }

    if (!selectedProducts.length) return

    if (IS_PRIVATE && !whitelistData?.isWhitelisted) {
      toast.info('You are not in the whitelist')
      return
    }

    console.log('existing chainId: ', chainId, TARGET_CHAIN_ID)
    if (chainId !== Number(TARGET_CHAIN_ID)) {
      console.log('going to switch chain')
      try {
        switchChain({
          chainId: Number(TARGET_CHAIN_ID)
        })
      } catch (err) {
        console.log(err)
      }
      return
    }

    if (accountBalance && Number(accountBalance) >= amount) {
      setIsAblePay(true)

      approveContract(
        {
          abi: USDT_ABI,
          address: USDT_ADDRESS as Address,
          functionName: 'approve',
          args: [PAYMENT_ADDRESS, BigNumber(amount).toFixed(0)]
        },
        {
          onSuccess() {
            console.log('approve success paid: ', BigNumber(amount).toFixed(0))
            refetchAccount()
          },
          onError(err: Error) {
            const serializedError = serializeError(err)
            console.log({ serializedError })
            toast.error(
              (serializedError?.data as any)?.originalError?.shortMessage
            )
          }
        }
      )
    } else {
      toast.info('your account balance is not enough to pay')
    }
  }, [
    isConnected,
    address,
    selectedProducts.length,
    whitelistData?.isWhitelisted,
    chainId,
    accountBalance,
    amount,
    switchChain,
    approveContract,
    refetchAccount
  ])

  const handlePay = useCallback(async () => {
    console.log('existing chainId: ', chainId, TARGET_CHAIN_ID)
    if (chainId !== Number(TARGET_CHAIN_ID)) {
      switchChain({
        chainId: Number(TARGET_CHAIN_ID)
      })
      return
    }

    if (!selectedProducts.length || !amount) return

    const { data } = await getSignature()

    const signature = data?.signature || ''
    const isWhitelisted = data?.payload.isWhitelisted || false
    const directPercentage = data?.payload.directPercentage ?? 0
    const levelReferrals = data?.payload.levelReferrals ?? []
    const levelPercentages = data?.payload.levelPercentages ?? []

    const directReferral =
      userData?.referredByUserAddress ||
      '0x0000000000000000000000000000000000000000'

    if (!signature) return

    const orders = selectedProducts.map((product) => ({
      deviceType: convertTypeToInt(product.type),
      quantity: product.quantity
    }))

    console.log('orders: ', orders)

    const functionName = IS_PRIVATE ? 'payPrivateSale' : 'payPublicSale'

    console.log('going to pay: ', BigNumber(amount).toFixed(0))
    payContract(
      {
        abi: PAYMENT_ABI,
        functionName,
        args: [
          BigNumber(amount).toFixed(0),
          orders,
          directReferral,
          directPercentage,
          levelReferrals,
          levelPercentages,
          isWhitelisted,
          signature
        ],
        address: PAYMENT_ADDRESS as Address
      },
      {
        onSuccess() {
          console.log('pay contract success')
        },
        onError(err) {
          const serializedError = serializeError(err)
          console.log({ serializedError })
          toast.error(
            (serializedError?.data as any)?.originalError?.shortMessage
          )
        }
      }
    )
  }, [
    chainId,
    selectedProducts,
    amount,
    getSignature,
    userData?.referredByUserAddress,
    payContract,
    switchChain
  ])

  useEffect(() => {
    if (approveData && isAblePay) {
      handlePay()
      setIsAblePay(false)
    }
  }, [approveData, handlePay, isAblePay])

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
              {t('checkout')}
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
              {t('customerDetails')}
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
                  {t('connectWallet')}
                </Button>
              ) : (
                <Button
                  color='primary'
                  className='text-[12px] md:text-[16px] hidden md:block py-[10px] px-[20px] rounded-[35px]
                    font-semibold'
                  onClick={handleCopy}
                >
                  {isCopied ? t('copied') : t('copy')}
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
            className='flex flex-col gap-y-[10px] xl:flex-row xl:items-center justify-between
              items-start py-[32px] xl:py-[64px] border-b border-co-gray-2'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              {t('selectItem')}
            </Text>
            <div className='w-full md:w-fit grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[32px]'>
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
              {t('subtotal')}
            </Text>
            <div>
              <div>
                {selectedProducts.map((product) => (
                  <Text
                    key={product.type}
                    className='text-[16px] md:text-[20px] text-gray-78 mb-[12px] font-normal md:font-medium
                      md:mb-[24px] leading-none text-right'
                  >
                    {product.name} {product.quantity} x {product.priceInUsdt}
                    &nbsp;USDT
                  </Text>
                ))}
              </div>
              <Text
                className='text-[24px] md:text-[32px] font-semibold md:font-semibold text-white
                  leading-none text-right'
              >
                {amountInUSDT}
                &nbsp;USDT
              </Text>
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <div className='hidden lg:block absolute bottom-[100px] left-0 w-screen object-cover h-[1200px]'>
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
            className='flex flex-col lg:flex-row justify-between items-start lg:items-center pt-[32px]
              md:pt-[64px] pb-[150px] md:pb-[300px] gap-y-[20px]'
          >
            <Text className='text-[20px] font-semibold text-co-gray-7'>
              {t('payment')}
            </Text>
            <PaymentField
              isPaying={isPaying}
              amount={amountInUSDT}
              onPayButtonClick={handlePayButtonClick}
              userInfo={userData}
              onVerifyReferralCodeSuccess={refetchUser}
            />
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default CheckoutPage
