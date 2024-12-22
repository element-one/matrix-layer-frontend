import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Address } from 'viem'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import STAKE_A_ADDRESS_ABI from '@abis/Stake.json'
import STAKE_B1_ADDRESS_ABI from '@abis/StakeB1.json'
import STAKE_B2_ADDRESS_ABI from '@abis/StakeB2.json'
import STAKE_C_ADDRESS_ABI from '@abis/StakeC.json'
import STAKE_PHONE_ADDRESS_ABI from '@abis/StakePhone.json'
import { Button } from '@components/Button'
import { MiningType, usePollingUsersCheckMLpClaimed } from '@services/api'
import { getClaimSignature } from '@services/api/staking'
import { formatCurrency } from '@utils/currency'
import { serializeError } from 'eth-rpc-errors'

const STAKE_A_ADDRESS = process.env.NEXT_PUBLIC_STAKE_A_ADDRESS as Address
const STAKE_B1_ADDRESS = process.env.NEXT_PUBLIC_STAKE_B1_ADDRESS as Address
const STAKE_B2_ADDRESS = process.env.NEXT_PUBLIC_STAKE_B2_ADDRESS as Address
const STAKE_C_ADDRESS = process.env.NEXT_PUBLIC_STAKE_C_ADDRESS as Address
const STAKE_PHONE_ADDRESS = process.env
  .NEXT_PUBLIC_MATRIX_STAKE_PHONE_ADDRESS as Address

interface ClaimButtonProps {
  isDisabled?: boolean
  type: 'pool_a' | 'pool_b1' | 'pool_b2' | 'pool_c' | 'pool_phone'
  amount?: string
  refetchUserData: () => void
}

const poolConfig: Record<
  ClaimButtonProps['type'],
  {
    address: Address
    abi: any
  }
> = {
  pool_a: {
    address: STAKE_A_ADDRESS,
    abi: STAKE_A_ADDRESS_ABI
  },
  pool_b1: {
    address: STAKE_B1_ADDRESS,
    abi: STAKE_B1_ADDRESS_ABI
  },
  pool_b2: {
    address: STAKE_B2_ADDRESS,
    abi: STAKE_B2_ADDRESS_ABI
  },
  pool_c: {
    address: STAKE_C_ADDRESS,
    abi: STAKE_C_ADDRESS_ABI
  },
  pool_phone: {
    address: STAKE_PHONE_ADDRESS,
    abi: STAKE_PHONE_ADDRESS_ABI
  }
}

export const ClaimButton = (props: ClaimButtonProps) => {
  const t = useTranslations('Stake')
  const { address } = useAccount()
  const {
    data: claimHash,
    writeContract: claimReward,
    isPending: isClaimingMLP
  } = useWriteContract()
  const { data: txRewardMLP, isLoading: isWaitingClaimMLPReceipt } =
    useWaitForTransactionReceipt({
      hash: claimHash,
      query: {
        enabled: claimHash !== undefined,
        initialData: undefined
      }
    })
  const { isDisabled, refetchUserData } = props

  const { data, stopPolling, startPolling, timeout } =
    usePollingUsersCheckMLpClaimed(txRewardMLP?.transactionHash)

  useEffect(() => {
    if (!data?.claimed && timeout) {
      toast.error(t('pleaseRefreshPage'))
      setLoading(false)
    }

    if (data?.claimed) {
      stopPolling()
      refetchUserData()
      setLoading(false)
    }
  }, [data, stopPolling, refetchUserData, timeout, t])

  useEffect(() => {
    if (txRewardMLP && !isWaitingClaimMLPReceipt) {
      startPolling()
    }
  }, [txRewardMLP, isWaitingClaimMLPReceipt, startPolling])
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const claimSignature = await getClaimSignature({
      address: address as Address,
      type: props.type
    }).catch((err) => {
      setLoading(false)
      throw err
    })
    console.log(claimSignature)

    const params = {
      abi: poolConfig[props.type].abi,
      address: poolConfig[props.type].address,
      functionName: 'claimReward',
      args: [
        claimSignature.amount,
        claimSignature.signature,
        ...(props.type === 'pool_b1'
          ? [MiningType.NFTBoosted]
          : props.type === 'pool_b2'
            ? [MiningType.MLPBoosted]
            : [])
      ]
    }

    claimReward(params, {
      onError(err: Error) {
        const serializedError = serializeError(err)
        console.log({ serializedError })
        toast.error(
          (serializedError?.data as any)?.originalError?.shortMessage // eslint-disable-line
        )
        setLoading(false)
      },
      onSuccess() {
        toast.success('Claim success')
      }
    })
  }

  return (
    <div className='shrink-0 flex items-center p-1 border rounded-full'>
      <div className='px-4 text-[12px] md:text-[24px]'>
        {formatCurrency(props.amount)} MLP
      </div>
      <Button
        onClick={handleClick}
        isLoading={isClaimingMLP || loading}
        disabled={isDisabled}
        className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
      >
        {t('claimReward')}
      </Button>
    </div>
  )
}
