import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce } from 'react-use'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import Layout from '@components/Layout/Layout'
import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { useGetMe } from '@services/api'

const ReferralPage: NextPage = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const { isAuthenticated } = useAuth()
  const { isConnected } = useAccount()
  const { showModal, isModalShown } = useModal()
  const { data: myData } = useGetMe()
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
      if (!isAuthenticated) {
        showModal(ModalType.CONNECT_WALLET_MODAL)
      }
    },
    500,
    [isAuthenticated, showModal]
  )

  useDebounce(
    () => {
      if (skipReferral || verifySuccess) {
        return
      }

      if (
        isAuthenticated &&
        isConnected &&
        !myData?.referredBy &&
        !isModalShown(ModalType.REFERRAL_CODE_MODAL)
      ) {
        showModal(ModalType.REFERRAL_CODE_MODAL, {
          code: code ?? undefined,
          onSkip: handleSkip,
          onVerifySuccess: handleVerifySuccess
        })
      } else if (myData?.referredBy) {
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
      isAuthenticated,
      isConnected,
      showModal,
      myData?.referredBy,
      isModalShown,
      handleSkip,
      verifySuccess
    ]
  )

  return (
    <Layout>
      <div></div>
    </Layout>
  )
}

export default ReferralPage
