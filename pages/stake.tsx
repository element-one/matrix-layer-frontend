import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { NextPage } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Address } from 'viem'
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSignMessage,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import NFT_ABI from '@abis/NFT.json'
import PAYMENT_ABI from '@abis/Payment.json'
import STAKE_ABI from '@abis/Stake.json'
import { Button } from '@components/Button'
import { Container, Content } from '@components/Home/Container'
import { CopyIcon } from '@components/Icon/CopyIcon'
import { InfoColorIcon } from '@components/Icon/InfoColorIcon'
import { InfoIcon } from '@components/Icon/InfoIcon'
import { LockIcon } from '@components/Icon/LockIcon'
import { Input } from '@components/Input'
import Layout from '@components/Layout/Layout'
import { RewardsHistoryModal } from '@components/Modal/RewardsHistoryModal'
import {
  StakeConfirmModal,
  StakeTypeEnum
} from '@components/Modal/StakeConfirmModal'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { ModalType, useModal } from '@contexts/modal'
import {
  getStakingSignature,
  useGetUser,
  useGetUserRewardsSummary,
  usePatchReferralCode
} from '@services/api'
import { formatCurrency, formatUSDT } from '@utils/currency'
import { statusClass } from '@utils/stake'
import { serializeError } from 'eth-rpc-errors'

const GradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const GradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL
const STAKE_ADDRESS = process.env.NEXT_PUBLIC_STAKE_ADDRESS as Address
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS as Address
const MATRIX_ADDRESS = process.env.NEXT_PUBLIC_MATRIX_ADDRESS as Address
const AI_AGENT_PRO_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_PRO_ADDRESS as Address
const AI_AGENT_ONE_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ONE_ADDRESS as Address
const AI_AGENT_ULTRA_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ULTRA_ADDRESS as Address
const PHONE_ADDRESS = process.env.NEXT_PUBLIC_PHONE_ADDRESS as Address

interface StakeToken {
  id: number
  name: string
  img: string
}

const mock_details = [
  {
    id: 0,
    date: '2024-09-12 11:58:59',
    period: '30',
    tokens: 5000,
    income: 123.85,
    status: 1
  },
  {
    id: 0,
    date: '2024-09-12 11:58:59',
    period: '30',
    tokens: 5000,
    income: 123.85,
    status: 0
  },
  {
    id: 0,
    date: '2024-09-12 11:58:59',
    period: '30',
    tokens: 5000,
    income: 123.85,
    status: 1
  },
  {
    id: 0,
    date: '2024-09-12 11:58:59',
    period: '30',
    tokens: 5000,
    income: 123.85,
    status: 0
  }
]

