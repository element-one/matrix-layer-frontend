import { ChangeEventHandler, FC, useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import GradientText from '@components/Text/GradientText'

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
}

const PaymentField: FC<PaymentFieldProps> = ({
  onPayButtonClick,
  amount,
  isPaying
}) => {
  const [understandTerm, setUnderstandTerm] = useState(false)
  const { isConnected } = useAccount()

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
          className='text-[24px] md:text-[32px] font-semibold md:font-bold text-white leading-none
            text-right'
        >
          {amount}
          &nbsp;USDT
        </Text>
      </div>
      <Button
        color='primary'
        className='w-full p-[10px] font-semibold text-[16px] rounded-[35px]'
        onClick={onPayButtonClick}
        isLoading={isPaying}
        disabled={!understandTerm || !isConnected || amount <= 0}
      >
        Pay Now
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
            I understand that this is a non-refundable pre-order deposit.
          </Text>
        </label>
      </div>
      <Text
        as='div'
        className='text-[12px] text-center leading-[20px] font-normal'
      >
        By clicking ‘PAY NOW’, I acknowledge that I am committing to
        pre-ordering a product that is not immediately available. I also confirm
        that I have reviewed and agree to the terms outlined in the{' '}
        <Link href='/privacy'>
          <GradientText>Privacy Policy</GradientText>
        </Link>{' '}
        and{' '}
        <Link href='/terms'>
          <GradientText>Terms & Conditions</GradientText>{' '}
        </Link>
        .
      </Text>
    </div>
  )
}

export default PaymentField
