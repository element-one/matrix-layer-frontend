import { FC, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, Tooltip } from '@nextui-org/react'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { QuestionColorIcon } from '@components/Icon/QuestionColorIcon'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useGetStakingApySummary } from '@services/api/staking'

export interface AcceleratePoolModalProps {
  onClose?: () => void
  bestRate?: string
  onConfirm?: (options: {
    amount: string
    stakeDay: string
    stakeType: boolean
  }) => void
}

export const AcceleratePoolModal: FC<AcceleratePoolModalProps> = ({
  onClose,
  bestRate,
  onConfirm
}) => {
  const t = useTranslations('Stake')

  const default_options = [
    {
      day: '30',
      title: t('stakeDays.30'),
      content: '37% APY'
    },
    {
      day: '60',
      title: t('stakeDays.60'),
      content: '121% APY'
    },
    {
      day: '90',
      title: t('stakeDays.90'),
      content: '577% APY'
    },
    {
      day: '180',
      title: t('stakeDays.180'),
      content: '1988% APY'
    }
  ]

  const { isModalShown, hideModal, isConfirmLoading } = useModal()

  const [amount, setAmount] = useState('')

  const [stakeDay, setStakeDay] = useState('30')

  const [isChecked, setIsChecked] = useState(false)

  const { data: stakingApySummary } = useGetStakingApySummary()

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.ACCELERATE_POOL_MODAL)}
      onClose={handleClose}
      size='xl'
      placement='center'
      hideCloseButton
      classNames={{
        base: 'w-[1080px] !max-w-[95vw]',
        closeButton:
          'top-4 right-4 md:right-8 md:top-8 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='border-accelerate-modal-gradient'>
        <ModalBody
          className='flex flex-col gap-y-[12px] md:gap-y-[30px] p-6 md:px-12 md:py-10 text-co-text-1
            items-center'
        >
          <div className='flex gap-x-5 items-center'>
            <Text className='text-[14px] md:text-[32px] font-bold'>
              <span>{t('accelerateMLPBoostedPool.title')}</span>
            </Text>
            <Tooltip
              placement='bottom'
              className='bg-co-bg-black'
              content={
                <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                  {t('accelerateMLPBoostedPool.info')}
                </span>
              }
            >
              <span>
                <QuestionColorIcon />
              </span>
            </Tooltip>
          </div>
          <div className='flex justify-center items-center'>
            <label className='flex gap-x-[10px] items-center'>
              <input
                checked={isChecked}
                type='checkbox'
                className='accelerate-checkbox'
                onChange={() => {
                  setIsChecked(!isChecked)
                }}
              />
              <Text className='text-[10px] md:text-[18px] font-semibold text-co-gray-7'>
                {t('accelerateMLPBoostedPool.statement')}
              </Text>
            </label>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-[10px] w-full'>
            {default_options.map((item) => (
              <div
                key={item.day}
                className={clsx(
                  `flex flex-col h-[120px] md:h-[252px] px-6 py-4 md:pt-12 pt-6 items-center gap-3
                    bg-black rounded-[16px] border cursor-pointer`,
                  item.day === stakeDay
                    ? 'border-skate-day-item-active-gradient'
                    : 'border-transparent'
                )}
                onClick={() => {
                  setStakeDay(stakeDay === item.day ? '' : item.day)
                }}
              >
                <Text className='w-[130px] text-[12px] md:text-[24px] font-bold text-co-gray-7 text-center'>
                  {item.title}
                </Text>
                <Text className='text-[12px] md:text-[24px] font-bold text-co-green-2 text-center'>
                  {stakingApySummary?.[item.day as '30' | '60' | '90' | '180']}%
                  APY
                </Text>
              </div>
            ))}
          </div>
          <div className='text-[12px] md:text-[18px] font-semibold text-co-gray-7 text-center'>
            {t.rich('accelerateMLPBoostedPool.disclaimer', {
              gradient: (chunks) => (
                <span className='clip-text bg-gradient-home-text-1 font-bold'>
                  {chunks}
                </span>
              )
            })}
          </div>
          <div className='flex flex-col w-full'>
            <div className='w-full p-4 py-2 md:px-8 md:py-4 bg-black rounded-[16px] flex justify-between'>
              <Text className='text-[10px] md:text-[24px] text-co-gray-7 font-bold w-[100px] md:w-auto'>
                <span className='hidden md:inline-block'>
                  {t('AccelerateNFTBoostedPool.input')}{' '}
                </span>
                {t('AccelerateNFTBoostedPool.amount')} :
              </Text>
              <input
                className='flex-1 bg-transparent text-right text-[15px] md:text-[24px] text-white font-bold
                  placeholder:text-co-gray-8'
                placeholder={`$MLP ${t('AccelerateNFTBoostedPool.amount')}`}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              />
            </div>
            <Text className='mt-[10px] text-right text-[10px] md:text-[18px] text-co-gray-7 font-bold'>
              {t('AccelerateNFTBoostedPool.bestRate')} : {bestRate ?? '--'} MLP
            </Text>
          </div>
          <Button
            className='px-3 py-2 md:p-[10px] w-[130px] md:w-[320px] rounded-[32px] text-[12px]
              md:text-[16px] font-bold'
            onClick={() => {
              if (amount === '') {
                return
              }
              return (
                onConfirm &&
                onConfirm({ amount, stakeDay, stakeType: isChecked })
              )
            }}
            isLoading={isConfirmLoading?.[ModalType.ACCELERATE_POOL_MODAL]}
          >
            {t('accelerateMLPBoostedPool.confirm')}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
