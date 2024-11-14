import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Address } from 'viem'
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import COMPENSATION_ABI from '@abis/Compensate.json'
import COMPENSATION_CLAIMED_ABI from '@abis/CompensateClaimed.json'
import { Button } from '@components/Button'
import { CompensationClaimTable } from '@components/CompensationPlan/CompensationClaimTable'
import { CompensationOverallCard } from '@components/CompensationPlan/CompensationOverallCard'
import { CompensationReleaseTable } from '@components/CompensationPlan/CompensationReleaseTable'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { formatCurrency } from '@utils/currency'
import dayjs from 'dayjs'

const COMPENSATION_ADDRESS = process.env
  .NEXT_PUBLIC_COMPENSATION_ADDRESS as Address
const COMPENSATION_CLAIMED_ADDRESS = process.env
  .NEXT_PUBLIC_COMPENSATION_TOTAL_CLAIMED_ADDRESS as Address

const sectionContainerClass =
  'flex flex-col gap-y-3 border-b border-co-gray-1 py-16'
const sectionTitle = 'font-semibold text-co-gray-7 text-[24px]'

export const CompensationPlanPage = () => {
  const t = useTranslations('CompensationPlan')

  const { address } = useAccount()

  const { data: bigIntData, refetch } = useReadContracts({
    contracts: [
      {
        abi: COMPENSATION_ABI,
        address: COMPENSATION_ADDRESS,
        functionName: 'userInfo',
        args: [address]
      },
      {
        abi: COMPENSATION_CLAIMED_ABI,
        address: COMPENSATION_CLAIMED_ADDRESS,
        functionName: 'totalClaimedByUser',
        args: [address]
      },
      {
        abi: COMPENSATION_ABI,
        address: COMPENSATION_ADDRESS,
        functionName: 'releasedHistory',
        args: [address]
      },
      {
        abi: COMPENSATION_ABI,
        address: COMPENSATION_ADDRESS,
        functionName: 'claimedHistory',
        args: [address]
      }
    ]
  })

  const [
    bigIntSummaryData,
    bigIntTotalClaimed,
    bigIntReleasedHistory,
    bigIntClaimedHistory
  ] =
    bigIntData?.map((result) => {
      return result.result ?? undefined
    }) ?? [] // default to undefined

  const {
    data: claimHash,
    writeContract: claimAll,
    isPending: isClamingAll
  } = useWriteContract()

  const { isLoading: isWaitingClaimReceipt } = useWaitForTransactionReceipt({
    hash: claimHash,
    query: {
      enabled: claimHash !== undefined,
      initialData: undefined
    }
  })

  const isLoading = useMemo(
    () => isWaitingClaimReceipt || isClamingAll,
    [isWaitingClaimReceipt, isClamingAll]
  )

  const summaryData = useMemo(() => {
    if (bigIntSummaryData) {
      const bigIntData = bigIntSummaryData as {
        totalAmount?: bigint
        startTime: bigint
      }
      const totalAmount = Number(bigIntData.totalAmount?.toString() ?? 0)
      const startTime = Number(bigIntData.startTime ?? 0)
      const claimedAmount = Number(bigIntTotalClaimed?.toString() ?? 0)
      const claimableAmount = totalAmount - claimedAmount

      let unlockDate = ''
      if (startTime) {
        unlockDate = dayjs(startTime * 1000)
          .add(90, 'day')
          .format('MMM D, YYYY')
      }

      return {
        totalAmount: formatCurrency(totalAmount),
        claimedAmount: formatCurrency(claimedAmount),
        unlockDate: unlockDate,
        claimableAmount: claimableAmount
      }
    }
    return {
      totalAmount: '',
      claimedAmount: '',
      unlockDate: '',
      claimableAmount: 0
    }
  }, [bigIntSummaryData, bigIntTotalClaimed])

  const handleClaimAll = () => {
    claimAll(
      {
        abi: COMPENSATION_ABI,
        functionName: 'claim',
        address: COMPENSATION_ADDRESS
      },
      {
        onSuccess() {
          refetch()
        },
        onError(err) {
          console.log(err.message)
          toast.error('Claim failed: Please try again')
        }
      }
    )
  }

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      {/* title */}
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <TopSectionBackground />
        <Content className='pt-[150px] md:pt-[220px] md:pb-[97px]'>
          <Text className='text-center text-[24px] md:text-4xl font-pressStart2P leading-10'>
            {t('title')}
          </Text>
        </Content>
      </Container>

      {/* current situation */}
      <Container>
        <Content>
          <div className={sectionContainerClass}>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-start gap-x-2'>
              <Text className={sectionTitle}>{t('summary.title')}</Text>
              <div className='text-[20px] flex-1 break-words w-full lg:w-auto'>
                {address ?? '-'}
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <CompensationOverallCard
                title={t('summary.totalCompensate')}
                info={summaryData.totalAmount}
              />
              <CompensationOverallCard
                title={t('summary.unlock')}
                info={summaryData.unlockDate}
                tipInfo={t('summary.unlockTip')}
              />
              <CompensationOverallCard
                title={t('summary.totalClaimed')}
                info={summaryData.claimedAmount}
              />
            </div>
          </div>
        </Content>
      </Container>

      <Container className='mb-[150px] lg:mb-[200px]'>
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
          <div className={sectionContainerClass}>
            <div className='flex flex-col md:flex-row justify-start items-center gap-2'>
              <div className='flex gap-1'>
                <Text className={sectionTitle}>{t('tables.title')}</Text>
                <div className='text-[20px]'>
                  {formatCurrency(summaryData.claimableAmount)}
                </div>
              </div>
              <Button
                isDisabled={!summaryData.claimableAmount}
                isLoading={isLoading}
                color='primary'
                className='w-fit h-fit !rounded-full text-[18px] ml-0 lg:ml-2'
                onPress={handleClaimAll}
              >
                {t('tables.claimAll')}
              </Button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <CompensationReleaseTable contractData={bigIntReleasedHistory} />
              <CompensationClaimTable contractData={bigIntClaimedHistory} />
            </div>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}
