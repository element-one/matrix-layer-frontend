import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import Layout from '@components/Layout/Layout'

export const CompensationGuidePage = () => {
  const t = useTranslations('CompensationPlan')

  const [, setTimeLeft] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval)
          router.push('/')
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  return (
    <Layout
      className='overflow-y-hidden relative bg-black max-w-screen h-screen flex flex-col gap-4
        items-center justify-center'
    >
      <div className='text-center text-lg font-pressStart2P leading-none'>
        {t('notEligible')}
      </div>
    </Layout>
  )
}