const StakePage: NextPage = () => {
  const {
    isOpen: isOpenStakeConfirm,
    onOpen: onOpenStakeConfirm,
    onClose: onCloseChangeStakeConfirm
  } = useDisclosure()

  const [stakeType, setStakeType] = useState<StakeTypeEnum | null>(null)

  const [tokenOwned, setTokenOwned] = useState<StakeToken[]>([])
  const [stakedTokens, setStakedTokens] = useState<StakeToken[]>([])
  const [selectedToken, setSelectedToken] = useState<StakeToken | null>(null)

  const [currentTab, setCurrentTab] = useState<'stake' | 'unstake'>('stake')
  const { address } = useAccount()
  const { data: userData, refetch: refetchUserData } = useGetUser(address, {
    enabled: !!address
  })
  const [referralCode, setReferralCode] = useState('')
  const { signMessage } = useSignMessage()
  const [usdtHistoryModalVisible, setUsdtHistoryModalVisible] = useState(false)
  const [stakeNFTCardVisible, setStakeNFTCardVisible] = useState(true)

  const stakeSectionRef = useRef<HTMLDivElement | null>(null)

  const { showModal, hideModal } = useModal()
  const [isShowDetails, setIsShowDetails] = useState(false)

  const handleHistoryModalClose = () => {
    setUsdtHistoryModalVisible(false)
  }

  const handleUsdtHistoryClick = () => {
    setUsdtHistoryModalVisible(true)
  }

  const handleMLPHistoryClick = () => {
    showModal(ModalType.REWARDS_MLP_HISTORY_MODAL)
  }

  const handleStakeNFT = () => {
    if (!tokenOwned.length) {
      showModal(ModalType.BUY_NFT_MODAL)
      return
    }

    stakeSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  const handleOpenAccelerationPoolModal = () => {
    showModal(ModalType.ACCELERATE_POOL_MODAL, {
      onConfirm: () => {
        hideModal()
      }
    })
  }

  const handleCopy = (text: string) => async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const { mutate: patchReferralCode, isPending } = usePatchReferralCode(
    referralCode ?? '',
    {
      onSuccess() {
        refetchUserData()
      },
      onError(err) {
        console.log('patch referral code error:', err)
        toast.error('Invalid referral code')
      }
    }
  )

  const handleVerify = async () => {
    if (!referralCode) {
      return
    }

    signMessage(
      {
        message: `Referral Code: ${referralCode}`
      },
      {
        onSuccess(data) {
          patchReferralCode({ signature: data })
        },
        onError(err) {
          console.log('sign error: ', err)
          toast.error('signature error:' + (err as Error).message)
        }
      }
    )
  }

  const { data: totalNfts, refetch: refetchTotalNfts } = useReadContracts({
    contracts: [
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 0]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 1]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 2]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 3]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 4]
      }
    ],
    query: {
      enabled: !!address
    }
  })

  const [
    phoneStaked,
    matrixStaked,
    agentOneStaked,
    agentProStaked,
    agentUltraStaked
  ] = totalNfts?.map((result) => result.result as number[]) ?? [
    [],
    [],
    [],
    [],
    []
  ]

  useEffect(() => {
    const phoneTokens = phoneStaked.map((id) => {
      return {
        id,
        name: 'Matrix Phone',
        img: '/images/stake/phone.png'
      }
    })

    const matrixTokens = matrixStaked.map((id) => {
      return {
        id,
        name: 'Matrix',
        img: '/images/stake/matrix.png'
      }
    })

    const agentOneTokens = agentOneStaked.map((id) => {
      return {
        id,
        name: 'AI Agent One',
        img: '/images/stake/ai-agent-pro-02.png'
      }
    })

    const agentProTokens = agentProStaked.map((id) => {
      return {
        id,
        name: 'AI Agent Pro',
        img: '/images/stake/ai-agent-pro.png'
      }
    })

    const agentUltraTokens = agentUltraStaked.map((id) => {
      return {
        id,
        name: 'AI Agent Ultra',
        img: '/images/stake/ai-agent-pro-03.png'
      }
    })

    setStakedTokens([
      ...phoneTokens,
      ...matrixTokens,
      ...agentOneTokens,
      ...agentProTokens,
      ...agentUltraTokens
    ])
  }, [
    phoneStaked,
    matrixStaked,
    agentOneStaked,
    agentProStaked,
    agentUltraStaked
  ])

  useEffect(() => {
    setStakeNFTCardVisible(!stakedTokens.length)
  }, [stakedTokens])

  const { data: userRewardsSummary } = useGetUserRewardsSummary(address)

  console.log(userRewardsSummary)

  const { data: nftBalances, refetch: refetchNftBalances } = useReadContracts({
    contracts: [
      {
        address: PHONE_ADDRESS,
        abi: NFT_ABI,
        functionName: 'tokensOwned',
        args: [address]
      },
      {
        address: MATRIX_ADDRESS,
        abi: NFT_ABI,
        functionName: 'tokensOwned',
        args: [address]
      },
      {
        address: AI_AGENT_ONE_ADDRESS,
        abi: NFT_ABI,
        functionName: 'tokensOwned',
        args: [address]
      },
      {
        address: AI_AGENT_PRO_ADDRESS,
        abi: NFT_ABI,
        functionName: 'tokensOwned',
        args: [address]
      },
      {
        address: AI_AGENT_ULTRA_ADDRESS,
        abi: NFT_ABI,
        functionName: 'tokensOwned',
        args: [address]
      }
    ],
    query: {
      enabled: !!address
    }
  })

  const [
    phoneBalance,
    matrixBalance,
    aiAgentOneBalance,
    aiAgentProBalance,
    aiAgentUltraBalance
  ] = nftBalances?.map((result) => result.result as number[]) ?? [
    [],
    [],
    [],
    [],
    []
  ]

  useEffect(() => {
    const phoneTokens = phoneBalance.map((id) => {
      return {
        id,
        name: 'Matrix Phone',
        img: '/images/stake/phone.png'
      }
    })

    const matrixTokens = matrixBalance.map((id) => {
      return {
        id,
        name: 'Matrix',
        img: '/images/stake/matrix.png'
      }
    })

    const aiAgentOneTokens = aiAgentOneBalance.map((id) => {
      return {
        id,
        name: 'AI Agent One',
        img: '/images/stake/ai-agent-pro-02.png'
      }
    })

    const aiAgentProTokens = aiAgentProBalance.map((id) => {
      return {
        id,
        name: 'AI Agent Pro',
        img: '/images/stake/ai-agent-pro.png'
      }
    })

    const aiAgentUltraTokens = aiAgentUltraBalance.map((id) => {
      return {
        id,
        name: 'AI Agent Ultra',
        img: '/images/stake/ai-agent-pro-03.png'
      }
    })

    setTokenOwned([
      ...phoneTokens,
      ...matrixTokens,
      ...aiAgentOneTokens,
      ...aiAgentProTokens,
      ...aiAgentUltraTokens
    ])
  }, [
    phoneBalance,
    matrixBalance,
    aiAgentOneBalance,
    aiAgentProBalance,
    aiAgentUltraBalance
  ])

  const { data: referralRewards, refetch: refetchReferralWard } =
    useReadContract({
      address: PAYMENT_ADDRESS,
      abi: PAYMENT_ABI,
      functionName: 'getReferralRewards',
      args: [address]
    })

  const {
    data: stakeData,
    writeContract: stakeToken,
    isPending: isStakingToken
  } = useWriteContract()

  const { data: stakeReceipt, isLoading: isWaitingStakingToken } =
    useWaitForTransactionReceipt({ hash: stakeData })

  useEffect(() => {
    if (stakeReceipt) {
      refetchTotalNfts()
      refetchNftBalances()
      onCloseChangeStakeConfirm()
    }
  }, [
    stakeReceipt,
    refetchNftBalances,
    refetchTotalNfts,
    onCloseChangeStakeConfirm
  ])

  const {
    data: approveData,
    writeContract: approveStake,
    isPending: isApprovingStake
  } = useWriteContract()

  const {
    data: rewardMLPHash,
    writeContract: claimRewardMLP,
    isPending: isClaimingMLP
  } = useWriteContract()

  const { data: txRewardMLP, isLoading: isWaitingClaimMLPReceipt } =
    useWaitForTransactionReceipt({
      hash: rewardMLPHash,
      query: {
        enabled: rewardMLPHash !== undefined,
        initialData: undefined
      }
    })

  const {
    data: claimHash,
    writeContract: claimContract,
    isPending: isClaimingContract
  } = useWriteContract()

  const { data: txData, isLoading: isWaitingClaimReceipt } =
    useWaitForTransactionReceipt({
      hash: claimHash,
      query: {
        enabled: claimHash !== undefined,
        initialData: undefined
      }
    })

  useEffect(() => {
    if (txData && !isWaitingClaimReceipt) {
      refetchReferralWard()
    }
  }, [txData, refetchReferralWard, isWaitingClaimReceipt])

  const handleClaimReward = async () => {
    if (!referralRewards || !address) {
      return
    }

    claimContract(
      {
        abi: PAYMENT_ABI,
        functionName: 'claimReferralReward',
        address: PAYMENT_ADDRESS
      },
      {
        onSuccess() {
          toast.success('claim success')
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
  }

  const handleClaimMLP = async () => {
    if (
      !userData?.mlpTokenAmountPoolA ||
      !Number(userData?.mlpTokenAmountPoolA) ||
      !address
    ) {
      return
    }

    const signatureData = await getStakingSignature(address)

    claimRewardMLP(
      {
        abi: STAKE_ABI,
        address: STAKE_ADDRESS,
        functionName: 'claimReward',
        args: [userData.mlpTokenAmountPoolA, signatureData.signature]
      },
      {
        onError(err: Error) {
          const serializedError = serializeError(err)
          console.log({ serializedError })
          toast.error(
            (serializedError?.data as any)?.originalError?.shortMessage
          )
        },
        onSuccess() {
          toast.success('Claim success')
        }
      }
    )
  }

  useEffect(() => {
    if (txRewardMLP && !isWaitingClaimMLPReceipt) {
      refetchUserData()
    }
  }, [txRewardMLP, isWaitingClaimMLPReceipt, refetchUserData])

  const { data: approveReceipt, isLoading: isWaitingApprovingStake } =
    useWaitForTransactionReceipt({
      hash: approveData
    })

  useEffect(() => {
    if (approveReceipt) {
      const nftType =
        selectedToken?.name === 'Matrix Phone'
          ? 0
          : selectedToken?.name === 'Matrix'
            ? 1
            : selectedToken?.name === 'AI Agent One'
              ? 2
              : selectedToken?.name === 'AI Agent Pro'
                ? 3
                : 4

      stakeToken({
        address: STAKE_ADDRESS,
        abi: STAKE_ABI,
        functionName: 'stakeNFT',
        args: [nftType, selectedToken?.id]
      })
    }
  }, [
    approveReceipt,
    selectedToken?.id,
    selectedToken?.name,
    stakeToken,
    refetchNftBalances,
    refetchTotalNfts
  ])

  const handleStakeToken = async (token: StakeToken) => {
    console.log(token)
    const contractAddress =
      token.name === 'Matrix Phone'
        ? PHONE_ADDRESS
        : token.name === 'Matrix'
          ? MATRIX_ADDRESS
          : token.name === 'AI Agent One'
            ? AI_AGENT_ONE_ADDRESS
            : token.name === 'AI Agent Pro'
              ? AI_AGENT_PRO_ADDRESS
              : AI_AGENT_ULTRA_ADDRESS

    approveStake({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'approve',
      args: [STAKE_ADDRESS, token.id]
    })
  }

  const {
    data: unstakeData,
    writeContract: unstakeToken,
    isPending: isUnstakingToken
  } = useWriteContract()

  const { data: unstakeReceipt, isLoading: isWaitingUnstakingToken } =
    useWaitForTransactionReceipt({ hash: unstakeData })

  useEffect(() => {
    if (unstakeReceipt) {
      refetchTotalNfts()
      refetchNftBalances()
      onCloseChangeStakeConfirm()
    }
  }, [
    unstakeReceipt,
    refetchNftBalances,
    refetchTotalNfts,
    onCloseChangeStakeConfirm
  ])

  const handleUnstakeToken = async (token: StakeToken) => {
    setSelectedToken(token)
    const nftType =
      token?.name === 'Matrix Phone'
        ? 0
        : token?.name === 'Matrix'
          ? 1
          : token?.name === 'AI Agent One'
            ? 2
            : token?.name === 'AI Agent Pro'
              ? 3
              : 4

    unstakeToken(
      {
        address: STAKE_ADDRESS,
        abi: STAKE_ABI,
        functionName: 'unstakeNFT',
        args: [nftType, token.id]
      },
      {
        onError: (err) => {
          const serializedError = serializeError(err)
          console.log({ serializedError })
          toast.error(
            (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
          )
        }
      }
    )
  }

  const handleShowConfirmModal = (token: StakeToken, type: StakeTypeEnum) => {
    setStakeType(type)
    setSelectedToken(token)
    onOpenStakeConfirm()
  }

  const handleStakeConfirm = () => {
    if (!selectedToken) return

    if (stakeType === StakeTypeEnum.STAKE) {
      handleStakeToken(selectedToken)
    }

    if (stakeType === StakeTypeEnum.UNSTAKE) {
      handleUnstakeToken(selectedToken)
    }
  }

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
        <Content className='px-2 md:px-4'>
          <Text
            className={clsx(
              'mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold',
              GradientTextClass
            )}
          >
            My Account
          </Text>
          <div
            className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-11 rounded-[20px] py-2 md:py-8 px-2
              md:p-0'
          >
            <div
              className={clsx(
                `p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <Text
                className='mb-0 md:mb-[11px] px-2 md:px-0 text-lg md:text-2xl font-semibold bg-clip-text
                  text-transparent bg-gradient-text-1 md:bg-white'
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
                'p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]',
                GradientBorderClass
              )}
            >
              <Text
                className='mb-0 md:mb-[11px] p-2 md:p-0 text-lg md:text-2xl font-semibold bg-clip-text
                  text-transparent bg-gradient-text-1'
              >
                Referral Link
              </Text>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[60px] md:h-[72px] flex items-center
                  justify-between gap-[20px] md:gap-[62px]'
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

          <div className='flex items-center justify-end w-full md:mt-2'>
            {!userData?.referredByUserAddress && (
              <div className='w-full md:w-[50%] flex items-center justify-between pl-2 pr-2 md:pl-10 md:pr-4'>
                <Input
                  placeholder='Enter invite code'
                  wrapperClassName='w-[80%] md:w-[70%]'
                  inputClassName='border-[#282828] placeholder:text-[#666] !h-[32px] md:!h-[38px] !text-[14px] !outline-none !ring-0 bg-[#151515]'
                  type='text'
                  value={referralCode}
                  onChange={(val) => setReferralCode(val)}
                  id='inviteCode'
                />
                <Button
                  onClick={handleVerify}
                  isLoading={isPending}
                  disabled={!referralCode}
                  className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[40px] ml-10'
                >
                  Verify Link
                </Button>
              </div>
            )}
            {!!userData?.referredByUserAddress && (
              <span className='pr-4 opacity-60 text-[12px] md:text-[16px]'>
                {userData.referredByUserAddress}
              </span>
            )}
          </div>
        </Content>
      </Container>

      <Container>
        <Content className='px-4 md:px-4'>
          <Text
            className={clsx(
              `mb-6 md:pt-[78px] mt-6 md:mt-0 text-[24px] text-center md:text-left md:text-5xl
                font-semibold`,
              GradientTextClass
            )}
          >
            My NFT Inventory
          </Text>
          <div className='grid grid-cols-1'>
            <div
              className={clsx(
                `md:p-8 border-2 p-5 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-4 md:gap-6 items-center w-full'>
                  <img
                    src='/images/stake/phone.png'
                    alt=''
                    className='w-[80psx] h-[91px]'
                  />
                  <div className='flex-1'>
                    <span
                      className='w-full md:w-fit flex items-center justify-between md:justify-center gap-2
                        text-[20px] font-bold text-gray-a5'
                    >
                      MLPhone NFT
                      <Tooltip
                        placement='bottom'
                        className='bg-co-bg-black'
                        content={
                          <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                            MLPhone NFT come with 10 days of mining rights in
                            the basic pool. Once staking begins, it cannot be
                            ended prematurely; canceling the stake early will
                            render the NFT invalid.
                          </span>
                        }
                      >
                        <span>
                          <InfoColorIcon />
                        </span>
                      </Tooltip>
                    </span>
                    <div className='text-[24px] mt-3 font-bold md:hidden'>
                      {phoneStaked.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {phoneStaked.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {phoneBalance.length}
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
                <div className='text-[18px] font-bold'>
                  {phoneStaked.length}
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 mt-8 md:grid-cols-2 gap-8 md:border-none rounded-[20px] p-0'>
            <div
              className={clsx(
                `p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center w-full'>
                  <img
                    src='/images/stake/matrix.png'
                    alt=''
                    className='w-[86px] h-[86px]'
                  />
                  <div className='flex-1'>
                    <span
                      className='uppercase flex items-center w-full justify-between md:justify-center gap-2
                        text-[20px] font-bold text-gray-a5'
                    >
                      Matrix
                      <Tooltip
                        placement='bottom'
                        className='bg-co-bg-black'
                        content={
                          <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                            Matrix NFTs come with 7 days of mining rights in the
                            basic pool. Once staking begins, it cannot be ended
                            prematurely; canceling the stake early will render
                            the NFT invalid.
                          </span>
                        }
                      >
                        <span>
                          <InfoColorIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <div className='text-[24px] mt-3 font-bold md:hidden'>
                      {matrixStaked.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {matrixStaked.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {matrixBalance.length}
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
                <div className='text-[18px] font-bold'>
                  {matrixStaked.length}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                `p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center w-full'>
                  <img
                    src='/images/stake/ai-agent-pro.png'
                    alt=''
                    className='w-[86px] h-[86px]'
                  />
                  <div>
                    <span className='uppercase text-[20px] font-bold text-gray-a5'>
                      AI Agent One
                    </span>
                    <div className='text-[24px] font-bold mb:hidden'>
                      {agentOneStaked.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {agentOneStaked.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentOneBalance.length}
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
                <div className='text-[18px] font-bold'>
                  {agentOneStaked.length}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                `p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img
                    src='/images/stake/ai-agent-pro-02.png'
                    alt=''
                    className='w-[86px] h-[86px]'
                  />
                  <div>
                    <span className='uppercase text-[20px] font-bold text-gray-a5'>
                      AI Agent Pro
                    </span>
                    <div className='text-[24px] font-bold md:hidden'>
                      {agentProStaked.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {agentProStaked.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentProBalance.length}
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
                <div className='text-[18px] font-bold'>
                  {agentProStaked.length}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                `p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                GradientBorderClass
              )}
            >
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center'>
                  <img
                    src='/images/stake/ai-agent-pro-03.png'
                    alt=''
                    className='w-[86px] h-[86px]'
                  />
                  <div>
                    <span className='uppercase text-[20px] font-bold text-gray-a5'>
                      AI Agent Ultra
                    </span>
                    <div className='text-[24px] font-bold md:hidden'>
                      {agentUltraStaked.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {agentUltraStaked.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  Ordinary
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentUltraBalance.length}
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
                <div className='text-[18px] font-bold'>
                  {agentUltraStaked.length}
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              `p-5 md:p-8 border-2 mt-8 rounded-[20px] flex-col md:flex-row items-center flex
                justify-between gap-4 md:backdrop-filter md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex items-center w-full gap-4 md:gap-10'>
              <img
                src='/images/stake/usdt.png'
                alt='usdt'
                className='w-[70px] md:w-[112px]'
              />
              <div className='flex-1'>
                <div className='flex flex-col text-gray-a5 text-[14px] md:text-[20px] uppercase'>
                  <span className='hidden md:block'>USDT</span>
                  <span>Node Rewards</span>
                </div>
                <div className='flex items-center gap-1 md:hidden w-full justify-between'>
                  <span className='text-[20px] font-bold'>
                    {referralRewards
                      ? formatCurrency(referralRewards as number)
                      : '--'}
                  </span>
                  <span className='text-[20px] text-gray-a5'>USDT</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center md:items-end w-full'>
              <div className='items-center gap-1 hidden md:flex'>
                <span className='text-[48px] font-bold'>
                  {referralRewards
                    ? formatCurrency(referralRewards as number)
                    : '--'}
                </span>
                <span className='text-[20px] text-gray-a5'>USDT</span>
              </div>
              <div className='flex items-center justify-end gap-4 w-full'>
                <div
                  onClick={handleUsdtHistoryClick}
                  className='cursor-pointer text-[12px] underline text-gray-500 uppercase font-bold'
                >
                  History
                </div>
                <Button
                  onClick={handleClaimReward}
                  className='rounded-full h-8 w-fit md:w-[152px] text-base font-semibold z-10'
                  isLoading={isClaimingContract}
                >
                  CLAIM
                </Button>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              `p-5 md:p-8 border-2 mt-8 rounded-[20px] flex-col md:flex-row items-center flex
                justify-between gap-4 md:backdrop-filter md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex w-full items-center gap-4 md:gap-10'>
              <img
                src='/images/stake/mlp.png'
                alt='mlp'
                className='w-[70px] md:w-[112px]'
              />
              <div className='flex-1'>
                <div className='flex gap-x-1 md:flex-col text-gray-a5 text-[14px] md:text-[20px] uppercase'>
                  <span>MLP</span>
                  <span>CLAIMABLE</span>
                </div>
                <div className='flex w-full justify-between items-center gap-1 md:hidden'>
                  <span className='text-[20px] font-bold'>
                    {userData?.mlpTokenAmountPoolA
                      ? formatCurrency(userData?.mlpTokenAmountPoolA)
                      : '--'}
                  </span>
                  <span className='text-[20px] text-gray-a5'>$MLP</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-end w-full'>
              <div className='items-center gap-1 hidden md:flex'>
                <span className='text-[48px] font-bold'>
                  {userData?.mlpTokenAmountPoolA
                    ? formatCurrency(userData?.mlpTokenAmountPoolA)
                    : '--'}
                </span>
                <span className='text-[20px] text-gray-a5'>$MLP</span>
              </div>
              <div className='w-full flex items-center justify-end gap-4'>
                <div
                  onClick={handleMLPHistoryClick}
                  className='cursor-pointer text-[12px] underline text-gray-500 uppercase font-bold'
                >
                  History
                </div>
                <Button
                  onClick={handleClaimMLP}
                  isLoading={isClaimingMLP}
                  className='rounded-full h-8 w-fit md:w-[152px] text-base font-semibold z-10'
                >
                  CLAIM
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <Container>
        <Content className='px-4 md:px-4'>
          <Text
            className={clsx(
              `mb-4 md:pt-[78px] mt-5 md:mt-0 text-[24px] text-center md:text-left md:text-5xl
                font-semibold`,
              GradientTextClass
            )}
          >
            MLP&apos;s Hashrate Information
          </Text>

          <div className='relative'>
            {stakeNFTCardVisible && (
              <div
                className={clsx(
                  `md:p-8 md:border-2 rounded-[20px] md:backdrop-filter absolute z-10 w-full h-full
                    backdrop-blur-lg bg-opacity-60 md:backdrop-blur-[10px] flex items-center
                    justify-center flex-col gap-6 border-1`
                )}
              >
                <div className='flex items-center flex-col md:flex-row justify-center gap-4'>
                  <LockIcon width={36} height={36} color='#FFFFFF' />
                  <div className='text-[32px] md:text-[48px] font-bold text-center'>
                    Stake your{' '}
                    <span className={clsx('', GradientTextClass)}>NFT</span> to
                    unlock this pool
                  </div>
                </div>
                <Button
                  onClick={handleStakeNFT}
                  className='rounded-full w-[60%] text-[16px] h-[48px]'
                >
                  STAKE NFT
                </Button>
              </div>
            )}
            <div className='grid mt-8 grid-cols-1 md:grid-cols-2 gap-8 rounded-[20px] md:p-0'>
              <div
                className={clsx(
                  `p-4 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                  GradientBorderClass
                )}
              >
                <div className='flex justify-between items-center'>
                  <span className='text-gray-a5'>Total NFT</span>
                  <span className='text-[48px] font-bold'>
                    {stakedTokens.length}
                  </span>
                </div>
                <div className='grid grid-cols-2 md:flex md:items-center md:justify-center gap-4 mt-2'>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>Matrix Phone</div>
                    <span>{phoneStaked.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>Matrix NFT</div>
                    <span>{matrixStaked.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent One</div>
                    <span>{agentOneStaked.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent Pro</div>
                    <span>{agentProStaked.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent Ultra</div>
                    <span>{agentUltraStaked.length}</span>
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  `p-4 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                  GradientBorderClass
                )}
              >
                <div className='flex flex-col md:flex-row justify-between items-center'>
                  <span className='text-gray-a5'>Daily MLP Distribution</span>
                  <span className='text-[48px] font-bold'>1,106.92</span>
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
          </div>

          <div
            ref={stakeSectionRef}
            className={clsx(
              `py-8 border-2 mt-8 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
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
              className={clsx(
                `md:border-1 md:mx-8 my-6 border-gray-500 rounded-xl border-opacity-50`
              )}
            >
              {currentTab === 'stake' && !!tokenOwned.length && (
                <div
                  className={clsx(
                    `grid gap-y-4 gap-x-4 p-2 md:p-8 max-h-[437px] overflow-y-auto
                      transparent-scrollbar`,
                    !!tokenOwned.length && 'grid-cols-1 md:grid-cols-2'
                  )}
                >
                  {tokenOwned.map((stake) => {
                    return (
                      <div
                        key={stake.name + stake.id}
                        className='flex justify-between items-center pr-4'
                      >
                        <div className='flex items-center gap-4'>
                          <img
                            src={stake.img}
                            alt='matrix'
                            className={
                              stake.name === 'Matrix Phone'
                                ? 'ml-1 w-[54px] h-[50px] md:w-[74px] md:h-[66px]'
                                : 'w-[66px] h-[60px] md:w-[87px] md:h-[80px]'
                            }
                          />
                          <div className='flex flex-col'>
                            <span className='text-16px md:text-[32px] font-bold'>
                              {stake.name}
                            </span>
                            <span className='text-gray-a5 text-[12px] md:text-[24px]'>
                              {stake.id}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            handleShowConfirmModal(stake, StakeTypeEnum.STAKE)
                          }}
                          className='bg-white rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[40px]
                            md:w-[128px]'
                        >
                          STAKE
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
              {currentTab === 'stake' && !tokenOwned.length && (
                <div
                  className='font-bold p-2 md:p-8 text-[16px] md:text-[32px] text-center w-full md:w-[50%]
                    mx-auto'
                >
                  You don&apos;t have any{' '}
                  <span className={clsx(GradientTextClass, 'font-extra-bold')}>
                    NFT
                  </span>{' '}
                  to stake
                </div>
              )}
              {currentTab === 'unstake' && !!stakedTokens.length && (
                <div
                  className={clsx(
                    `grid gap-y-4 gap-x-4 p-2 md:p-8 max-h-[437px] overflow-y-auto
                      transparent-scrollbar`,
                    !!stakedTokens.length && 'grid-cols-1 md:grid-cols-2'
                  )}
                >
                  {stakedTokens.map((stake) => {
                    return (
                      <div
                        key={stake.name + stake.id}
                        className='flex justify-between items-center pr-4'
                      >
                        <div className='flex items-center gap-4'>
                          <img
                            src={stake.img}
                            alt='matrix'
                            className={
                              stake.name === 'Matrix Phone'
                                ? 'ml-1 w-[54px] h-[50px] md:w-[74px] md:h-[66px]'
                                : 'w-[66px] h-[60px] md:w-[87px] md:h-[80px]'
                            }
                          />
                          <div className='flex flex-col'>
                            <span className='text-16px md:text-[32px] font-bold'>
                              {stake.name}
                            </span>
                            <span className='text-gray-a5 text-[12px] md:text-[24px]'>
                              {stake.id}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            handleShowConfirmModal(stake, StakeTypeEnum.UNSTAKE)
                          }}
                          className='bg-white rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[40px]
                            md:w-[128px]'
                        >
                          UNSTAKE
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
              {currentTab === 'unstake' && !stakedTokens.length && (
                <div
                  className='font-bold p-2 md:p-8 text-[16px] md:text-[32px] text-center w-full md:w-[50%]
                    mx-auto'
                >
                  <div>
                    You don&apos;t have any{' '}
                    <span
                      className={clsx(GradientTextClass, 'font-extra-bold')}
                    >
                      NFT
                    </span>{' '}
                    to unstake
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={clsx(
              `p-5 md:p-8 border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex w-full relative flex-row items-center gap-2 justify-center md:justify-start'>
              <Text
                className={clsx(
                  'text-[24px] md:text-[28px] text-center font-bold flex items-center gap-2',
                  GradientTextClass
                )}
              >
                Basic Pool (PoW)
                <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      Your mining power in the basic pool is determined by the
                      number and value of the NFTs you have staked.
                    </span>
                  }
                >
                  <span className='absolute right-0 md:relative'>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-around gap-2 md:gap-8 mt-4'>
              <div className='grid grid-cols-2 gap-2'>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-8
                    py-4'
                >
                  <span className='text-[14px] text-center text-gray-a5 font-bold'>
                    Yesterday’s Rewards
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.rewards ?? 0)} MLP
                  </div>
                </div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-8
                    py-4'
                >
                  <span className='text-[14px] text-center text-gray-a5 font-bold'>
                    Holding NFT
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.stakingAmount ?? 0)}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className='flex-1 hidden md:block'></div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-8
                    py-4'
                >
                  <span className='text-[14px] text-gray-a5 font-bold'>
                    Total MLP Rewards
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.totalRewards ?? 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              `p-5 md:p-8 border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex flex-col w-full md:flex-row items-center justify-between'>
              <Text
                className={clsx(
                  `text-[16px] md:text-[28px] w-full md:w-fit flex justify-center relative gap-2
                  items-center text-center font-bold`,
                  GradientTextClass
                )}
              >
                Acceleration Pool (PoS)
                <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      Your mining power in the accelerated pool is determined by
                      the amount of $MLP you have staked.
                    </span>
                  }
                >
                  <span className='absolute right-0 md:relative'>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              <div className='flex gap-2 md:gap-10 items-center flex-col md:flex-row'>
                <span className='text-[24px] md:text-[28px] my-3 md:my-0 font-bold'>
                  $2,345.89 USDT
                </span>
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
            <div className='w-full mt-5 md:mt-20 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[16px] md:text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                NFT Boosted Pool
              </Text>
              <Button
                className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
                onClick={handleOpenAccelerationPoolModal}
              >
                Accelerate
              </Button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 justify-around gap-2 md:gap-8 mt-4'>
              <div
                className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold text-center'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div
                className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div
                className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                  Holding NFT
                </span>
                <div className='text-[18px] font-bold'>12</div>
              </div>
              <div
                className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>

            <div className='h-[1px] bg-gray-500 w-full mt-7'></div>

            <div className='w-full mt-7 flex items-center justify-between'>
              <Text
                className={clsx(
                  'text-[16px] md:text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                MLP Boosted Pool
              </Text>
              <Button
                className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
                onClick={handleOpenAccelerationPoolModal}
              >
                Accelerate
              </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mt-4'>
              <div className='grid grid-cols-2 gap-2 md:gap-8'>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    Yesterday’s Staking Rewards
                  </span>
                  <div className='text-[18px] font-bold'>999.00 MLP</div>
                </div>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    Accelerated MLP
                  </span>
                  <div className='text-[18px] font-bold'>999.00</div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8'>
                <div className='flex-1 hidden md:block'></div>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-8
                    py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                    Total MLP Rewards
                  </span>
                  <div className='text-[18px] font-bold'>999.00</div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-y-8 mt-8 items-center h-fit transition-height'>
              {isShowDetails && (
                <Table
                  aria-label='Details'
                  classNames={{
                    wrapper:
                      'rounded-[12px] border border-purple-500 bg-black-15 backdrop-blur-[6px] p-0 w-full',
                    th: 'bg-black text-white text-[18px] font-bold text-white text-center py-5 px-3 !rounded-none font-chakraPetch whitespace-normal',
                    td: ' py-5 px-3 text-[14px] font-medium text-center',
                    tr: 'odd:bg-black-15 even:bg-black-19 hover:bg-black-15 font-chakraPetch'
                  }}
                >
                  <TableHeader>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Skating Date
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Skating Period
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Number of staked tokens
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Cumulative income
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Reinvestment
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      Action
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mock_details.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                          {item.date}
                        </TableCell>
                        <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                          {item.period}
                        </TableCell>
                        <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                          {item.tokens}
                        </TableCell>
                        <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                          {item.income}
                        </TableCell>
                        <TableCell>
                          <span
                            className={clsx(
                              `w-[74px] h-[30px] rounded-[24px] flex items-center justify-center border
                                font-bold text-[14px] md:text-[16px] mx-auto`,
                              statusClass(item.status)
                            )}
                          >
                            {item.status ? 'Yes' : 'No'}
                          </span>
                        </TableCell>
                        <TableCell className='text-gray-150'>
                          <Button
                            isDisabled={!item.status}
                            className={twMerge(
                              clsx(
                                'rounded-full text-[12px] h-8 w-[152px] font-bold',
                                !item.status && 'bg-co-gray-7 text-white'
                              )
                            )}
                          >
                            Withdraw
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <Button
                onClick={() => {
                  setIsShowDetails(!isShowDetails)
                }}
                className='rounded-[35px] text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-full
                  md:w-[480px] font-bold'
              >
                {isShowDetails ? 'HIDE DETAILS' : 'STAKING DETAILS'}
              </Button>
            </div>
          </div>

          <div
            className={clsx(
              `p-5 md:p-8 border-2 mt-8 rounded-[20px] md:backdrop-filter
                md:backdrop-blur-[10px]`,
              GradientBorderClass
            )}
          >
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <Text
                className={clsx(
                  `text-[16px] flex gap-2 items-center w-full md:w-fit justify-center relative
                  text-center font-bold`,
                  GradientTextClass
                )}
              >
                Promotion Pool
                <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      Your mining power in the referral pool is determined by
                      the mining power of the friends you have invited.
                    </span>
                  }
                >
                  <span className='absolute right-0'>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              <div
                className={clsx(
                  'flex items-center mt-3 md:mt-0 rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                  GradientBorderClass
                )}
              >
                <span className='text-gray-a5'>$MLP Amount</span>
                <span>19,687.89</span>
              </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-4'>
              <div
                className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                  Yesterday’s Staking Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00 MLP</div>
              </div>
              <div
                className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                  Accelerated MLP
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
              <div
                className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                  Holding NFT
                </span>
                <div className='text-[18px] font-bold'>12</div>
              </div>
              <div
                className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                  md:px-8 py-4'
              >
                <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                  Total MLP Rewards
                </span>
                <div className='text-[18px] font-bold'>999.00</div>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <div className='h-[160px] w-full'></div>

      <StakeConfirmModal
        loading={
          isApprovingStake ||
          isWaitingApprovingStake ||
          isWaitingStakingToken ||
          isStakingToken ||
          isWaitingUnstakingToken ||
          isUnstakingToken
        }
        type={stakeType}
        isOpen={isOpenStakeConfirm}
        onClose={onCloseChangeStakeConfirm}
        onConfirm={handleStakeConfirm}
      />

      {usdtHistoryModalVisible && (
        <RewardsHistoryModal
          isOpen={usdtHistoryModalVisible}
          onOpenChange={handleHistoryModalClose}
          onClose={handleHistoryModalClose}
          title='Node Rewards History'
        />
      )}
    </Layout>
  )
}

export default StakePage
