import { ChangeEventHandler, FC, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAccount, useSignMessage } from 'wagmi'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Text } from '@components/Text'
import GradientText from '@components/Text/GradientText'
import { usePatchReferralCode } from '@services/api'
import { ApiUser } from '@type/api'

import Selection, { SelectionItemProps } from './Selection'

const Chains: SelectionItemProps[] = [
  {
    id: 'BNB',
    name: 'BNB CHAIN',
    icon: '/images/checkout/icon-bnb.svg'
  }
]

export interface PaymentFieldProps {
  amount: number
  onPayButtonClick?: () => void
  isPaying?: boolean
  userInfo?: ApiUser
  onVerifyReferralCodeSuccess?: () => void
}

const PaymentField: FC<PaymentFieldProps> = ({
  onPayButtonClick,
  amount,
  isPaying,
  userInfo,
  onVerifyReferralCodeSuccess
}) => {
  const t = useTranslations('Checkout')

  const [understandTerm, setUnderstandTerm] = useState(false)
  const { isConnected } = useAccount()
  const [referralCode, setReferralCode] = useState('')
  const { signMessage } = useSignMessage()

  const { mutate: patchReferralCode, isPending } = usePatchReferralCode(
    referralCode ?? '',
    {
      onSuccess() {
        onVerifyReferralCodeSuccess?.()
        toast.success('Verify success')
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

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUnderstandTerm(e.target.checked)
  }

  return (
    <div className='w-full md:max-w-[680px]'>
      <div
        className='flex flex-col md:flex-row justify-between items-start md:items-center
          gap-x-[32px] mb-[38px] md:mb-[36px] gap-y-[12px]'
      >
        <div className='w-full md:w-[340px]'>
          <Selection disabledValues={['BNB']} selectionItems={Chains} />
        </div>
        <Text
          className='text-[24px] md:text-[32px] font-semibold md:font-bold text-co-text-primary
            leading-none text-right'
        >
          {amount}
          &nbsp;USDT
        </Text>
      </div>
      {userInfo && !userInfo.referredByUserAddress && (
        <div className='flex items-center justify-between sm:justify-end sm:gap-4 mb-8'>
          <Input
            type='text'
            value={referralCode.toUpperCase()}
            onChange={setReferralCode}
            id='referralCode'
            placeholder={t('entercode')}
            inputClassName='focus:outline-none  h-[40px] !rounded-[16px] focus:!ring-0 w-[224px]'
            wrapperClassName='m-0'
          />
          <Button
            onClick={handleVerify}
            isLoading={isPending}
            disabled={!referralCode}
            className='p-[10px] font-semibold text-[16px] mt-2 rounded-[35px]'
          >
            {t('verify')}
          </Button>
        </div>
      )}
      <Button
        color='primary'
        className='w-full p-[10px] font-semibold text-[16px] rounded-[35px]'
        onClick={onPayButtonClick}
        isLoading={isPaying}
        disabled={!understandTerm || !isConnected || amount <= 0}
      >
        {t('payNow')}
      </Button>
      <div className='mt-[16px] mb-[8px] md:my-[10px] flex justify-center items-center'>
        <label className='flex gap-2 items-center'>
          <input
            onChange={handleCheckboxChange}
            checked={understandTerm}
            type='checkbox'
            className='term-checkbox'
          />
          <Text className='text-[10px] md:text-[16px] md:font-bold'>
            {t('statement')}
          </Text>
        </label>
      </div>
      <Text
        as='div'
        className='text-[12px] text-center leading-[20px] font-normal'
      >
        {t.rich('disclaimer', {
          policy: (chunks) => (
            <Link href='/privacy'>
              <GradientText>{chunks}</GradientText>
            </Link>
          ),
          terms: (chunks) => (
            <Link href='/terms'>
              <GradientText>{chunks}</GradientText>{' '}
            </Link>
          )
        })}
      </Text>
    </div>
  )
}

export default PaymentField
