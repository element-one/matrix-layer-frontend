import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import { CopyIcon } from '@components/Icon/CopyIcon'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { tn } from '@utils/tn'

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const items = [
  { title: 'WORLD PHONE', count: 2, icon: '/images/product/phone21.png' },
  { title: 'WPN TOKEN', count: 1200, icon: '/images/account/wpn-token.png' },
  { title: 'REWARDS', count: 3200, icon: '/images/account/rewards-icon.png' },
  {
    title: 'AI AGENT ULTRA',
    count: 4,
    icon: '/images/product/ai_agent_ultra.png'
  },
  { title: 'AI AGENT ONE', count: 4, icon: '/images/product/ai_agent_one.png' },
  { title: 'AI AGENT PRO', count: 3, icon: '/images/product/ai_agent_pro.png' }
]

const orders = [
  {
    date: '2023-09-09 12:00:18',
    item: 'AI AGENT ULTRA',
    address: '123 Queens Blvd, Apt 4, Forest Hills, NY',
    total: '1,100 USDT',
    status: 'Completed'
  },
  {
    date: '2023-09-09 12:00:18',
    item: 'WORLD PHONE',
    address: '123 Queens Blvd, Apt 4, Forest Hills, NY',
    total: '1,100 USDT',
    status: 'Paid'
  },
  {
    date: '2023-09-09 12:00:18',
    item: 'AI AGENT ONE',
    address: '123 Queens Blvd, Apt 4, Forest Hills, NY',
    total: '1,100 USDT',
    status: 'Shipped'
  },
  {
    date: '2023-09-09 12:00:18',
    item: 'AI AGENT ULTRA',
    address: '123 Queens Blvd, Apt 4, Forest Hills, NY',
    total: '1,100 USDT',
    status: 'Unpaid'
  },
  {
    date: '2023-09-09 12:00:18',
    item: 'AI AGENT PRO',
    address: '123 Queens Blvd, Apt 4, Forest Hills, NY',
    total: '1,100 USDT',
    status: 'Completed'
  }
]

const statusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-[#34D399] bg-[rgba(4,120,87,0.20)]'
    case 'Paid':
      return 'border-[#FACC15] bg-[rgba(161,98,7,0.20)]'
    case 'Shipped':
      return 'border-[#fff] bg-[#151515]'
    case 'Unpaid':
      return 'border-[#00AEEF] bg-[rgba(0,174,239,0.20)]'
    default:
      return ''
  }
}

const MyAccount = () => {
  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <TopSectionBackground />
        <Content className='pt-[295px] pb-[97px]'>
          <Text className='text-center text-4xl font-pressStart2P leading-10'>
            MY ACCOUNT
          </Text>
        </Content>
      </Container>
      <Container>
        <Content>
          <Text
            className={`mb-6 pt-[78px] text-5xl font-bold ${gradientTextClass}`}
          >
            My Account
          </Text>
          <div className='grid grid-cols-2 gap-11'>
            {[
              {
                title: 'Referral Code',
                content: '0x8j...97jD40',
                copyText: 'Copy Code'
              },
              {
                title: 'Referral Link',
                content: 'https://invite.worldphone.io/12345User...',
                copyText: 'Copy Link'
              }
            ].map((item) => (
              <div
                key={item.title}
                className={tn(`p-8 border-2 rounded-[20px] backdrop-filter backdrop-blur-[10px]
                  ${gradientBorderClass}`)}
              >
                <Text className='mb-[11px] text-2xl font-bold'>
                  {item.title}
                </Text>
                <div
                  className='bg-black pl-6 pr-4 rounded-2xl h-[72px] flex items-center justify-between
                    gap-[62px]'
                >
                  <div className='min-w-0 text-[18px] font-bold truncate'>
                    {item.content}
                  </div>
                  <Button
                    className='shrink-0 h-10 bg-transparent border-[#666] text-white text-base font-semibold'
                    variant='bordered'
                  >
                    {item.copyText}
                    <CopyIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <Text
            className={`mb-6 mt-[64px] text-5xl font-bold ${gradientTextClass}`}
          >
            I own
          </Text>
          <div className='mt-6 grid grid-cols-3 gap-6'>
            {items.map((item) => (
              <div
                key={item.title}
                className={`px-8 py-6 border-2 rounded-[20px] ${gradientBorderClass}`}
              >
                <div className='flex items-center justify-between'>
                  <img
                    src={item.icon}
                    alt={item.title}
                    className='h-[86px] mr-4'
                  />
                  <div className='flex flex-col items-end'>
                    <Text className='text-[20px] text-gray-a5 font-bold'>
                      {item.title}
                    </Text>
                    <Text className='text-5xl font-bold mt-2'>
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
            className='absolute top-[140px] w-[156px] -right-[100px] -rotate-[20deg]'
            src='/images/product/product-dot.png'
            alt='dot'
          />
          <img
            className='rotate-[276deg] absolute top-[540px] -left-[68px] w-[156px] h-[156px]
              blur-[4.6px]'
            src='/images/product/product-dot.png'
            alt='dot'
          />
          <div className='mb-6 mt-[64px] flex justify-between items-center'>
            <Text
              className={`text-5xl font-bold leading-tight ${gradientTextClass}`}
            >
              My Order
            </Text>
            <Button className='h-12 text-black text-base font-bold bg-white'>
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
                  page={1}
                  total={orders.length}
                  disableAnimation
                  classNames={{
                    cursor: 'bg-transparent',
                    item: 'text-base text-white !bg-transparent data-[active=true]:text-[rgba(102,102,102,1)] [&[data-hover=true]:not([data-active=true])]:bg-transparent',
                    next: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]',
                    prev: 'text-white !bg-transparent data-[disabled=true]:text-[rgba(102,102,102,1)]'
                  }}
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
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <img
                        className='w-12 h-12 mr-3'
                        src='/images/svg/rectangle-sm.svg'
                        alt='ai-agent-nft-1'
                      />
                      {order.item}
                    </div>
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`w-[103px] h-[34px] rounded-[24px] flex items-center justify-center font-bold
                        text-sm border ${statusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
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
