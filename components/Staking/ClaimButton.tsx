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
import STAKE_B_ADDRESS_ABI from '@abis/StakeB.json'
import STAKE_C_ADDRESS_ABI from '@abis/StakeC.json'
import { Button } from '@components/Button'
import { MiningType } from '@services/api'
import { getClaimSignature } from '@services/api/staking'
import { formatCurrency } from '@utils/currency'
import { serializeError } from 'eth-rpc-errors'

const STAKE_A_ADDRESS = process.env.NEXT_PUBLIC_STAKE_A_ADDRESS as Address
const STAKE_B_ADDRESS = process.env.NEXT_PUBLIC_STAKE_B_ADDRESS as Address
const STAKE_C_ADDRESS = process.env.NEXT_PUBLIC_STAKE_C_ADDRESS as Address

interface ClaimButtonProps {
  type: 'pool_a' | 'pool_b1' | 'pool_b2' | 'pool_c'
  amount?: string
  refetchUserData: () => void
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
  const { refetchUserData } = props
  useEffect(() => {
    if (txRewardMLP && !isWaitingClaimMLPReceipt) {
      setTimeout(() => {
        refetchUserData()
      }, 2 * 1000)
      refetchUserData()
    }
  }, [txRewardMLP, isWaitingClaimMLPReceipt, refetchUserData])
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const claimSignature = await getClaimSignature({
      address: address as Address,
      type: props.type
    }).finally(() => {
      setLoading(false)
    })
    console.log(claimSignature)

    const params = {
      abi:
        props.type === 'pool_c'
          ? STAKE_C_ADDRESS_ABI
          : props.type === 'pool_a'
            ? STAKE_A_ADDRESS_ABI
            : STAKE_B_ADDRESS_ABI,
      address:
        props.type === 'pool_c'
          ? STAKE_C_ADDRESS
          : props.type === 'pool_a'
            ? STAKE_A_ADDRESS
            : STAKE_B_ADDRESS,
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
    console.log(params)

    claimReward(params, {
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
    })
  }

  return (
    <div className='flex items-center p-1 border rounded-full'>
      <div className='px-4'>{formatCurrency(props.amount)} MLP</div>
      <Button
        onClick={handleClick}
        isLoading={isClaimingMLP || loading}
        className='rounded-full text-[12px] md:text-[16px] h-[32px] md:h-[48px] w-fit md:w-[152px]'
      >
        {t('claimReward')}
      </Button>
    </div>
  )
}
