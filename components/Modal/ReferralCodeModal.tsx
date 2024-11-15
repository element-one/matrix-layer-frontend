import { ChangeEventHandler, FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import clsx from 'clsx'
import { useSignMessage } from 'wagmi'

import { Button } from '@components/Button'
import { ModalType, useModal } from '@contexts/modal'
import { usePatchReferralCode } from '@services/api'

export interface ReferralCodeModalProps {
  onClose?: () => void
  onSkip?: () => void
  onVerifySuccess?: () => void
  code?: string
  userHasReferred?: boolean
}

export const ReferralCodeModal: FC<ReferralCodeModalProps> = ({
  onClose,
  onSkip,
  onVerifySuccess,
  code,
  userHasReferred
}) => {
  const t = useTranslations('ReferralCodeModal')

  const [referralCode, setReferralCode] = useState<string | undefined>(code)
  const { hideModal, isModalShown } = useModal()
  const [verifySuccess, setVerifySuccess] = useState(false)
  const { signMessage } = useSignMessage()

  const { mutate: patchReferralCode, isPending } = usePatchReferralCode(
    referralCode ?? '',
    {
      onSuccess() {
        onVerifySuccess?.()
        setVerifySuccess(true)
        setTimeout(() => {
          handleClose()
        }, 3000)
      },
      onError(err) {
        console.log('patch referral code error:', err)
        toast.error('Invalid referral code')
      }
    }
  )

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  const handleSkip = () => {
    onSkip?.()
    hideModal()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setReferralCode(e.target.value.toLowerCase())
  }

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

  return (
    <Modal
      isOpen={isModalShown(ModalType.REFERRAL_CODE_MODAL)}
      onClose={handleSkip}
      isDismissable={false}
      size='xl'
      placement='center'
      classNames={{
        closeButton:
          'right-12 top-12 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-co-bg-1 border border-co-border-gray'>
        <ModalBody>
          <div className='flex flex-col gap-5 items-center py-10 px-6 text-co-text-1'>
            <div className='text-xl leading-9'>{t('referralCode')}</div>
            <div className='w-full flex flex-col gap-y-4 pt-[100px] pb-[60px]'>
              <input
                placeholder='12345678'
                value={referralCode?.toUpperCase()}
                onChange={handleChange}
                className='rounded-full px-6 h-[52px] text-xl leading-9 placeholder:text-co-text-gray
                  text-co-text-black'
              />
              <Button
                color='primary'
                disabled={!referralCode || userHasReferred}
                className={clsx(
                  'h-[52px] font-semibold text-xl',
                  !referralCode ? 'bg-[url(/)] bg-co-gray-3' : ''
                )}
                isLoading={isPending}
                onClick={handleVerify}
              >
                {t('verify')}
              </Button>
              {userHasReferred && (
                <div className='text-co-text-success text-xs text-center md:text-sm font-semibold leading-6'>
                  {t('hadReferrer')}
                </div>
              )}
              {verifySuccess ? (
                <div className='text-co-text-success text-xs text-center md:text-sm font-semibold leading-6'>
                  {t('hadReferrer')}
                </div>
              ) : (
                <div
                  className='text-base leading-6 px-4 mx-auto underline cursor-pointer'
                  onClick={handleSkip}
                >
                  {userHasReferred ? t('back') : t('skip')}
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
