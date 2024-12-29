import { FC, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, Tooltip } from '@nextui-org/react'
import { Address } from 'viem'
import { useAccount, useBalance } from 'wagmi'

import { Button } from '@components/Button'
import { QuestionColorIcon } from '@components/Icon/QuestionColorIcon'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { formatCurrency } from '@utils/currency'

const MLP_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MLP_TOKEN_ADDRESS as Address

export interface AccelerateNFTPoolModalProps {
  onClose?: () => void
  onConfirm?: (options: { amount: string }) => void
}

export const AccelerateNFTPoolModal: FC<AccelerateNFTPoolModalProps> = ({
  onClose,
  onConfirm
}) => {
  const t = useTranslations('Stake')
  const { address } = useAccount()
  const { data: balanceData } = useBalance({
    address,
    token: MLP_TOKEN_ADDRESS
  })

  const { isModalShown, hideModal, isConfirmLoading } = useModal()

  const [amount, setAmount] = useState('')

  const handleClose = () => {
    onClose && onClose()
    hideModal()
  }

  const formattedBalance = useMemo(() => {
    if (!balanceData) {
      return '--'
    }

    return formatCurrency(
      balanceData?.value.toString() ?? 0,
      balanceData?.decimals,
      true
    )
  }, [balanceData])

  return (
    <Modal
      isOpen={isModalShown(ModalType.ACCELERATE_NFT_POOL_MODAL)}
      onClose={handleClose}
      size='xl'
      placement='center'
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
              <span>{t('AccelerateNFTBoostedPool.title')}</span>
            </Text>
            <Tooltip
              placement='bottom'
              className='bg-co-bg-black'
              content={
                <span className='max-w-[300px] text-[12px] text-center bg-co-bg-black text-co-text-3 px-2 py-3'>
                  {t('AccelerateNFTBoostedPool.info')}
                </span>
              }
            >
              <span>
                <QuestionColorIcon />
              </span>
            </Tooltip>
          </div>
          <div className='flex flex-col w-full'>
            <div
              className='w-full p-4 py-2 md:px-8 md:py-4 bg-co-stake-box-bg rounded-[16px] flex
                justify-between'
            >
              <Text className='text-[13px] md:text-[24px] text-co-gray-7 font-bold w-[100px] md:w-auto'>
                <span className='hidden md:inline-block'>
                  {t('AccelerateNFTBoostedPool.input')}{' '}
                </span>
                {t('AccelerateNFTBoostedPool.amount')} :
              </Text>
              <input
                className='flex-1 bg-transparent text-right text-[16px] md:text-[24px] text-co-text-primary
                  font-bold placeholder:text-co-gray-8'
                placeholder={`$MLP ${t('AccelerateNFTBoostedPool.amount')}`}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              />
            </div>
            <div className='flex items-center justify-end mt-[10px] gap-2'>
              <Text className='text-right text-[10px] md:text-[18px] text-co-gray-7 font-bold'>
                {t('accountBalance')} : {formattedBalance} MLP
              </Text>
              <Button
                size='sm'
                className='p-1 rounded-[32px] text-[12px] md:text-[14px] font-bold'
                disabled={!balanceData?.value}
                onClick={() => setAmount(formattedBalance)}
              >
                {t('max')}
              </Button>
            </div>
          </div>
          <Button
            className='px-3 py-2 md:p-[10px] w-[130px] md:w-[320px] rounded-[32px] text-[12px]
              md:text-[16px] font-bold'
            onClick={() => {
              if (amount === '') {
                return
              }
              return onConfirm && onConfirm({ amount })
            }}
            isLoading={isConfirmLoading?.[ModalType.ACCELERATE_NFT_POOL_MODAL]}
          >
            {t('AccelerateNFTBoostedPool.confirm')}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
