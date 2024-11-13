import { useTranslations } from 'next-intl'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'
import { CompensationOverallCard } from '@components/CompensationPlan/CompensationOverallCard'
import { CompensationTable } from '@components/CompensationPlan/CompenstationTable'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'

const sectionContainerClass =
  'flex flex-col gap-y-3 border-b border-co-gray-1 py-16'
const sectionTitle = 'font-semibold text-co-gray-7 text-xl'

const CompensationPlan = () => {
  const t = useTranslations('CompensationPlan')

  const { address } = useAccount()

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push('/')
  //   }
  // }, [isConnected, router])

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
              <div className='text-lg flex-1 break-words'>{address ?? '-'}</div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <CompensationOverallCard
                title={t('summary.totalCompensate')}
                info='30,000'
              />
              <CompensationOverallCard
                title={t('summary.unlock')}
                info='Jan 18, 2025'
                tipInfo={t('summary.unlockTip')}
              />
              <CompensationOverallCard title={t('summary.totalClaimed')} />
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
            <div className='flex flex-col md:flex-row lg:items-center items-start justify-start gap-2'>
              <div className='flex gap-1'>
                <Text className={sectionTitle}>{t('tables.title')}</Text>
                <div className='text-lg'>8888.88</div>
              </div>
              <Button
                color='primary'
                className='w-fit h-fit !rounded-full text-md ml-0 lg:ml-2'
              >
                {t('tables.claimAll')}
              </Button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <CompensationTable title={t('tables.releaseHistory')} />
              <CompensationTable title={t('tables.claimHistory')} />
            </div>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default CompensationPlan
