import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
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
import { Address, parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSignMessage,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import ERC20_ABI from '@abis/ERC20.json'
import NFT_ABI from '@abis/NFT.json'
import PAYMENT_ABI from '@abis/Payment.json'
import STAKE_ABI from '@abis/Stake.json'
import STAKE_B_ABI from '@abis/StakeB.json'
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
  MiningType,
  useGetUser,
  useGetUserRewardsMlpToken,
  useGetUserRewardsSummary,
  usePatchReferralCode
} from '@services/api'
import {
  getUserWithdrawMlpToken,
  useGetUserStakingList,
  UserStakingListItem
} from '@services/api/pool'
import { formatCurrency, formatUSDT } from '@utils/currency'
import { statusClass } from '@utils/stake'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { serializeError } from 'eth-rpc-errors'

const GradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const GradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL
const STAKE_A_ADDRESS = process.env.NEXT_PUBLIC_STAKE_A_ADDRESS as Address
const STAKE_B_ADDRESS = process.env.NEXT_PUBLIC_STAKE_B_ADDRESS as Address
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS as Address
const MATRIX_ADDRESS = process.env.NEXT_PUBLIC_MATRIX_ADDRESS as Address
const AI_AGENT_PRO_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_PRO_ADDRESS as Address
const AI_AGENT_ONE_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ONE_ADDRESS as Address
const AI_AGENT_ULTRA_ADDRESS = process.env
  .NEXT_PUBLIC_AI_AGENT_ULTRA_ADDRESS as Address
const PHONE_ADDRESS = process.env.NEXT_PUBLIC_PHONE_ADDRESS as Address
const POOL_B_ENABLE = process.env.NEXT_PUBLIC_POOL_B_ENABLE === 'true'
const POOL_C_ENABLE = process.env.NEXT_PUBLIC_POOL_C_ENABLE === 'true'

enum StakeType {
  FreeWithdraw = 0, // Unchecked
  FullLocked = 1 // Checked
}

interface StakeToken {
  id: number
  name: string
  img: string
}

