import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import { CopyIcon } from '@components/Icon/CopyIcon'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import {
  useActiveDelivery,
  useGetPayments,
  useGetUserHolding,
  useSaveAddress
} from '@services/api'
import { ApiHoldingsResponse, ApiSaveAddressParams } from '@type/api'
import { convertTypeToName } from '@utils/payment'
import { tn } from '@utils/tn'

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const holding_temp = [
  {
    title: 'WORLD PHONE',
    count: 0,
    icon: '/images/product/phone21.png',
    key: 'phone'
  },
  {
    title: 'WPN TOKEN',
    count: 0,
    icon: '/images/account/wpn-token.png',
    key: 'wpnTokenAmount'
  },
  {
    title: 'REWARDS',
    count: 0,
    icon: '/images/account/rewards-icon.png',
    key: 'availableRewards'
  },
  {
    title: 'AI AGENT ULTRA',
    count: 4,
    icon: '/images/product/ai_agent_ultra.png',
    key: 'agent_ultra'
  },
  {
    title: 'AI AGENT ONE',
    count: 0,
    icon: '/images/product/ai_agent_one.png',
    key: 'agent_one'
  },
  {
    title: 'AI AGENT PRO',
    count: 0,
    icon: '/images/product/ai_agent_pro.png',
    key: 'agent_pro'
  }
]

const processHoldings = (holdings: ApiHoldingsResponse = {}) => {
  return holding_temp.map((item) => ({
    ...item,
    count: Object.entries(holdings).find(([key]) => key === item.key)?.[1] || 0
  }))
}

const statusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'border-[#34D399] bg-[rgba(4,120,87,0.20)]'
    case 'paid':
      return 'border-[#FACC15] bg-[rgba(161,98,7,0.20)]'
    case 'shipped':
      return 'border-[#fff] bg-[#151515]'
    case 'unpaid':
      return 'border-[#00AEEF] bg-[rgba(0,174,239,0.20)]'
    default:
      return ''
  }
}

const statusCommonClass =
  'w-[103px] h-[34px] rounded-[24px] flex items-center justify-center font-semibold capitalize text-sm border'

const MyAccount = () => {
  const { user } = useAuth()
  const [page, setPage] = useState(1)

  const { data, refetch: refetchOrders } = useGetPayments(page)
  const { data: holdings } = useGetUserHolding()
  const { showModal, hideModal } = useModal()
  const { mutateAsync: save } = useSaveAddress()
  const { mutateAsync: activeDelivery } = useActiveDelivery()

  const orders = useMemo(() => data?.data || [], [data])

  const handleCopy = (text: string) => async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleOpenShippingModal = () => {
    showModal(ModalType.SHIPPING_ADDRESS_MODAL, {
      onSubmit: async (formData: ApiSaveAddressParams) => {
        try {
          const res = await save(formData)
          await activeDelivery({ id: res.id })
          await refetchOrders()
          hideModal()
        } catch (e) {
          console.log(e)
          toast.error('Please try again')
        }
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
                  {user?.referralCode}
                </div>
                <Button
                  className='shrink-0 h-10 rounded-[35px] min-w-fit bg-transparent border-[#666] text-white
                    text-base font-semibold'
                  variant='bordered'
                  onClick={handleCopy(user?.referralCode || '')}
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
                  {`https://invite.worldphone.io/${user?.referralCode}`}
                </div>
                <Button
                  className='shrink-0 rounded-[35px] min-w-fit h-10 bg-transparent border-[#666] text-white
                    text-base font-semibold'
                  variant='bordered'
                  onClick={handleCopy(
                    user?.referralCode
                      ? `https://invite.worldphone.io/${user.referralCode}`
                      : ''
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
          <div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-6'>
            {processHoldings(holdings).map((item) => (
              <div
                key={item.title}
                className={`px-8 py-6 border-2 rounded-[20px] flex flex-row justify-between items-center
                  ${gradientBorderClass}`}
              >
                <div className='flex flex-col md:flex-row items-center md:justify-between w-full gap-x-4 gap-y-2'>
                  <img
                    src={item.icon}
                    alt={item.title}
                    className='h-[77px] md:h-[86px]'
                  />
                  <div className='flex flex-col-reverse md:flex-col items-center md:items-end'>
                    <Text className='text-[14px] md:text-[20px] text-gray-a5 font-semibold whitespace-nowrap'>
                      {item.title}
                    </Text>
                    <Text
                      className={clsx(
                        'font-semibold mt-1 grow !leading-[32px] md:!leading-[72px]',
                        String(item.count).length > 5
                          ? 'text-[16px] md:text-[20px]'
                          : 'text-[24px] md:text-[48px]'
                      )}
                    >
                      {item.count}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <Button className='rounded-[32px] h-12 text-black text-base font-semibold bg-white'>
              My delivery status
            </Button>
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
                  total={data?.total || 0}
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
              {/* <TableColumn>Receiver Address</TableColumn> */}
              <TableColumn>Total</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className='whitespace-nowrap'>
                    {order.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center w-[max-content]'>
                      <img
                        className='w-12 h-12 mr-3'
                        src={`/images/checkout/${order.type}.png`}
                        alt='ai-agent-nft-1'
                      />
                      <Text className='text-[18px] whitespace-nowrap w-fit'>
                        {convertTypeToName(order.type)}
                      </Text>
                    </div>
                  </TableCell>
                  {/* <TableCell>{order.name}</TableCell> */}
                  <TableCell className='whitespace-nowrap'>
                    {(
                      (Number(order.price) / 1000000) *
                      order.quantity
                    ).toLocaleString()}
                    &nbsp;USDT
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {order.type === 'phone' && order.status === 'paid' ? (
                      <Button
                        onClick={handleOpenShippingModal}
                        className='text-[14px] p-2'
                      >
                        Submit Address
                      </Button>
                    ) : (
                      <span
                        className={`${statusCommonClass} ${statusClass(order.status)}`}
                      >
                        {order?.status}
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
