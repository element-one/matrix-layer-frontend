import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce } from 'react-use'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Spinner } from '@nextui-org/react'
import { useAccount } from 'wagmi'

import Layout from '@components/Layout/Layout'
import { ModalType, useModal } from '@contexts/modal'
import { useGetUser } from '@services/api'

const ReferralPage: NextPage = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const { isConnected, address } = useAccount()
  const { showModal, isModalShown } = useModal()
  const { data: userData, isLoading } = useGetUser(address, {
    enabled: !!address
  })
  const [skipReferral, setSkipReferral] = useState(false)
  const [verifySuccess, setVerifySuccess] = useState(false)
  const router = useRouter()

  const handleSkip = useCallback(() => {
    setSkipReferral(true)
    router.push('/')
  }, [router])

  const handleVerifySuccess = useCallback(() => {
    setVerifySuccess(true)
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [router])

  useDebounce(
    () => {
      if (!isConnected) {
        showModal(ModalType.CONNECT_WALLET_MODAL)
      }
    },
    500,
    [isConnected, showModal]
  )

  useDebounce(
    () => {
      if (skipReferral || verifySuccess) {
        return
      }

      if (
        isConnected &&
        userData &&
        !userData?.referredBy &&
        !isModalShown(ModalType.REFERRAL_CODE_MODAL)
      ) {
        showModal(ModalType.REFERRAL_CODE_MODAL, {
          code: code ?? undefined,
          onSkip: handleSkip,
          onVerifySuccess: handleVerifySuccess,
          userHasReferred: !!userData?.referredByUserAddress
        })
      } else if (userData?.referredBy) {
        toast.info('You already have a reference')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    },
    500,
    [
      code,
      skipReferral,
      isConnected,
      showModal,
      userData,
      isModalShown,
      handleSkip,
      verifySuccess
    ]
  )

  return (
    <Layout>
      <div className='w-full flex items-center justify-center h-[80vh]'>
        {isLoading && <Spinner />}
      </div>
    </Layout>
  )
}

export default ReferralPage