const StakePage: NextPage = () => {
  const t = useTranslations('Stake')

  const {
    isOpen: isOpenStakeConfirm,
    onOpen: onOpenStakeConfirm,
    onClose: onCloseChangeStakeConfirm
  } = useDisclosure()

  const { isConfirmLoading, setIsConfirmLoading } = useModal()
  const [stakeType, setStakeType] = useState<StakeTypeEnum | null>(null)

  const [tokenOwned, setTokenOwned] = useState<StakeToken[]>([])
  const [stakedTokens, setStakedTokens] = useState<StakeToken[]>([])
  const [selectedToken, setSelectedToken] = useState<StakeToken | null>(null)

  const [currentTab, setCurrentTab] = useState<'stake' | 'unstake'>('stake')
  const { address } = useAccount()
  const { data: userData, refetch: refetchUserData } = useGetUser(address, {
    enabled: !!address
  })
  console.log('userData', userData)

  const [referralCode, setReferralCode] = useState('')
  const { signMessage } = useSignMessage()
  const [usdtHistoryModalVisible, setUsdtHistoryModalVisible] = useState(false)
  const [stakeNFTCardVisible, setStakeNFTCardVisible] = useState(true)

  const stakeSectionRef = useRef<HTMLDivElement | null>(null)

  const { showModal, hideModal } = useModal()
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [isShowNFTDetails, setIsShowNFTDetails] = useState(false)
  const [isShowPromotionDetails, setIsShowPromotionDetails] = useState(false)

  const stakingAmountRef = useRef<string | null>(null)
  const stakingPoolBMLPAmountRef = useRef<{
    amount: string
    stakeDay: string
    stakeType: StakeType
  } | null>(null)

  const handleWithdrawNFTBoostedClick = (options: {
    stakeId: string
    stakedTokenAmount: string
    rewardAmount: string
  }) => {
    showModal(ModalType.WITHDRAW_MODAL, {
      content: (
        <div className='text-[14px] md:text-[18px] text-gray-a5'>
          <div className='mb-4'>
            {t.rich('withdrawDesc', {
              text1: (chunks) => <span className='text-white'>{chunks}</span>,
              amount: formatCurrency(options.stakedTokenAmount)
            })}
          </div>
          <div className='mb-4 text-[24px] md:text-[32px] font-semibold flex items-center gap-4 text-white'>
            <span className=''>
              {formatCurrency(options.rewardAmount)} $MLP
            </span>
            <span className='text-2xl'>=</span>
            <div>
              {formatCurrency(
                new BigNumber(options.stakedTokenAmount)
                  .plus(options.rewardAmount)
                  .toString()
              )}{' '}
              $MLP <span className='text-[18px]'>in total</span>
            </div>
          </div>
          <div className='text-[14px] md:text-[18px] text-gray-150'>
            {t('doYouContinue')}
          </div>
        </div>
      ),
      onConfirm: () => {
        unstakeNFTBoosted(
          {
            address: STAKE_B_ADDRESS,
            abi: STAKE_B_ABI,
            functionName: 'unstakeNFTBoosted',
            args: [options.stakeId]
          },
          {
            onError(err) {
              console.log('unstake nft boosted error: ', err)
            }
          }
        )
      }
    })
  }
  const handleWithdrawMLPBoostedClick = async (item: UserStakingListItem) => {
    if (!address) return
    const isExpired = dayjs(item.endStakingAt).isBefore(dayjs())

    if (item.type === 0 && !isExpired) {
      const res = await getUserWithdrawMlpToken(address, Number(item.stakeId))
      showModal(ModalType.WITHDRAW_MODAL, {
        content: (
          <div className='text-[14px] md:text-[18px] text-gray-a5'>
            <div className='mb-4'>{t('warnContent')}</div>
            <div className='mb-4 text-[24px] md:text-[32px] font-semibold flex items-center gap-4'>
              <span className='line-through'>
                {formatCurrency(res.expectedRewardAmount)}
              </span>
              <ArrowRightIcon className='size-6' />
              <span>{formatCurrency(res.actualRewardAmount)}</span>
            </div>
            <div className='text-[14px] md:text-[18px] text-gray-150'>
              {t('doYouContinue')}
            </div>
          </div>
        ),
        onConfirm: () => {
          unstakeMLPBoosted(
            {
              address: STAKE_B_ADDRESS,
              abi: STAKE_B_ABI,
              functionName: 'unstakeMLPBoosted',
              args: [item.stakeId]
            },
            {
              onError(err) {
                console.log('unstake mlp boosted error: ', err)
              }
            }
          )
        }
      })
    } else {
      const options = {
        stakedTokenAmount: item.stakedTokenAmount,
        rewardAmount: item.estimatedRewardAmount
      }
      showModal(ModalType.WITHDRAW_MODAL, {
        content: (
          <div className='text-[14px] md:text-[18px] text-gray-a5'>
            <div className='mb-4'>
              {t.rich('withdrawDesc', {
                text1: (chunks) => <span className='text-white'>{chunks}</span>,
                amount: formatCurrency(options.stakedTokenAmount)
              })}
            </div>
            <div className='mb-4 text-[24px] md:text-[32px] font-semibold flex items-center gap-4 text-white'>
              <span className=''>
                {formatCurrency(options.rewardAmount)} $MLP
              </span>
              <span className='text-2xl'>=</span>
              <div>
                {formatCurrency(
                  new BigNumber(options.stakedTokenAmount)
                    .plus(options.rewardAmount)
                    .toString()
                )}{' '}
                $MLP <span className='text-[18px]'>in total</span>
              </div>
            </div>
            <div className='text-[14px] md:text-[18px] text-gray-150'>
              {t('doYouContinue')}
            </div>
          </div>
        ),
        onConfirm: () => {
          unstakeMLPBoosted(
            {
              address: STAKE_B_ADDRESS,
              abi: STAKE_B_ABI,
              functionName: 'unstakeNFTBoosted',
              args: [item.stakeId]
            },
            {
              onError(err) {
                console.log('unstake mlp boosted error: ', err)
                const serializedError = serializeError(err)
                console.log({ serializedError })
                toast.error(
                  (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
                )
              }
            }
          )
        }
      })
    }
  }
  const handleWithdrawDetailModal = (item: {
    withdrawDate: string
    stakedAmount: string
    rewards: string
    transactionHash: string
  }) => {
    showModal(ModalType.WITHDRAW_DETAIL_MODAL, {
      withdrawDate: item.withdrawDate,
      stakedAmount: item.stakedAmount,
      rewards: item.rewards,
      transactionHash: item.transactionHash
    })
  }

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
    if (!tokenOwned?.length) {
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
      onConfirm: (options: {
        amount: string
        stakeDay: string
        stakeType: boolean
      }) => {
        stakingPoolBMLPAmountRef.current = {
          amount: options.amount,
          stakeDay: String(Number(options.stakeDay) * 24 * 60 * 60),
          stakeType: options.stakeType
            ? StakeType.FullLocked
            : StakeType.FreeWithdraw
        }
        const amount = parseUnits(options.amount, mlpTokenDecimals as number)

        if (!minStakeBAmount || amount < (minStakeBAmount as bigint)) {
          toast.error('Amount is less than minimum stake amount')
          return
        }

        approvePoolBMLP(
          {
            address: mlpTokenAddress as Address,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [STAKE_B_ADDRESS, amount]
          },
          {
            onError(err) {
              console.log('approve pool b mlp error: ', err)
              const serializedError = serializeError(err)
              console.log({ serializedError })
              toast.error(
                (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
              )
            }
          }
        )
      }
    })
  }

  const { data: mlpTokenAddress } = useReadContract({
    address: STAKE_B_ADDRESS,
    abi: STAKE_B_ABI,
    functionName: 'mlpToken',
    args: []
  })
  console.log('mlpTokenAddress', mlpTokenAddress)

  const { data: mlpTokenDecimals } = useReadContract({
    address: mlpTokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'decimals',
    args: []
  })
  const { data: minStakeBAmount } = useReadContract({
    address: STAKE_B_ADDRESS,
    abi: STAKE_B_ABI,
    functionName: 'minimumStakeAmount',
    args: []
  })

  const handleOpenAccelerationNFTPoolModal = () => {
    showModal(ModalType.ACCELERATE_NFT_POOL_MODAL, {
      onConfirm: (options: { amount: string }) => {
        stakingAmountRef.current = options.amount
        const amount = parseUnits(options.amount, mlpTokenDecimals as number)
        if (!minStakeBAmount || amount < (minStakeBAmount as bigint)) {
          toast.error('Amount is less than minimum stake amount')
          return
        }

        approvePoolBNFT(
          {
            address: mlpTokenAddress as Address,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [STAKE_B_ADDRESS, amount]
          },
          {
            onError(err) {
              console.log('approve pool b nft error: ', err)
              const serializedError = serializeError(err)
              console.log({ serializedError })
              toast.error(
                (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
              )
            }
          }
        )
      }
    })
  }

  const handleCopy = (text: string) => async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        toast.success(t('copied'))
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
        address: STAKE_A_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 0]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_A_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 1]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_A_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 2]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_A_ADDRESS,
        functionName: 'getUserStakedTokenIds',
        args: [address, 3]
      },
      {
        abi: STAKE_ABI,
        address: STAKE_A_ADDRESS,
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
    if (!address) return
    const phoneTokens = phoneStaked
      ? phoneStaked?.map((id) => {
          return {
            id,
            name: 'Matrix Phone',
            img: '/images/stake/phone.png'
          }
        })
      : []

    const matrixTokens = matrixStaked
      ? matrixStaked?.map((id) => {
          return {
            id,
            name: 'Matrix',
            img: '/images/stake/matrix.png'
          }
        })
      : []

    const agentOneTokens = agentOneStaked
      ? agentOneStaked?.map((id) => {
          return {
            id,
            name: 'AI Agent One',
            img: '/images/stake/ai-agent-pro-02.png'
          }
        })
      : []

    const agentProTokens = agentProStaked
      ? agentProStaked?.map((id) => {
          return {
            id,
            name: 'AI Agent Pro',
            img: '/images/stake/ai-agent-pro.png'
          }
        })
      : []

    const agentUltraTokens = agentUltraStaked
      ? agentUltraStaked?.map((id) => {
          return {
            id,
            name: 'AI Agent Ultra',
            img: '/images/stake/ai-agent-pro-03.png'
          }
        })
      : []

    setStakedTokens([
      ...phoneTokens,
      ...matrixTokens,
      ...agentOneTokens,
      ...agentProTokens,
      ...agentUltraTokens
    ])
  }, [
    address,
    phoneStaked,
    matrixStaked,
    agentOneStaked,
    agentProStaked,
    agentUltraStaked
  ])

  useEffect(() => {
    setStakeNFTCardVisible(!stakedTokens?.length)
  }, [stakedTokens])

  const { data: userRewardsSummary, refetch: refetchUserRewardsSummary } =
    useGetUserRewardsSummary(address)
  const { data: poolB1StakingList, refetch: refetchPoolB1StakingList } =
    useGetUserStakingList(
      {
        address: address as Address,
        type: 'pool_b1'
      },
      {
        enabled: !!address && POOL_B_ENABLE
      }
    )
  const { data: poolB2StakingList, refetch: refetchPoolB2StakingList } =
    useGetUserStakingList(
      {
        address: address as Address,
        type: 'pool_b2'
      },
      {
        enabled: !!address && POOL_B_ENABLE
      }
    )

  const {
    data: userRewardsMlpTokenPoolC
    // refetch: refetchUserRewardsMlpTokenPoolC
  } = useGetUserRewardsMlpToken(
    {
      address: address as Address,
      type: MiningType.Promotional
    },
    {
      enabled: !!address && POOL_C_ENABLE
    }
  )

  console.log('userRewardsSummary', userRewardsSummary)

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
    if (!address) return
    const phoneTokens = phoneBalance
      ? phoneBalance?.map((id) => {
          return {
            id,
            name: 'Matrix Phone',
            img: '/images/stake/phone.png'
          }
        })
      : []

    const matrixTokens = matrixBalance
      ? matrixBalance?.map((id) => {
          return {
            id,
            name: 'Matrix',
            img: '/images/stake/matrix.png'
          }
        })
      : []

    const aiAgentOneTokens = aiAgentOneBalance
      ? aiAgentOneBalance?.map((id) => {
          return {
            id,
            name: 'AI Agent One',
            img: '/images/stake/ai-agent-pro-02.png'
          }
        })
      : []

    const aiAgentProTokens = aiAgentProBalance
      ? aiAgentProBalance?.map((id) => {
          return {
            id,
            name: 'AI Agent Pro',
            img: '/images/stake/ai-agent-pro.png'
          }
        })
      : []

    const aiAgentUltraTokens = aiAgentUltraBalance
      ? aiAgentUltraBalance?.map((id) => {
          return {
            id,
            name: 'AI Agent Ultra',
            img: '/images/stake/ai-agent-pro-03.png'
          }
        })
      : []

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
      refetchUserRewardsSummary()
      onCloseChangeStakeConfirm()
    }
  }, [
    stakeReceipt,
    refetchNftBalances,
    refetchTotalNfts,
    onCloseChangeStakeConfirm,
    refetchUserRewardsSummary
  ])

  const {
    data: approveData,
    writeContract: approveStake,
    isPending: isApprovingStake
  } = useWriteContract()

  /** pool b nft */
  const {
    data: approvePoolBNFTData,
    writeContract: approvePoolBNFT,
    isPending: isApprovingPoolBNFT
  } = useWriteContract()
  useEffect(() => {
    console.log('approvePoolBNFTData', approvePoolBNFTData, isApprovingPoolBNFT)
  }, [approvePoolBNFTData, isApprovingPoolBNFT])

  const { data: approvePoolBNFTReceipt, isLoading: isWaitingApprovePoolBNFT } =
    useWaitForTransactionReceipt({
      hash: approvePoolBNFTData
    })
  useEffect(() => {
    console.log(
      'approvePoolBNFTReceipt',
      approvePoolBNFTReceipt,
      isWaitingApprovePoolBNFT
    )
  }, [approvePoolBNFTReceipt, isWaitingApprovePoolBNFT])

  const {
    data: stakePoolBNFTData,
    writeContract: stakePoolBNFT,
    isPending: isStakingPoolBNFT
  } = useWriteContract()
  useEffect(() => {
    console.log('stakePoolBNFTData', stakePoolBNFTData, isStakingPoolBNFT)
  }, [stakePoolBNFTData, isStakingPoolBNFT])

  useEffect(() => {
    if (approvePoolBNFTReceipt && stakingAmountRef.current) {
      const amount = parseUnits(
        stakingAmountRef.current,
        mlpTokenDecimals as number
      )

      stakePoolBNFT(
        {
          address: STAKE_B_ADDRESS,
          abi: STAKE_B_ABI,
          functionName: 'stakeNFTBoosted',
          args: [amount]
        },
        {
          onError: (error) => {
            console.error('Error staking to Pool B:', error)
          }
        }
      )
    }
  }, [approvePoolBNFTReceipt, mlpTokenDecimals, stakePoolBNFT])

  const { data: stakePoolBNFTReceipt, isLoading: isWaitingStakePoolBNFT } =
    useWaitForTransactionReceipt({
      hash: stakePoolBNFTData
    })
  console.log(
    'stakePoolBNFTReceipt',
    stakePoolBNFTReceipt,
    isWaitingStakePoolBNFT
  )

  useEffect(() => {
    if (stakePoolBNFTReceipt) {
      stakingAmountRef.current = null
      refetchUserRewardsSummary()
      refetchPoolB1StakingList()
      hideModal()
    }
  }, [
    stakePoolBNFTReceipt,
    refetchUserRewardsSummary,
    hideModal,
    refetchPoolB1StakingList
  ])

  useEffect(() => {
    const isStakePoolBNFTLoading =
      isStakingPoolBNFT ||
      isWaitingStakePoolBNFT ||
      isApprovingPoolBNFT ||
      isWaitingApprovePoolBNFT
    if (
      isStakePoolBNFTLoading !==
      isConfirmLoading?.[ModalType.ACCELERATE_NFT_POOL_MODAL]
    ) {
      setIsConfirmLoading(
        ModalType.ACCELERATE_NFT_POOL_MODAL,
        isStakePoolBNFTLoading
      )
    }
  }, [
    isApprovingPoolBNFT,
    isConfirmLoading,
    isStakingPoolBNFT,
    isWaitingApprovePoolBNFT,
    isWaitingStakePoolBNFT,
    setIsConfirmLoading
  ])

  /** pool a mlp */
  const {
    data: approvePoolBMLPData,
    writeContract: approvePoolBMLP,
    isPending: isApprovingPoolBMLP
  } = useWriteContract()

  useEffect(() => {
    console.log('approvePoolBMLPData', approvePoolBMLPData, isApprovingPoolBMLP)
  }, [approvePoolBMLPData, isApprovingPoolBMLP])

  const { data: approvePoolBMLPReceipt, isLoading: isWaitingApprovePoolBMLP } =
    useWaitForTransactionReceipt({
      hash: approvePoolBMLPData
    })

  useEffect(() => {
    console.log(
      'approvePoolBMLPReceipt',
      approvePoolBMLPReceipt,
      isWaitingApprovePoolBMLP
    )
  }, [approvePoolBMLPReceipt, isWaitingApprovePoolBMLP])

  const {
    data: stakePoolBMLPData,
    writeContract: stakePoolBMLP,
    isPending: isStakingPoolBMLP
  } = useWriteContract()

  useEffect(() => {
    console.log('stakePoolBMLPData', stakePoolBMLPData, isStakingPoolBMLP)
  }, [stakePoolBMLPData, isStakingPoolBMLP])

  // Add effect to handle Pool B MLP staking after approval
  useEffect(() => {
    if (approvePoolBMLPReceipt && stakingPoolBMLPAmountRef.current) {
      const amount = parseUnits(
        stakingPoolBMLPAmountRef.current.amount,
        mlpTokenDecimals as number
      )

      stakePoolBMLP(
        {
          address: STAKE_B_ADDRESS,
          abi: STAKE_B_ABI,
          functionName: 'stakeMlpBoosted',
          args: [
            amount,
            stakingPoolBMLPAmountRef.current.stakeDay,
            stakingPoolBMLPAmountRef.current.stakeType
          ]
        },
        {
          onError: (error) => {
            console.error('Error staking MLP to Pool B:', error)
          }
        }
      )
    }
  }, [approvePoolBMLPReceipt, mlpTokenDecimals, stakePoolBMLP])

  const { data: stakePoolBMLPReceipt, isLoading: isWaitingStakePoolBMLP } =
    useWaitForTransactionReceipt({
      hash: stakePoolBMLPData
    })
  useEffect(() => {
    console.log(
      'stakePoolBMLPReceipt',
      stakePoolBMLPReceipt,
      isWaitingStakePoolBMLP
    )
  }, [stakePoolBMLPReceipt, isWaitingStakePoolBMLP])

  useEffect(() => {
    if (stakePoolBMLPReceipt) {
      stakingPoolBMLPAmountRef.current = null
      refetchUserRewardsSummary()
      refetchPoolB2StakingList()
      hideModal()
    }
  }, [
    stakePoolBMLPReceipt,
    refetchUserRewardsSummary,
    hideModal,
    refetchPoolB2StakingList
  ])

  // Effect to update loading state for MLP Pool acceleration modal
  useEffect(() => {
    const isStakePoolBMLPLoading =
      isStakingPoolBMLP ||
      isWaitingStakePoolBMLP ||
      isApprovingPoolBMLP ||
      isWaitingApprovePoolBMLP
    if (
      isStakePoolBMLPLoading !==
      isConfirmLoading?.[ModalType.ACCELERATE_POOL_MODAL]
    ) {
      setIsConfirmLoading(
        ModalType.ACCELERATE_POOL_MODAL,
        isStakePoolBMLPLoading
      )
    }
  }, [
    isApprovingPoolBMLP,
    isConfirmLoading,
    isStakingPoolBMLP,
    isWaitingApprovePoolBMLP,
    isWaitingStakePoolBMLP,
    setIsConfirmLoading
  ])

  /** unstake nft boosted */
  const {
    data: unstakeNFTBoostedHash,
    writeContract: unstakeNFTBoosted,
    isPending: isUnstakingNFTBoosted
  } = useWriteContract()
  const {
    data: unstakeNFTBoostedReceipt,
    isLoading: isWaitingUnstakeNFTBoosted
  } = useWaitForTransactionReceipt({
    hash: unstakeNFTBoostedHash
  })

  useEffect(() => {
    if (unstakeNFTBoostedReceipt && !isWaitingUnstakeNFTBoosted) {
      refetchUserRewardsSummary()
      refetchPoolB1StakingList()
      hideModal()
    }
  }, [
    unstakeNFTBoostedReceipt,
    isWaitingUnstakeNFTBoosted,
    refetchUserRewardsSummary,
    hideModal,
    refetchPoolB1StakingList
  ])

  /** unstake mlp boosted */
  const {
    data: unstakeMLPBoostedHash,
    writeContract: unstakeMLPBoosted,
    isPending: isUnstakingMLPBoosted
  } = useWriteContract()
  const {
    data: unstakeMLPBoostedReceipt,
    isLoading: isWaitingUnstakeMLPBoosted
  } = useWaitForTransactionReceipt({
    hash: unstakeMLPBoostedHash
  })

  useEffect(() => {
    if (unstakeMLPBoostedReceipt && !isWaitingUnstakeMLPBoosted) {
      refetchUserRewardsSummary()
      refetchPoolB2StakingList()
      hideModal()
    }
  }, [
    unstakeMLPBoostedReceipt,
    isWaitingUnstakeMLPBoosted,
    refetchUserRewardsSummary,
    hideModal,
    refetchPoolB2StakingList
  ])

  useEffect(() => {
    const isUnstakeBoostedLoading =
      isUnstakingMLPBoosted ||
      isWaitingUnstakeMLPBoosted ||
      isUnstakingNFTBoosted ||
      isWaitingUnstakeNFTBoosted
    if (
      isUnstakeBoostedLoading !== isConfirmLoading?.[ModalType.WITHDRAW_MODAL]
    ) {
      setIsConfirmLoading(ModalType.WITHDRAW_MODAL, isUnstakeBoostedLoading)
    }
  }, [
    isUnstakingMLPBoosted,
    isWaitingUnstakeMLPBoosted,
    isConfirmLoading,
    setIsConfirmLoading,
    isUnstakingNFTBoosted,
    isWaitingUnstakeNFTBoosted
  ])

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
            (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
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
        address: STAKE_A_ADDRESS,
        functionName: 'claimReward',
        args: [userData.mlpTokenAmountPoolA, signatureData.signature]
      },
      {
        onError(err: Error) {
          const serializedError = serializeError(err)
          console.log({ serializedError })
          toast.error(
            (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
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
      setTimeout(() => {
        refetchUserData()
      }, 2 * 1000)
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
        address: STAKE_A_ADDRESS,
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
      args: [STAKE_A_ADDRESS, token.id]
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
      refetchUserRewardsSummary()
      onCloseChangeStakeConfirm()
    }
  }, [
    unstakeReceipt,
    refetchNftBalances,
    refetchTotalNfts,
    onCloseChangeStakeConfirm,
    refetchUserRewardsSummary
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
        address: STAKE_A_ADDRESS,
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

  const cardClsx =
    'p-5 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]'

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
              {t('skateTitle')}
            </Text>
          </div>
        </Content>
      </Container>
      {/* account */}
      <Container>
        <Content className='px-2 md:px-4'>
          <Text
            className={clsx(
              'mb-6 md:pt-[78px] text-[24px] text-center md:text-left md:text-5xl font-semibold',
              GradientTextClass
            )}
          >
            {t('myAccount')}
          </Text>
          <div
            className='grid grid-cols-1 2xl:grid-cols-3 gap-4 md:gap-11 rounded-[20px] py-2 lg:py-8
              px-2 lg:p-0'
          >
            <div className={clsx(cardClsx, GradientBorderClass)}>
              <Text
                className='mb-0 md:mb-[11px] px-2 md:px-0 text-lg md:text-2xl font-semibold bg-clip-text
                  text-transparent bg-gradient-text-1 md:bg-white'
              >
                {t('referralCode')}
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
                  <span className='md:inline hidden'>{t('copyCode')}</span>
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <div className={clsx(cardClsx, GradientBorderClass)}>
              <Text
                className='mb-0 md:mb-[11px] p-2 md:p-0 text-lg md:text-2xl font-semibold bg-clip-text
                  text-transparent bg-gradient-text-1'
              >
                {t('referralLink')}
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
                  <span className='md:inline hidden'>{t('copyLink')}</span>
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <div className={clsx(cardClsx, GradientBorderClass)}>
              <Text
                className='mb-0 md:mb-[11px] p-2 md:p-0 text-lg md:text-2xl font-semibold bg-clip-text
                  text-transparent bg-gradient-text-1 flex justify-between items-center'
              >
                {t('inviteSystem')}

                <span className='text-white text-[14px]'>
                  {userData?.referrerReferralCode
                    ? `${t('referrerInviteCode')}: ${userData?.referrerReferralCode}`
                    : ''}
                </span>
              </Text>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[60px] md:h-[72px] flex items-center
                  justify-between md:gap-[62px]'
              >
                {!userData?.referredByUserAddress && (
                  <>
                    <Input
                      placeholder={t('enterInviteCode')}
                      wrapperClassName='w-[80%] -mt-2'
                      inputClassName='border-[#282828] placeholder:text-[#666] !h-[32px] md:!h-[38px] !text-[16px] !outline-none !ring-0 bg-[#151515]'
                      type='text'
                      value={referralCode}
                      onChange={(val) => setReferralCode(val)}
                      id='inviteCode'
                    />
                    <Button
                      size='sm'
                      onClick={handleVerify}
                      isLoading={isPending}
                      disabled={!referralCode}
                      className='rounded-full text-[12px] min-w-[90px] md:text-[14px] h-[32px]'
                    >
                      {t('verify')}
                    </Button>
                  </>
                )}
                {!!userData?.referredByUserAddress && (
                  <>
                    <div className='w-fit max-w-[70%] 2xl:max-w-[36%]'>
                      <div>{t('referrerAddress')}</div>
                      <Tooltip content={userData.referredByUserAddress}>
                        <div className='min-w-0 text-[18px] font-semibold truncate'>
                          {userData.referredByUserAddress}
                        </div>
                      </Tooltip>
                    </div>
                    <Button
                      className='shrink-0 rounded-[35px] min-w-fit h-10 bg-transparent border-[#666] text-white
                        text-base font-semibold'
                      variant='bordered'
                      onClick={handleCopy(userData.referredByUserAddress)}
                    >
                      <span className='md:inline hidden'>
                        {t('copyAddress')}
                      </span>
                      <CopyIcon />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Content>
      </Container>

      {/* nft inventory */}
      <Container>
        <Content className='px-4 md:px-4'>
          <Text
            className={clsx(
              `mb-6 md:pt-[78px] mt-6 md:mt-0 text-[24px] text-center md:text-left md:text-5xl
                font-semibold`,
              GradientTextClass
            )}
          >
            {t('NFTinventory')}
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
                            {t('phoneInfo')}
                          </span>
                        }
                      >
                        <span>
                          <InfoColorIcon />
                        </span>
                      </Tooltip>
                    </span>
                    <div className='text-[24px] mt-3 font-bold md:hidden'>
                      {phoneStaked?.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden md:block'>
                  {phoneStaked?.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  {t('ordinary')}
                </div>
                <div className='text-[18px] font-bold'>
                  {phoneBalance?.length}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  {t('stake')}
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>
                  {phoneStaked?.length}
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 mt-8 md:grid-cols-2 gap-8 md:border-none rounded-[20px] p-0'>
            <div className={clsx(cardClsx, GradientBorderClass)}>
              <div className='flex w-full justify-between'>
                <div className='flex gap-6 items-center w-full'>
                  <img
                    src='/images/stake/matrix.png'
                    alt=''
                    className='w-[86px] h-[86px]'
                  />
                  <div>
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
                            {t('matrixInfo')}
                          </span>
                        }
                      >
                        <span>
                          <InfoColorIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <div className='text-[24px] mt-3 font-bold lg:hidden'>
                      {matrixStaked?.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden lg:block'>
                  {matrixStaked?.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  {t('ordinary')}
                </div>
                <div className='text-[18px] font-bold'>
                  {matrixBalance?.length}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  {t('stake')}
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>
                  {matrixStaked?.length}
                </div>
              </div>
            </div>
            <div className={clsx(cardClsx, GradientBorderClass)}>
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
                    <div className='text-[24px] font-bold lg:hidden'>
                      {agentOneStaked?.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden lg:block'>
                  {agentOneStaked?.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  {t('ordinary')}
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentOneBalance?.length}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  {t('stake')}
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>
                  {agentOneStaked?.length}
                </div>
              </div>
            </div>
            <div className={clsx(cardClsx, GradientBorderClass)}>
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
                    <div className='text-[24px] font-bold lg:hidden'>
                      {agentProStaked?.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden lg:block'>
                  {agentProStaked?.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  {t('ordinary')}
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentProBalance?.length}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  {t('stake')}
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>
                  {agentProStaked?.length}
                </div>
              </div>
            </div>
            <div className={clsx(cardClsx, GradientBorderClass)}>
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
                    <div className='text-[24px] font-bold lg:hidden'>
                      {agentUltraStaked?.length}
                    </div>
                  </div>
                </div>
                <div className='text-[48px] font-bold hidden lg:block'>
                  {agentUltraStaked?.length}
                </div>
              </div>
              <div
                className='bg-black mt-6 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold'>
                  {t('ordinary')}
                </div>
                <div className='text-[18px] font-bold'>
                  {aiAgentUltraBalance?.length}
                </div>
              </div>
              <div
                className='bg-black mt-4 pl-6 pr-4 rounded-2xl h-[55px] flex items-center justify-between
                  gap-[20px] md:gap-[62px]'
              >
                <div className='text-gray-a5 text-[18px] font-bold flex items-center gap-2'>
                  {t('stake')}
                  <LockIcon />
                </div>
                <div className='text-[18px] font-bold'>
                  {agentUltraStaked?.length}
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
                  <span>{t('nodeRewards')}</span>
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
                  {t('claimHistory')}
                </div>
                <Button
                  onClick={handleClaimReward}
                  className='rounded-full h-8 w-fit md:w-[152px] text-base font-semibold z-10'
                  isLoading={isClaimingContract}
                >
                  {t('claim')}
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
                  <span>{t('claimable')}</span>
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
                  {t('claimHistory')}
                </div>
                <Button
                  onClick={handleClaimMLP}
                  isLoading={isClaimingMLP}
                  className='rounded-full h-8 w-fit md:w-[152px] text-base font-semibold z-10'
                >
                  {t('claim')}
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      {/* hashrate information */}
      <Container>
        <Content className='px-4 md:px-4'>
          <Text
            className={clsx(
              `mb-4 md:pt-[78px] mt-5 md:mt-0 text-[24px] text-center md:text-left md:text-5xl
                font-semibold`,
              GradientTextClass
            )}
          >
            {t('hashRateInfo')}
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
                    {t.rich('unlockPool', {
                      nft: (chunks) => (
                        <span className={clsx(GradientTextClass)}>
                          {chunks}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <Button
                  onClick={handleStakeNFT}
                  className='rounded-full w-[60%] text-[16px] h-[48px]'
                >
                  {t('stakeNFT')}
                </Button>
              </div>
            )}
            <div className='grid mt-8 grid-cols-1 lg:grid-cols-2 gap-8 rounded-[20px] md:p-0'>
              <div
                className={clsx(
                  `p-4 md:p-8 border-2 rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
                  GradientBorderClass
                )}
              >
                <div className='flex justify-between items-center'>
                  <span className='text-gray-a5'>{t('totalNFT')}</span>
                  <span className='text-[48px] font-bold'>
                    {stakedTokens?.length}
                  </span>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-2'>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>Matrix Phone</div>
                    <span>{phoneStaked?.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>Matrix NFT</div>
                    <span>{matrixStaked?.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent One</div>
                    <span>{agentOneStaked?.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent Pro</div>
                    <span>{agentProStaked?.length}</span>
                  </div>
                  <div
                    className='bg-black rounded-md flex items-center text-[18px] flex-col px-4 py-2
                      text-gray-a5'
                  >
                    <div className='text-center'>AI Agent Ultra</div>
                    <span>{agentUltraStaked?.length}</span>
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
                  <span className='text-gray-a5'>
                    {t('dailyMLPDistribution')}
                  </span>
                  <span className='text-[48px] font-bold'>
                    {formatUSDT(
                      userRewardsSummary?.currentDayAllPoolTotalRewards ?? 0
                    )}
                  </span>
                </div>
                <div
                  className='bg-black h-[96px] mt-2 rounded-md flex items-center justify-center text-[18px]
                    flex-col px-4 py-2 text-gray-a5'
                >
                  <div className='text-center'>{t('staking')}</div>
                  <span className='text-white'>
                    {formatUSDT(
                      userRewardsSummary?.currentDayAllPoolTotalStakingAmount ??
                        0
                    )}
                  </span>
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
                {t('tab.stake')}
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
                {t('tab.unStake')}
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
              {currentTab === 'stake' && !!tokenOwned?.length && (
                <div
                  className={clsx(
                    `grid gap-y-4 gap-x-4 p-2 md:p-8 max-h-[437px] overflow-y-auto
                      transparent-scrollbar`,
                    !!tokenOwned?.length && 'grid-cols-1 md:grid-cols-2'
                  )}
                >
                  {tokenOwned?.map((stake) => {
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
                              # {stake.id.toString()}
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
                          {t('stakeBtn')}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
              {currentTab === 'stake' && !tokenOwned?.length && (
                <div
                  className='font-bold p-2 md:p-8 text-[16px] md:text-[32px] text-center w-full md:w-[50%]
                    mx-auto'
                >
                  {t.rich('noNFTStakeAlert', {
                    nft: (chunks) => (
                      <span
                        className={clsx(GradientTextClass, 'font-extra-bold')}
                      >
                        {chunks}
                      </span>
                    )
                  })}
                </div>
              )}
              {currentTab === 'unstake' && !!stakedTokens?.length && (
                <div
                  className={clsx(
                    `grid gap-y-4 gap-x-4 p-2 md:p-8 max-h-[437px] overflow-y-auto
                      transparent-scrollbar`,
                    !!stakedTokens?.length && 'grid-cols-1 md:grid-cols-2'
                  )}
                >
                  {stakedTokens?.map((stake) => {
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
                              # {stake.id.toString()}
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
                          {t('unstakeBtn')}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
              {currentTab === 'unstake' && !stakedTokens?.length && (
                <div
                  className='font-bold p-2 md:p-8 text-[16px] md:text-[32px] text-center w-full md:w-[50%]
                    mx-auto'
                >
                  {t.rich('noNFTUnstakeAlert', {
                    nft: (chunks) => (
                      <span
                        className={clsx(GradientTextClass, 'font-extra-bold')}
                      >
                        {chunks}
                      </span>
                    )
                  })}
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
                {t('basicPool')}
                <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      {t('basicPoolInfo')}
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
                    {t('yesterdayRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.yesterdayPoolARewards ?? 0)}{' '}
                    MLP
                  </div>
                </div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[14px] text-center text-gray-a5 font-bold'>
                    {t('NFTComputingPower')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.poolAStakingAmount ?? 0)}
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
                    {t('TotalMLPRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatUSDT(userRewardsSummary?.poolATotalRewards ?? 0)}
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
                {t('BalancePool.title')}
                {/* <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      {t('AccelerationPool.info')}
                    </span>
                  }
                >
                  <span className='absolute right-0 md:relative'>
                    <InfoIcon />
                  </span>
                </Tooltip> */}
              </Text>
              {POOL_B_ENABLE && (
                <div className='flex gap-2 md:gap-10 items-center flex-col md:flex-row'>
                  {/* <span
                    onClick={handlePoolBHistoryClick}
                    className='font-bold cursor-pointer text-[16px] text-gray-a5 underline'
                  >
                    {t('BalancePool.DailyRewardHistory')}
                  </span> */}
                  {/* <span className='text-[24px] md:text-[28px] my-3 md:my-0 font-bold'>
                    $2,345.89 USDT
                  </span> */}
                  {/* <div
                    className={clsx(
                      'flex rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                      GradientBorderClass
                    )}
                  >
                    <span className='text-gray-a5'>$MLP {t('amount')}</span>
                    <span>0.00</span>
                  </div> */}
                </div>
              )}
            </div>
            <div className='w-full mt-5 md:mt-20 flex md:items-center justify-between'>
              <Text
                className={clsx(
                  'text-[16px] md:text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                {t('NFTBoostedPool')}
              </Text>
              <div className='flex md:flex-row flex-col items-center gap-2 md:gap-4'>
                <span
                  onClick={() => {
                    showModal(ModalType.REWARDS_POOL_B_HISTORY_MODAL, {
                      poolType: 'pool_b1'
                    })
                  }}
                  className='md:font-bold cursor-pointer md:text-[16px] text-[14px] text-gray-a5 underline'
                >
                  {t('BalancePool.DailyRewardHistory')}
                </span>
                <Button
                  disabled={!POOL_B_ENABLE}
                  className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
                  onClick={handleOpenAccelerationNFTPoolModal}
                >
                  {t('accelerate')}
                </Button>
              </div>
            </div>
            {!POOL_B_ENABLE && (
              <div
                className='bg-black mt-6 text-center leading-[64px] w-full rounded-xl text-[18px]
                  text-gray-a5'
              >
                Coming soon
              </div>
            )}
            {POOL_B_ENABLE && (
              <div className='grid grid-cols-2 md:grid-cols-4 justify-around gap-2 md:gap-8 mt-4'>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold text-center'>
                    {t('yesterdayStakingRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(userRewardsSummary?.yesterdayPoolB1Rewards)}{' '}
                    MLP
                  </div>
                </div>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                    {t('acceleratedMLP')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(
                      userRewardsSummary?.poolB1StakingTokenAmount
                    )}
                  </div>
                </div>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                    {t('holdingNFT')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {userRewardsSummary?.userHoldingCount}
                  </div>
                </div>
                <div
                  className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                    {t('totalMLPRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(userRewardsSummary?.poolB1TotalRewards)}
                  </div>
                </div>
              </div>
            )}

            <div className='flex flex-col gap-y-8 mt-8 items-center h-fit transition-height'>
              {isShowNFTDetails && (
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
                      {t('stakedDate')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('stakedAmount')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('cumulativeIncome')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('action')}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {!!poolB1StakingList?.data?.length
                      ? poolB1StakingList?.data?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {dayjs(item.createdAt).format('YYYY.M.D')}
                            </TableCell>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {formatCurrency(item.stakedTokenAmount)}
                            </TableCell>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {formatCurrency(item.rewardAmount)}
                            </TableCell>
                            <TableCell className='text-gray-150'>
                              {item.isActive ? (
                                <Button
                                  isDisabled={!item.isActive}
                                  className={twMerge(
                                    clsx(
                                      'rounded-full text-[12px] h-8 w-[152px] font-bold',
                                      !item.isActive &&
                                        'bg-co-gray-7 text-white'
                                    )
                                  )}
                                  onClick={() =>
                                    handleWithdrawNFTBoostedClick({
                                      stakeId: `${item.stakeId}`,
                                      stakedTokenAmount: item.stakedTokenAmount,
                                      rewardAmount: item.rewardAmount
                                    })
                                  }
                                >
                                  {t('withdraw')}
                                </Button>
                              ) : (
                                <button
                                  className={twMerge(
                                    clsx(
                                      'bg-transparent underline text-white font-bold'
                                    )
                                  )}
                                  onClick={() =>
                                    handleWithdrawDetailModal({
                                      withdrawDate: dayjs(
                                        item.cancelStakingAt
                                      ).format('DD/MM/YYYY'),
                                      stakedAmount: formatCurrency(
                                        item.stakedTokenAmount
                                      ),
                                      rewards: formatCurrency(
                                        item.rewardAmount
                                      ),
                                      transactionHash:
                                        item.cancelStakingTransactionHash ?? ''
                                    })
                                  }
                                >
                                  {t('withdraw')}
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      : []}
                  </TableBody>
                </Table>
              )}
              <Button
                disabled={!POOL_B_ENABLE}
                onClick={() => {
                  setIsShowNFTDetails(!isShowNFTDetails)
                }}
                className='rounded-[35px] text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-full
                  md:w-[480px] font-bold'
              >
                {isShowNFTDetails ? t('hideDetails') : t('stakingDetails')}
              </Button>
            </div>

            <div className='h-[1px] bg-gray-500 w-full mt-7'></div>

            <div className='w-full mt-7 flex md:items-center justify-between'>
              <Text
                className={clsx(
                  'text-[16px] md:text-[28px] text-center font-bold',
                  GradientTextClass
                )}
              >
                {t('MLPBoostedPool')}
              </Text>
              <div className='flex md:flex-row flex-col items-center gap-2 md:gap-4'>
                <span
                  onClick={() => {
                    showModal(ModalType.REWARDS_POOL_B_HISTORY_MODAL, {
                      poolType: 'pool_b2'
                    })
                  }}
                  className='md:font-bold cursor-pointer md:text-[16px] text-[14px] text-gray-a5 underline'
                >
                  {t('BalancePool.DailyRewardHistory')}
                </span>
                <Button
                  disabled={!POOL_B_ENABLE}
                  className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
                  onClick={handleOpenAccelerationPoolModal}
                >
                  {t('accelerate')}
                </Button>
              </div>
            </div>

            {!POOL_B_ENABLE && (
              <div
                className='bg-black mt-6 text-center leading-[64px] w-full rounded-xl text-[18px]
                  text-gray-a5'
              >
                Coming soon
              </div>
            )}
            {POOL_B_ENABLE && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mt-4'>
                <div className='grid grid-cols-2 gap-2 md:gap-8'>
                  <div
                    className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                      md:px-8 py-4'
                  >
                    <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                      {t('yesterdayStakingRewards')}
                    </span>
                    <div className='text-[18px] font-bold'>
                      {formatCurrency(
                        userRewardsSummary?.yesterdayPoolB2Rewards
                      )}{' '}
                      MLP
                    </div>
                  </div>
                  <div
                    className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-2
                      md:px-8 py-4'
                  >
                    <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                      {t('acceleratedMLP')}
                    </span>
                    <div className='text-[18px] font-bold'>
                      {formatCurrency(
                        userRewardsSummary?.poolB2StakingTokenAmount
                      )}
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8'>
                  <div className='flex-1 hidden md:block'></div>
                  <div
                    className='bg-black flex-1 w-full rounded-xl flex flex-col items-center justify-center px-8
                      py-4'
                  >
                    <span className='text-[12px] md:text-[14px] text-gray-a5 font-bold'>
                      {t('TotalMLPRewards')}
                    </span>
                    <div className='text-[18px] font-bold'>
                      {formatCurrency(userRewardsSummary?.poolB2TotalRewards)}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      {t('stakedDate')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('stakingPeriod')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('NumberOfStakedTokens')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('cumulativeIncome')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('reinvestment')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('action')}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {poolB2StakingList?.data.map((item) => {
                      const isReinvestment = item.type === 1
                      const isExpired = dayjs(item.endStakingAt).isBefore(
                        dayjs()
                      )
                      const isCanWithdraw =
                        item.type === 0 || (item.type === 1 && isExpired)
                      return (
                        <TableRow key={item.id}>
                          <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                            {dayjs(item.startStakingAt).format('YYYY.M.D')}
                          </TableCell>
                          <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                            {item.contractDays}
                          </TableCell>
                          <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                            {formatCurrency(item.stakedTokenAmount)}
                          </TableCell>
                          <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                            {formatCurrency(item.estimatedRewardAmount)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={clsx(
                                `w-[74px] h-[30px] rounded-[24px] flex items-center justify-center border
                                  font-bold text-[14px] md:text-[16px] mx-auto`,
                                statusClass(isReinvestment ? 1 : 0)
                              )}
                            >
                              {isReinvestment ? 'Yes' : 'No'}
                            </span>
                          </TableCell>
                          <TableCell className='text-gray-150'>
                            {item.isActive ? (
                              <Button
                                isDisabled={!isCanWithdraw}
                                className={twMerge(
                                  clsx(
                                    'rounded-full text-[12px] h-8 w-[152px] font-bold',
                                    !isCanWithdraw && 'bg-co-gray-7 text-white'
                                  )
                                )}
                                onClick={() =>
                                  handleWithdrawMLPBoostedClick(item)
                                }
                              >
                                {t('withdraw')}
                              </Button>
                            ) : (
                              <button
                                className={twMerge(
                                  clsx(
                                    'bg-transparent underline text-white font-bold'
                                  )
                                )}
                                onClick={() =>
                                  handleWithdrawDetailModal({
                                    withdrawDate: dayjs(
                                      item.cancelStakingAt
                                    ).format('DD/MM/YYYY'),
                                    stakedAmount: formatCurrency(
                                      item.stakedTokenAmount
                                    ),
                                    rewards: formatCurrency(
                                      item.actualRewardAmount
                                    ),
                                    transactionHash:
                                      item.cancelStakingTransactionHash ?? ''
                                  })
                                }
                              >
                                {t('withdraw')}
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    }) ?? []}
                  </TableBody>
                </Table>
              )}
              <Button
                disabled={!POOL_B_ENABLE}
                onClick={() => {
                  setIsShowDetails(!isShowDetails)
                }}
                className='rounded-[35px] text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-full
                  md:w-[480px] font-bold'
              >
                {isShowDetails ? t('hideDetails') : t('stakingDetails')}
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
                  `text-[16px] md:text-[28px] flex gap-2 items-center w-full md:w-fit
                    justify-center relative text-center font-bold`,
                  GradientTextClass
                )}
              >
                {t('promotionPool')}
                <Tooltip
                  placement='bottom'
                  className='bg-co-bg-black'
                  content={
                    <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                      {t('promotionPoolInfo')}
                    </span>
                  }
                >
                  <span className='absolute right-0 md:relative'>
                    <InfoIcon />
                  </span>
                </Tooltip>
              </Text>
              {POOL_C_ENABLE && (
                <div
                  className={clsx(
                    'flex items-center mt-3 md:mt-0 rounded-full border-1 px-4 py-1 gap-8 text-[18px]',
                    GradientBorderClass
                  )}
                >
                  <span className='text-gray-a5'>$MLP {t('amount')}</span>
                  <span>{formatCurrency(userData?.mlpTokenAmountPoolC)}</span>
                </div>
              )}
            </div>
            {!POOL_C_ENABLE && (
              <div
                className='bg-black mt-6 text-center leading-[64px] w-full rounded-xl text-[18px]
                  text-gray-a5'
              >
                Coming soon
              </div>
            )}
            {POOL_C_ENABLE && (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mt-4'>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    {t('yesterdayRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(userRewardsSummary?.yesterdayPoolCRewards)}{' '}
                    MLP
                  </div>
                </div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    {t('totalPerformance')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(userRewardsSummary?.poolCTotalRewards)}
                  </div>
                </div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    {t('dailyAverage')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(
                      userRewardsSummary?.teamDailyUserHoldingSales
                    )}
                  </div>
                </div>
                <div
                  className='bg-black w-full flex-1 rounded-xl flex flex-col items-center justify-center px-2
                    md:px-8 py-4'
                >
                  <span className='text-[12px] md:text-[14px] text-center text-gray-a5 font-bold'>
                    {t('totalMLPRewards')}
                  </span>
                  <div className='text-[18px] font-bold'>
                    {formatCurrency(userRewardsSummary?.teamUserHoldingSales)}
                  </div>
                </div>
              </div>
            )}

            <div className='flex flex-col gap-y-8 mt-8 items-center h-fit transition-height'>
              {isShowPromotionDetails && (
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
                      {t('createTime')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('tokenAmount')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('status')}
                    </TableColumn>
                    <TableColumn className='text-[14px] md:text-[16px]'>
                      {t('action')}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {!!userRewardsMlpTokenPoolC?.data?.length
                      ? userRewardsMlpTokenPoolC?.data?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {dayjs(item.createdAt).format('YYYY.M.D')}
                            </TableCell>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {formatCurrency(item.tokenAmount)}
                            </TableCell>
                            <TableCell className='text-gray-150 text-[14px] md:text-[16px]'>
                              {item.status}
                            </TableCell>
                            <TableCell className='text-gray-150'>
                              <div></div>
                            </TableCell>
                          </TableRow>
                        ))
                      : []}
                  </TableBody>
                </Table>
              )}
              <Button
                disabled={!POOL_C_ENABLE}
                onClick={() => {
                  setIsShowPromotionDetails(!isShowPromotionDetails)
                }}
                className='rounded-[35px] text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-full
                  md:w-[480px] font-bold uppercase'
              >
                {isShowPromotionDetails ? t('hideDetails') : t('rewardDetail')}
              </Button>
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
