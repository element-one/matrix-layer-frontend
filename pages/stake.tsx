import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@nextui-org/react'
import clsx from 'clsx'
import { Address } from 'viem'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'

import NFT_ABI from '@abis/NFT.json'
import PAYMENT_ABI from '@abis/Payment.json'
import STAKE_ABI from '@abis/Stake.json'
import { Button } from '@components/Button'
import { Container, Content } from '@components/Home/Container'
import { CheckCircleIcon } from '@components/Icon/CheckCircleIcon'
import { CopyIcon } from '@components/Icon/CopyIcon'
import { InfoIcon } from '@components/Icon/InfoIcon'
import { LockIcon } from '@components/Icon/LockIcon'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { useGetUser } from '@services/api'

const GradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const GradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL
const STAKE_ADDRESS = process.env.NEXT_PUBLIC_STAKE_ADDRESS as Address
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS as Address
const AI_AGENT_PRO_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_PRO_ADDRESS as Address
const AI_AGENT_ONE_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ONE_ADDRESS as Address
const AI_AGENT_ULTRA_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ULTRA_ADDRESS as Address
const PHONE_ADDRESS = process.env.NEXT_PUBLIC_PHONE_ADDRESS as Address

const Stakes = [
  {
    name: 'Matrix NFT',
    id: '#1221312',
    img: '/images/stake/matrix.png'
  },
  {
    name: 'AI Agent Pro',
    id: '#1221312',
    img: '/images/stake/ai-agent-pro.png'
  },
  {
    name: 'AI Agent One',
    id: '#1221312',
    img: '/images/stake/ai-agent-pro-02.png'
  },
  {
    name: 'AI Agent Ultra',
    id: '#1221312',
    img: '/images/stake/ai-agent-pro-03.png'
  }
]

const UnStakes: any[] = []

const StakePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<'stake' | 'unstake'>('stake')
  const { address } = useAccount()
  const { data: userData } = useGetUser(address, { enabled: !!address })
  const router = useRouter()

  const handleCopy = (text: string) => async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const { data: totalNfts } = useReadContracts({
    contracts: [
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'totalStakedNFTs',
        args: [0]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'totalStakedNFTs',
        args: [1]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'totalStakedNFTs',
        args: [2]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'totalStakedNFTs',
        args: [3]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'totalStakedNFTs',
        args: [4]
      }
    ],
    query: {
      enabled: !!address
    }
  })

  console.log(totalNfts)

  const { data: userAllStakedNFTs } = useReadContract({
    abi: STAKE_ABI,
    address: STAKE_ADDRESS,
    functionName: 'getUserAllStakedNFTs',
    args: [address]
  })

  console.log(userAllStakedNFTs)

  const { data: nftBalances } = useReadContracts({
    contracts: [
      {
        address: PHONE_ADDRESS,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: AI_AGENT_ONE_ADDRESS,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: AI_AGENT_PRO_ADDRESS,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: AI_AGENT_ULTRA_ADDRESS,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        address: PAYMENT_ADDRESS,
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
  ] = nftBalances?.map((result) => result.result?.toString()) ?? [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0)
  ]

  console.log(nftBalances)

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container
        className='overflow-visible pb-[38px] border-b-0 sm:border-b
          border-[rgba(102,102,102,0.40)]'
      >
        <TopSectionBackground />
        <Content>
          <div className='flex flex-col items-center justify-center pt-[122px] sm:pt-[320px]'>
            <Text className='mb-[17px] sm:mb-5 font-pressStart2P text-white text-2xl'>
              STAKE
            </Text>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <Text
            className={clsx(
              'mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold',
              GradientTextClass
            )}
          >
            My Account
          </Text>
          <div
            className='grid grid-cols-1 md:grid-cols-2 gap-11 border-2 md:border-none rounded-[20px]
              border-referral-gradient p-8 md:p-0'
          >
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <Text
                className='mb-[11px] text-2xl font-semibold bg-clip-text text-transparent
                  bg-gradient-text-1 md:bg-white'
              >
                Referral Code
              </Text>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[60px] md:h-[72px] flex items-center
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
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] flex flex-col justify-center gap-4
                  md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <Text className='text-2xl font-semibold bg-clip-text text-transparent bg-gradient-text-1'>
                Invitation System
              </Text>
              <div className='flex justify-between w-full font-bold'>
                <span className='text-[20px]'>Referral Link</span>
                <div className='text-[18px] text-gray-a5 flex gap-2'>
                  {WEB_URL + '/referral?code=' + userData?.referralCode}
                  <CheckCircleIcon />
                </div>
              </div>
              <div className='flex justify-between w-full font-bold'>
                <span className='text-[20px]'>
                  Your Referrer&apos;s Wallet Address
                </span>
                <div className='text-[18px] text-gray-a5'>
                  {userData?.referredByUserAddress || '--'}
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <Container>
        <Content>
          <Text
            className={clsx(
              'mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold',
              GradientTextClass
            )}
          >
            My NFT Inventory
          </Text>
          <div
            className='grid grid-cols-1 md:grid-cols-2 gap-8 border-2 md:border-none rounded-[20px]
              border-referral-gradient p-8 md:p-0'
          >
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img src='/images/stake/ai-agent-pro.png' alt='' />
                  <span className='uppercase text-[20px] font-bold text-gray-a5'>
                    Matrix Phone
                  </span>
                </div>
                <div className='text-[48px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>{phoneBalance}</div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  Stake
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
            </div>
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img src='/images/stake/matrix.png' alt='' />
                  <span className='uppercase text-[20px] font-bold text-gray-a5'>
                    Matrix
                  </span>
                </div>
                <div className='text-[48px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  Stake
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
            </div>
          </div>
          <div
            className='grid grid-cols-1 mt-8 md:grid-cols-3 gap-8 border-2 md:border-none
              rounded-[20px] border-referral-gradient p-8 md:p-0'
          >
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img src='/images/stake/ai-agent-pro.png' alt='' />
                  <span className='uppercase text-[20px] font-bold text-gray-a5'>
                    AI Agent One
                  </span>
                </div>
                <div className='text-[48px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>{aiAgentOneBalance}</div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  Stake
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
            </div>
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img src='/images/stake/ai-agent-pro-02.png' alt='' />
                  <span className='uppercase text-[20px] font-bold text-gray-a5'>
                    AI Agent Pro
                  </span>
                </div>
                <div className='text-[48px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>{aiAgentProBalance}</div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  Stake
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
            </div>
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img src='/images/stake/ai-agent-pro-03.png' alt='' />
                  <span className='uppercase text-[20px] font-bold text-gray-a5'>
                    AI Agent Ultra
                  </span>
                </div>
                <div className='text-[48px] font-bold'>{1}</div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentUltraBalance}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  Stake
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>{1}</div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] items-center flex justify-between gap-4
                md:backdrop-filter md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex items-center gap-10'>
              <img src='/images/stake/usdt.png' alt='usdt' />
              <div className='flex flex-col text-gray-a5 text-[20px] uppercase'>
                <span>USDT</span>
                <span>Node Rewards</span>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-1'>
                <span className='text-[48px] font-bold'>
                  {referralRewards ? referralRewards.toString() : '--'}
                </span>
                <span className='text-[20px] text-gray-a5'>USDT</span>
              </div>
              <Button className='rounded-full h-8 w-[152px] text-base font-semibold z-10'>
                CLAIM
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] items-center flex justify-between gap-4
                md:backdrop-filter md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex items-center gap-10'>
              <img src='/images/stake/mlp.png' alt='mlp' />
              <div className='flex flex-col text-gray-a5 text-[20px] uppercase'>
                <span>MLP</span>
                <span>CLAIMABLE</span>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-1'>
                <span className='text-[48px] font-bold'>123,456.89</span>
                <span className='text-[20px] text-gray-a5'>USDT</span>
              </div>
              <Button className='rounded-full h-8 w-[152px] text-base font-semibold z-10'>
                CLAIM
              </Button>
            </div>
          </div>
        </Content>
      </Container>

      <Container>
        <Content>
          <Text
            className={clsx(
              'mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold',
              GradientTextClass
            )}
          >
            MLP&apos;s Hashrate Information
          </Text>
          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px] flex items-center justify-center flex-col gap-6`,
              GradientBorderClass
            )}
          >
            <div className='flex items-center justify-center gap-4'>
              <LockIcon width={36} height={36} color='#FFFFFF' />
              <div className='text-[48px] font-bold'>
                Stake your{' '}
                <span className={clsx('', GradientTextClass)}>NFT</span> to
                unlock this pool
              </div>
            </div>
            <Button
              onClick={() => router.push('/presale?tab=nft')}
              className='rounded-full w-[60%] text-[16px] h-[48px]'
            >
              BUY NFT
            </Button>
          </div>
          <div
            className='grid mt-8 grid-cols-1 md:grid-cols-2 gap-8 border-2 md:border-none
              rounded-[20px] border-referral-gradient p-8 md:p-0'
          >
            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex justify-between items-center'>
                <span className='text-gray-a5'>Total NFT</span>
                <span className='text-[48px] font-bold'>4</span>
              </div>
              <div className='flex items-center justify-center gap-4 mt-2'>
                <div
                  className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                    text-gray-a5'
                >
                  <div className='text-center'>Matrix Phone</div>
                  <span>1</span>
                </div>
                <div
                  className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                    text-gray-a5'
                >
                  <div className='text-center'>Matrix NFT</div>
                  <span>1</span>
                </div>
                <div
                  className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                    text-gray-a5'
                >
                  <div className='text-center'>AI Agent One</div>
                  <span>1</span>
                </div>
                <div
                  className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                    text-gray-a5'
                >
                  <div className='text-center'>AI Agent Pro</div>
                  <span>1</span>
                </div>
                <div
                  className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                    text-gray-a5'
                >
                  <div className='text-center'>AI Agent Ultra</div>
                  <span>1</span>
                </div>
              </div>
            </div>

            <div
              className={clsx(
                `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex justify-between items-center'>
                <span className='text-gray-a5'>Daily MLP Distribution</span>
                <span className='text-[48px] font-bold'>1,106.9032</span>
              </div>
              <div
                className='bg-black h-[96px] mt-2 rounded-md flex items-center justify-center text-[18px]
                  flex-col px-4 py-2 text-gray-a5'
              >
                <div className='text-center'>Staking</div>
                <span className='text-white'>1,105.9032</span>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              `py-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex'>
              <div
                className={clsx(
                  `flex-1 flex items-center justify-center flex-col font-bold text-center
                  cursor-pointer`,
                  currentTab === 'stake' && GradientTextClass
                )}
                onClick={() => setCurrentTab('stake')}
              >
                STAKE
                <div
                  className={clsx(
                    'h-[1px] w-full mt-6',
                    currentTab === 'stake' ? 'bg-gradient-button-1' : ''
                  )}
                ></div>
              </div>
              <div
                className={clsx(
                  `flex-1 flex items-center justify-center flex-col font-bold text-center
                  cursor-pointer`,
                  currentTab === 'unstake' && GradientTextClass
                )}
                onClick={() => setCurrentTab('unstake')}
              >
                UNSTAKE
                <div
                  className={clsx(
                    'h-[1px] w-full mt-6',
                    currentTab === 'unstake' ? 'bg-gradient-button-1' : ''
                  )}
                ></div>
              </div>
            </div>

            <div
              className='border-1 mx-8 my-6 border-gray-500 rounded-xl border-opacity-50 grid grid-cols-2
                gap-y-4 gap-x-4 p-8 max-h-[437px] overflow-y-auto transparent-scrollbar'
            >
              {currentTab === 'stake' &&
                Stakes.map((stake) => {
                  return (
                    <div
                      key={stake.name}
                      className='flex justify-between items-center pr-4'
                    >
                      <div className='flex items-center gap-4'>
                        <img
                          src={stake.img}
                          alt='matrix'
                          className='w-[87px] h-[80px]'
                        />
                        <div className='flex flex-col'>
                          <span className='text-[32px] font-bold'>
                            {stake.name}
                          </span>
                          <span className='text-gray-a5 text-[24px]'>
                            {stake.id}
                          </span>
                        </div>
                      </div>
                      <Button className='bg-white rounded-full text-[16px] h-[40px] w-[128px]'>
                        STAKE
                      </Button>
                    </div>
                  )
                })}
              {currentTab === 'unstake' &&
                UnStakes.map((stake) => {
                  return (
                    <div
                      key={stake.name}
                      className='flex justify-between items-center pr-4'
                    >
                      <div className='flex items-center gap-4'>
                        <img
                          src={stake.img}
                          alt='matrix'
                          className='w-[87px] h-[80px]'
                        />
                        <div className='flex flex-col'>
                          <span className='text-[32px] font-bold'>
                            {stake.name}
                          </span>
                          <span className='text-gray-a5 text-[24px]'>
                            {stake.id}
                          </span>
                        </div>
                      </div>
                      <Button className='bg-white rounded-full text-[16px] h-[40px] w-[128px]'>
                        STAKE
                      </Button>
                    </div>
                  )
                })}
            </div>
          </div>

          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold flex items-center gap-2',
                  GradientTextClass
                )}
              >
                Basic Pool (PoW)
                <Tooltip color='default' content='Basic Pool (PoW)'>
                  <span>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              <div
                className={clsx(
                  'flex items-center rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                  GradientBorderClass
                )}
              >
                <span className='text-gray-a5'>$MLP Amount</span>
                <span>19,687.89</span>
              </div>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='flex-1'></div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex justify-between'>
              <Text
                className={clsx(
                  'text-[28px] flex gap-2 items-center text-center font-bold',
                  GradientTextClass
                )}
              >
                Acceleration Pool (PoS)
                <Tooltip color='default' content='Basic Pool (PoW)'>
                  <span>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              <div className='flex gap-10 items-center'>
                <span className='text-[28px] font-bold'>$2,345.89 USDT</span>
                <div
                  className={clsx(
                    'flex rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                    GradientBorderClass
                  )}
                >
                  <span className='text-gray-a5'>$MLP Amount</span>
                  <span>19,687.89</span>
                </div>
              </div>
            </div>
            <div className='w-full mt-20 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                NFT Boosted Pool
              </Text>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Holding NFT
                </span>
                <div className='text-[18px] font-bold'>12</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>

            <div className='h-[1px] bg-gray-500 w-full mt-7'></div>

            <div className='w-full mt-7 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                MLP Boosted Pool
              </Text>
              <Button className='rounded-full text-[12px] h-8 w-[152px]'>
                Accelerate
              </Button>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='flex-1'></div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex justify-between'>
              <Text
                className={clsx(
                  'text-[28px] flex gap-2 items-center text-center font-bold',
                  GradientTextClass
                )}
              >
                Promotion Pool
                <Tooltip color='default' content='Basic Pool (PoW)'>
                  <span>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              <div
                className={clsx(
                  'flex items-center rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                  GradientBorderClass
                )}
              >
                <span className='text-gray-a5'>$MLP Amount</span>
                <span>19,687.89</span>
              </div>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Holding NFT
                </span>
                <div className='text-[18px] font-bold'>12</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              `md:p-8 md:border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                Pool Balance
              </Text>
              <div className='flex gap-10 items-center'>
                <span className='text-[28px] font-bold'>$2,345.89 USDT</span>
                <div
                  className={clsx(
                    'flex rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                    GradientBorderClass
                  )}
                >
                  <span className='text-gray-a5'>$MLP Amount</span>
                  <span>19,687.89</span>
                </div>
              </div>
            </div>
            <div className='w-full mt-20 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                NFT Boosted Pool
              </Text>
              <Button className='rounded-full text-[12px] h-8 w-[152px]'>
                Accelerate
              </Button>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Holding NFT
                </span>
                <div className='text-[18px] font-bold'>12</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>

            <div className='h-[1px] bg-gray-500 w-full mt-7'></div>

            <div className='w-full mt-7 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                MLP Boosted Pool
              </Text>
              <Button className='rounded-full text-[12px] h-8 w-[152px]'>
                Accelerate
              </Button>
            </div>
            <div className='flex items-center justify-around gap-8 mt-4'>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div className='flex-1'></div>
              <div className='bg-black flex-1 rounded-xl flex flex-col items-center justify-center px-8 py-4'>
                <span className='text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <div className='h-[160px] w-full'></div>
    </Layout>
  )
}

export default StakePage
