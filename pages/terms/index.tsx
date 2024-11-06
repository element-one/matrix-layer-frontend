import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Container, Content } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const TermsPage = () => {
  const t = useTranslations('Terms')

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[150px] md:pt-[220px] pb-[100px]'>
            <Text
              as='h1'
              className='text-4xl md:text-5xl font-bold mb-8 text-white'
            >
              {t('termsAndConditions')}
            </Text>
            <div className='max-w-3xl mx-auto text-gray-300'>
              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-1.title')}
                </Text>
                <Text>{t('term-1.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-2.title')}
                </Text>
                <Text>{t('term-2.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-3.title')}
                </Text>
                <Text>{t('term-3.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-4.title')}
                </Text>
                <Text>{t('term-4.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-5.title')}
                </Text>
                <Text>{t('term-5.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-6.title')}
                </Text>
                <Text>{t('term-6.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-7.title')}
                </Text>
                <Text>{t('term-7.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-8.title')}
                </Text>
                <Text>{t('term-8.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-9.title')}
                </Text>
                <Text>{t('term-9.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-10.title')}
                </Text>
                <Text>{t('term-10.content')}</Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  {t('term-11.title')}
                </Text>
                <Text>
                  {t.rich('term-11.content', {
                    email: (chunks) => (
                      <Link
                        href='mailto:info@matrixlayer.ai'
                        className='text-blue-500 hover:underline'
                        target='_blank'
                      >
                        {chunks}
                      </Link>
                    )
                  })}
                </Text>
              </section>
            </div>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default TermsPage
