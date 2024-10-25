import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react'
import { Address } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'

import NFT_ABI from '@abis/NFT.json'
import PAYMENT_ABI from '@abis/Payment.json'
import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import { CopyIcon } from '@components/Icon/CopyIcon'
import Layout from '@components/Layout/Layout'
import HoldingItem from '@components/MyAccount/HoldingItem'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { ModalType, useModal } from '@contexts/modal'
import {
  useActiveDelivery,
  useConfirmDelivery,
  useGetPayments,
  useGetUser,
  useGetUserHolding
} from '@services/api'
import { useStore } from '@store/store'
import { formatUSDT } from '@utils/currency'
import {
  formatAddress,
  processHoldings,
  statusClass,
  statusType
} from '@utils/myAccount'
import { convertTypeToName } from '@utils/payment'
import { tn } from '@utils/tn'
import dayjs from 'dayjs'

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const statusCommonClass =
  'w-[103px] h-[34px] rounded-[24px] flex items-center justify-center font-semibold capitalize text-sm border'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL

const MyAccount = () => {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [page, setPage] = useState(1)

  const setHoldings = useStore((state) => state.setHoldings)

  const { data: nftBalances, refetch: refetchNftBalances } = useReadContracts({
    contracts: [
      {
        address: process.env.NEXT_PUBLIC_PHONE_ADDRESS as Address,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: process.env.NEXT_PUBLIC_AI_AGENT_ONE_ADDRESS as Address,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: process.env.NEXT_PUBLIC_AI_AGENT_PRO_ADDRESS as Address,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: process.env.NEXT_PUBLIC_AI_AGENT_ULTRA_ADDRESS as Address,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: process.env.NEXT_PUBLIC_PAYMENT_ADDRESS as Address,
        abi: PAYMENT_ABI,
        functionName: 'getReferralRewards',
        args: [address]
      }
    ],
    query: {
      enabled: !!address
    }
  })

  const [
    phoneBalance,
    aiAgentOneBalance,
    aiAgentProBalance,
    aiAgentUltraBalance,
    referralRewards
  ] = nftBalances?.map((result) => result.result) ?? [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0)
  ]

  console.log(
    phoneBalance?.toString(),
    aiAgentOneBalance?.toString(),
    aiAgentProBalance?.toString(),
    aiAgentUltraBalance?.toString(),
    referralRewards?.toString()
  )

  const holdings = useMemo(() => {
    return {
      phone: phoneBalance?.toString(),
      mlpTokenAmount: 0,
      totalRewards: referralRewards?.toString(),
      availableRewards: referralRewards?.toString(),
      agent_one: aiAgentOneBalance?.toString(),
      agent_pro: aiAgentProBalance?.toString(),
      agent_ultra: aiAgentUltraBalance?.toString()
    }
  }, [
    phoneBalance,
    referralRewards,
    aiAgentOneBalance,
    aiAgentProBalance,
    aiAgentUltraBalance
  ])

  const [selectedOrderId, setSelectedOrderId] = useState('')

  const { data: userData } = useGetUser(address, { enabled: !!address })
  const { data, refetch: refetchOrders } = useGetPayments(
    address as Address,
    page,
    6,
    {
      enabled: !!address
    }
  )

  const { data: userHolding, refetch: refetchHoldings } = useGetUserHolding(
    address,
    {
      enabled: !!address
    }
  )

  useEffect(() => {
    setHoldings(userHolding || {})
  }, [userHolding, setHoldings])

  const { showModal, hideModal } = useModal()
  const { mutateAsync: activeDelivery } = useActiveDelivery()
  const { mutateAsync: confirmDelivery, isPending: isConfirmLoading } =
    useConfirmDelivery()

  const orders = useMemo(() => data?.data || [], [data])
  const totalPage = useMemo(
    () => Math.ceil((data?.total || 1) / (data?.pageSize || 1)),
    [data]
  )

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  const handleCopy = (text: string) => async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleOpenShippingModal = (paymentId: string) => () => {
    showModal(ModalType.MANAGE_ADDRESS_MODAL, {
      type: 'shipping',
      onConfirm: async (addressId) => {
        try {
          await activeDelivery({ paymentId, addressId })
          await refetchOrders()
          hideModal()
        } catch (e) {
          console.log(e)
          toast.error('Please try again')
        }
      }
    })
  }

  const handleConfirmDeliveryModal = (paymentId: string) => async () => {
    try {
      setSelectedOrderId(paymentId)
      await confirmDelivery({ paymentId })
      await refetchOrders()
    } catch (e) {
      console.log(e)
      toast.error('Confirm receipt failed, please try again')
    }
  }

  const handleOpenRewardsModal = () => {
    showModal(ModalType.REWARDS_MODAL, {
      onClaimSuccess: async () => {
        await refetchHoldings()
        await refetchNftBalances()
      }
    })
  }

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <TopSectionBackground />
        <Content className='pt-[150px] md:pt-[220px] md:pb-[97px]'>
          <Text className='text-center text-[24px] md:text-4xl font-pressStart2P leading-10'>
            MY ACCOUNT
          </Text>
        </Content>
      </Container>
      <Container>
        <Content>
          <Text
            className={`mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold
              ${gradientTextClass}`}
          >
            My Account
          </Text>
          <div
            className='grid grid-cols-1 md:grid-cols-2 gap-11 border-2 md:border-none rounded-[20px]
              border-referral-gradient p-8 md:p-0'
          >
            <div
              className={tn(`md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]
                ${gradientBorderClass}`)}
            >
              <Text
                className='mb-[11px] text-2xl font-semibold bg-clip-text text-transparent
                  bg-gradient-text-1 md:bg-white'
              >
                Referral Code
              </Text>
              <div
                className='bg-black pl-6 pr-4 rounded-2xl h-[60px] md:h-[72px] flex items-center
                  justify-between gap-[20px] md:gap-[62px]'
              >
                <div className='min-w-0 text-[18px] font-semibold truncate'>
                  {userData?.referralCode}
                </div>
                <Button
                  className='shrink-0 h-10 rounded-[35px] min-w-fit bg-transparent border-[#666] text-white
                    text-base font-semibold'
                  variant='bordered'
                  onClick={handleCopy(userData?.referralCode || '')}
                >
                  <span className='md:inline hidden'>Copy Code</span>
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <div
              className={tn(`md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]
                ${gradientBorderClass}`)}
            >
              <Text
                className='mb-[11px] text-2xl font-semibold bg-clip-text text-transparent
                  bg-gradient-text-1'
              >
                Referral Link
              </Text>
              <div
                className='bg-black pl-6 pr-4 rounded-[10px] md:rounded-2xl h-[60px] md:h-[72px] flex
                  items-center justify-between gap-[20px] md:gap-[62px]'
              >
                <div className='min-w-0 text-[18px] font-semibold truncate'>
                  {WEB_URL + '/referral?code=' + userData?.referralCode ?? ''}
                </div>
                <Button
                  className='shrink-0 rounded-[35px] min-w-fit h-10 bg-transparent border-[#666] text-white
                    text-base font-semibold'
                  variant='bordered'
                  onClick={handleCopy(
                    WEB_URL + '/referral?code=' + userData?.referralCode ?? ''
                  )}
                >
                  <span className='md:inline hidden'>Copy Link</span>
                  <CopyIcon />
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <Text
            className={`mb-6 mt-[32px] md:mt-[64px] text-[24px] text-center md:text-left md:text-5xl
              font-semibold ${gradientTextClass}`}
          >
            I own
          </Text>
          {processHoldings(holdings).map((group, index) => (
            <div
              key={index}
              className='grid mt-6 gap-6 grid-cols-1 md:grid-cols-3'
            >
              {group.map((item) => (
                <HoldingItem
                  OnClickItem={handleOpenRewardsModal}
                  group={index}
                  key={item.key}
                  item={item}
                />
              ))}
            </div>
          ))}
        </Content>
      </Container>
      <Container className='mb-[200px]'>
        <ImagesField>
          <img
            className='w-screen absolute -top-[120px] left-0'
            src='/images/product/product-content-mask.png'
            alt='product-content-mask'
          />
          <div
            className='absolute -right-[350px] top-[200px] w-[780.298px] h-[563px] rotate-[-44.461deg]
              flex-shrink-0 rounded-[780.298px] opacity-50 blur-[150px]
              bg-[radial-gradient(50%_50%_at_50%_50%,_#A2A2A2_0%,_rgba(162,162,162,0.50)_100%)]'
          />
        </ImagesField>

        <Content>
          <img
            className='hidden md:block absolute top-[140px] w-[156px] -right-[100px] -rotate-[20deg]'
            src='/images/product/product-dot.png'
            alt='dot'
          />
          <img
            className='hidden md:block rotate-[276deg] absolute top-[540px] -left-[68px] w-[156px]
              h-[156px] blur-[4.6px]'
            src='/images/product/product-dot.png'
            alt='dot'
          />
          <div className='mb-6 mt-[64px] flex justify-between items-center'>
            <Text
              className={`text-[24px] md:text-5xl font-semibold leading-tight ${gradientTextClass}`}
            >
              My Order
            </Text>
          </div>
          <Table
            aria-label='Example table with dynamic content'
            classNames={{
              wrapper:
                'rounded-[32px] border-2 border-[#666] bg-[#151515] backdrop-blur-[6px] p-[40px_48px]',
              th: 'bg-transparent text-white text-[18px] font-semibold',
              td: 'px-4 py-8 text-[18px] font-medium border-b border-[#666]'
            }}
            bottomContent={
              <div className='flex w-full justify-center'>
                <Pagination
                  variant='light'
                  showControls
                  page={page}
                  total={totalPage}
                  disableAnimation
                  classNames={{
                    cursor: 'bg-transparent',
                    item: 'text-base text-white !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
                    next: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
                    prev: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
                  }}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Item</TableColumn>
              <TableColumn>Receiver Address</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className='whitespace-nowrap'>
                    {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center w-[max-content]'>
                      <img
                        className='w-12 h-12 mr-3'
                        src={`/images/checkout/${order.type}.png`}
                        alt='ai-agent-nft-1'
                      />
                      <Text className='text-[18px] whitespace-nowrap w-fit'>
                        {convertTypeToName(order.type)} x {order.quantity}
                      </Text>
                    </div>
                  </TableCell>
                  <TableCell>{formatAddress(order.shippingAddress)}</TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {formatUSDT(Number(order.price) * order.quantity)}
                    &nbsp;USDT
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {statusType(order) === 'confirm' && (
                      <>
                        <Button
                          onClick={handleOpenShippingModal(order.id)}
                          className='text-[14px] p-2 hidden'
                        >
                          Submit Address
                        </Button>
                        <span
                          className={`${statusCommonClass} ${statusClass(order.status)}`}
                        >
                          {order?.status}
                        </span>
                      </>
                    )}

                    {statusType(order) === 'shipped' && (
                      <Button
                        isLoading={
                          isConfirmLoading && selectedOrderId === order.id
                        }
                        onClick={handleConfirmDeliveryModal(order.id)}
                        className='text-[14px] p-2'
                      >
                        Confirm Receipt
                      </Button>
                    )}

                    {statusType(order) === 'other' && (
                      <span
                        className={`${statusCommonClass} ${statusClass(order.status)}`}
                      >
                        {order?.status === 'received' ? (
                          <Tooltip content='Once your phone is ready to ship you will be asked to submit a shipping address.'>
                            {order?.status}
                          </Tooltip>
                        ) : (
                          order?.status
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Content>
      </Container>
    </Layout>
  )
}

export default MyAccount
