import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { useAccount } from 'wagmi'

import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { ModalType, useModal } from '@contexts/modal'
import { useGetProductSales } from '@services/api'
import { ProductEnum } from '@utils/payment'

const pageVariants = {
  enter: (currentPage: 'product' | 'ai-agent-nft') => ({
    x: currentPage === 'product' ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (currentPage: 'product' | 'ai-agent-nft') => ({
    x: currentPage === 'product' ? '100%' : '-100%',
    opacity: 0
  })
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.2
}

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-text-1'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#000,#000),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const ProductPage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const t = useTranslations('Presale')

  const [currentPage, setCurrentPage] = useState<'product' | 'ai-agent-nft'>(
    tab === 'nft' ? 'ai-agent-nft' : 'product'
  )
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (tab) {
      setCurrentPage(tab === 'nft' ? 'ai-agent-nft' : 'product')
    }
  }, [tab])

  const router = useRouter()

  const { isConnected } = useAccount()
  const { showModal } = useModal()

  const { data: productSalesData } = useGetProductSales()

  const handleToCheckout = (type: string) => () => {
    if (isConnected) {
      router.push(`/checkout?type=${type}`)
    } else {
      showModal(ModalType.CONNECT_WALLET_MODAL)
    }
  }

  const paginate = useCallback(
    (newPage: 'product' | 'ai-agent-nft') => setCurrentPage(newPage),
    []
  )

  const PageContent = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <motion.div
        custom={currentPage}
        variants={pageVariants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={pageTransition}
      >
        {children}
      </motion.div>
    ),
    [currentPage]
  )

  const TabButton = useCallback(
    ({ page }: { page: 'product' | 'ai-agent-nft' }) => {
      return (
        <Button
          color={currentPage === page ? 'primary' : 'secondary'}
          variant={currentPage === page ? 'faded' : 'light'}
          className={`focus:bg-gradient-button-1 border-none rounded-[30px] min-w-[140px] flex-1
            w-auto sm:w-[200px] h-[33px] sm:h-12 text-[18px] sm:text-[22px] font-semibold ${
              currentPage === page ? 'text-black' : 'text-white'
            }`}
          onClick={() => paginate(page)}
        >
          {page === 'product' ? t('tabs.product') : t('tabs.ai-agent-nft')}
        </Button>
      )
    },
    [currentPage, paginate, t]
  )

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container
        className='overflow-visible pb-[38px] border-b-0 sm:border-b
          border-[rgba(102,102,102,0.40)]'
      >
        <TopSectionBackground />
        <Content>
          <div className='flex flex-col items-center justify-center pt-[122px] sm:pt-[220px]'>
            <Text className='mb-[17px] sm:mb-5 font-pressStart2P text-white text-2xl'>
              PRE-SALE
            </Text>
            <div
              className={`flex p-2.5 sm:p-2 gap-[30px] border-2 rounded-[40px] ${gradientBorderClass}`}
            >
              <TabButton page='product' />
              <TabButton page='ai-agent-nft' />
            </div>
          </div>
        </Content>
      </Container>
      <AnimatePresence initial={false} custom={currentPage} mode='wait'>
        {currentPage === 'product' && (
          <PageContent key='product'>
            <div className=''>
              <Container>
                <Content>
                  <div className='flex justify-between items-center pt-6 sm:pt-[171px]'>
                    <div className='flex flex-col gap-2.5 sm:gap-5 max-w-[153px] sm:max-w-[612px]'>
                      <Text
                        className='text-white text-[14px] sm:text-[28px] font-semibold leading-normal
                          tracking-[2.8px] uppercase whitespace-nowrap'
                      >
                        {t('product.section1.subtitle')}
                      </Text>
                      <Text className='text-white text-[18px] sm:text-7xl font-semibold'>
                        MATRIX <br />
                        LAYER PHONE
                      </Text>
                      <Text
                        className='text-[12px] sm:text-base font-semibold text-gray-a5 pr-0 sm:pr-[20px]
                          line-clamp-3'
                      >
                        {t('product.section1.info')}
                      </Text>
                      <div className='flex items-end gap-2 sm:gap-4'>
                        <Text
                          className={`text-[48px] sm:text-[98px] leading-[1.2] ${gradientTextClass}`}
                          size='extrabold'
                        >
                          $699
                        </Text>
                        {!!productSalesData?.phone?.soldQuantity && (
                          <Text className='text-gray-a5 text-[12px] sm:text-base mb-2 sm:mb-6 italic text-nowrap'>
                            {t('product.section1.sold', {
                              quantity: productSalesData.phone.soldQuantity
                            })}
                          </Text>
                        )}
                      </div>
                      <Button
                        className='rounded-[35px] h-12 text-base font-semibold w-[218px] z-10'
                        onClick={handleToCheckout(ProductEnum.PHONE)}
                      >
                        {isConnected
                          ? t('product.section1.order')
                          : t('product.section1.connectToOrder')}
                      </Button>
                    </div>
                    <div className='sm:relative absolute -right-[70px] sm:right-auto top-6 sm:top-auto'>
                      <img
                        className='w-[226px] sm:w-[456px] h-[259px] sm:h-[521px]'
                        src='/images/product/phone21.png'
                        alt='phone21'
                      />
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/90'></div>
                    </div>
                  </div>
                </Content>
              </Container>
              <Container className='mt-[58px]'>
                <ImagesField className='hidden'>
                  <img
                    className='w-screen absolute top-[50px] left-0'
                    src='/images/product/product-content-mask.png'
                    alt='product-content-mask'
                  />
                  <img
                    className='w-dvw absolute -top-[504px] left-0'
                    src='/images/product/product-content-bg.png'
                    alt='product-content-bg'
                  />
                  <div
                    className='absolute -right-[350px] top-[200px] w-[780.298px] h-[563px] rotate-[-44.461deg]
                      flex-shrink-0 rounded-[780.298px] opacity-50 blur-[150px]
                      bg-[radial-gradient(50%_50%_at_50%_50%,_#A2A2A2_0%,_rgba(162,162,162,0.50)_100%)]'
                  />
                  <img
                    className='absolute top-[260px] w-[156px] -right-[20px] -rotate-[20deg]'
                    src='/images/product/product-dot.png'
                    alt='dot'
                  />
                </ImagesField>
                <Content>
                  <div className='flex justify-between items-center'>
                    <div className='gap-[54px] hidden sm:flex'>
                      <img
                        className='h-[554px]'
                        src='/images/product/phone4.png'
                        alt='phone4'
                      />
                      <img
                        className='h-[554px]'
                        src='/images/product/phone-side.png'
                        alt='phone-side'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex sm:flex-col flex-row items-center sm:items-start gap-x-[14px]'>
                        <Text
                          className='text-[12px] sm:text-[28px] flex-1 pl-1 sm:pl-0'
                          size='bold'
                        >
                          {t('product.section2.subtitle')}
                        </Text>
                        <Text
                          className={`text-[24px] sm:text-[64px] flex-1 pl-1 sm:pl-0 ${gradientTextClass}`}
                          size='bold'
                        >
                          {t('product.section2.title')}
                        </Text>
                      </div>
                      <div className='grid grid-cols-2 sm:grid-cols-1 gap-x-5'>
                        <div className='gap-5 flex sm:hidden'>
                          <img
                            className='h-[255px]'
                            src='/images/product/phone4.png'
                            alt='phone4'
                          />
                          <img
                            className='h-[255px]'
                            src='/images/product/phone-side.png'
                            alt='phone-side'
                          />
                        </div>
                        <div>
                          <div
                            className='py-0 sm:py-[20px] grid grid-cols-1 sm:grid-cols-[198px_198px_256px] gap-[7px]
                              sm:gap-[20px] border-b-0 sm:border-b border-[rgba(102,102,102,0.40)]'
                          >
                            {[
                              [
                                t('product.section2.dimensions.name'),
                                t('product.section2.dimensions.value')
                              ],
                              [
                                t('product.section2.operationSystem.name'),
                                t('product.section2.operationSystem.value')
                              ],
                              [
                                t('product.section2.display.name'),
                                t('product.section2.display.value')
                              ]
                            ].map((item) => (
                              <div
                                key={item[0]}
                                className='flex flex-col gap-1 sm:gap-5 col-span-1 border-b sm:border-0
                                  border-[rgba(102,102,102,0.40)] pb-[7px] sm:pb-0'
                              >
                                <Text className='text-[12px] sm:text-xl'>
                                  {item[0]}
                                </Text>
                                <Text className='text-[12px] sm:text-xl text-gray-a5'>
                                  {item[1]}
                                </Text>
                              </div>
                            ))}
                          </div>
                          <div
                            className='py-0 sm:py-[20px] grid grid-cols-1 sm:grid-cols-[198px_198px_256px] gap-[7px]
                              sm:gap-[20px] border-b-0 sm:border-b border-[rgba(102,102,102,0.40)]'
                          >
                            {[
                              [
                                t('product.section2.batteryCapacity.name'),
                                t('product.section2.batteryCapacity.value')
                              ],
                              [
                                t('product.section2.gpu.name'),
                                t('product.section2.gpu.value')
                              ]
                            ].map((item) => (
                              <div
                                key={item[0]}
                                className='flex flex-col gap-1 sm:gap-5 col-span-1 border-b sm:border-0
                                  border-[rgba(102,102,102,0.40)] pb-[7px] sm:pb-0'
                              >
                                <Text className='text-[12px] sm:text-xl'>
                                  {item[0]}
                                </Text>
                                <Text className='text-[12px] sm:text-xl text-gray-a5'>
                                  {item[1]}
                                </Text>
                              </div>
                            ))}
                            <div className='hidden sm:flex flex-col gap-1 sm:gap-5'>
                              <Text className='text-[12px] sm:text-xl'>
                                {t('product.section2.cpu.name')}
                              </Text>
                              <Text className='text-[12px] sm:text-base text-gray-a5'>
                                {isClient && (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: t('product.section2.cpu.value')
                                    }}
                                  />
                                )}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='py-[7px] sm:py-[20px] grid-cols-2 sm:grid-cols-1 grid gap-[7px] sm:gap-[20px]
                          border-b-0 sm:border-b border-[rgba(102,102,102,0.40)]'
                      >
                        <div className='sm:hidden flex-col gap-1 sm:gap-5'>
                          <Text className='text-[12px] sm:text-xl'>
                            {t('product.section2.cpu.name')}
                          </Text>
                          <Text className='text-[12px] sm:text-base text-gray-a5'>
                            {isClient && (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: t('product.section2.cpu.value')
                                }}
                              />
                            )}
                          </Text>
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-5'>
                          <Text className='text-[12px] sm:text-xl'>
                            {t('product.section2.simCard.name')}
                          </Text>
                          <Text className='text-[12px] sm:text-base text-gray-a5'>
                            {isClient && (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: t('product.section2.simCard.value')
                                }}
                              />
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Content>
              </Container>
              <Container className='pb-32'>
                <Content className='relative'>
                  <img
                    className='hidden sm:inline-flex rotate-[276deg] absolute top-[140px] left-[28px] w-[156px]
                      h-[156px] blur-[4.6px]'
                    src='/images/product/product-dot.png'
                    alt='dot'
                  />
                  <div className='relative z-20 pt-10 sm:pt-[58px] flex flex-col items-center'>
                    <Text
                      className={`text-[24px] sm:text-[64px] ${gradientTextClass}`}
                      size='bold'
                    >
                      {t('product.benefits.title')}
                    </Text>
                    <div className='mt-10 grid justify-center grid-cols-1 sm:grid-cols-[534px_554px] gap-[20px]'>
                      {[
                        {
                          key: 'tokens',
                          img: '/images/svg/building-token.svg'
                        },
                        {
                          key: 'experience',
                          img: '/images/svg/mining-experience.svg'
                        },
                        {
                          key: 'airdrops',
                          img: '/images/svg/bitcoin.svg'
                        },
                        {
                          key: 'node',
                          img: '/images/svg/platform-node.svg'
                        }
                      ].map((item) => (
                        <div
                          key={item.key}
                          className={`bg-black flex gap-5 sm:gap-8 px-2.5 py-2.5 sm:px-5 rounded-[10px]
                            sm:rounded-[40px] items-center border-1 ${gradientBorderClass}`}
                        >
                          <img
                            src={item.img}
                            alt={item.key}
                            className='w-12 sm:w-[64px] shrink-0'
                          />
                          <div className='flex flex-col gap-1 sm:gap-[10px]'>
                            <Text
                              className={`text-[16px] sm:text-[22px] ${gradientTextClass}`}
                              size='extrabold'
                            >
                              {t(`product.benefits.${item.key}.title` as any)}
                            </Text>
                            <Text
                              size='extrabold'
                              className='text-[12px] sm:text-base'
                            >
                              {t(
                                `product.benefits.${item.key}.description` as any
                              )}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Text
                      className='text-center text-[12px] sm:text-[22px] mt-5 sm:mt-10 max-w-[1107px]
                        shadow-[0px_4px_4px_rgba(0,0,0,0.25)] pb-32'
                      size='bold'
                    >
                      {t('product.benefits.bottom')}
                    </Text>
                  </div>
                </Content>
              </Container>
            </div>
          </PageContent>
        )}
        {currentPage === 'ai-agent-nft' && (
          <PageContent key='ai-agent-nft'>
            <div>
              <Container className='pt-6 sm:pt-[160px] pb-[200px]'>
                <Content>
                  <Text
                    className='font-pressStart2P mb-[60px] sm:mb-[78px] text-center text-white text-[24px]
                      sm:text-7xl'
                    size='bold'
                  >
                    AI AGENT
                  </Text>
                  <div className='flex flex-col gap-5 sm:gap-12'>
                    {[
                      {
                        img: '/images/product/ai_agent_one.png',
                        price: '$199',
                        sold: productSalesData?.[ProductEnum.AGENT_ONE]
                          ?.soldQuantity,
                        key: ProductEnum.AGENT_ONE,
                        tKey: 'agentOne', // for i18n
                        tDescKey: ['desc1', 'desc2'] // for i18n
                      },
                      {
                        img: '/images/product/ai_agent_pro.png',
                        price: '$699',
                        sold: productSalesData?.[ProductEnum.AGENT_PRO]
                          ?.soldQuantity,
                        key: ProductEnum.AGENT_PRO,
                        tKey: 'agentPro', // for i18n
                        tDescKey: ['desc1', 'desc2', 'desc3'] // for i18n
                      },
                      {
                        img: '/images/product/ai_agent_ultra.png',
                        price: '$899',
                        sold: productSalesData?.[ProductEnum.AGENT_ULTRA]
                          ?.soldQuantity,
                        key: ProductEnum.AGENT_ULTRA,
                        tKey: 'agentUltra', // for i18n
                        tDescKey: ['desc1', 'desc2', 'desc3'] // for i18n
                      }
                    ].map((item) => (
                      <div key={item.key}>
                        <div className='flex items-center'>
                          <img
                            className='w-[121px] h-[121px] sm:w-[250px] sm:h-[250px] mr-[11px] sm:mr-10'
                            src={item.img}
                            alt={item.key}
                          />
                          <div className='grow w-full sm:w-[526px]'>
                            <Text
                              className={`mb-2 sm:mb-4 text-[18px] sm:text-5xl font-semibold ${gradientTextClass}
                                leading-tight`}
                              size='semibold'
                            >
                              {t(`aiAgent.${item.tKey}.title` as any)}
                            </Text>
                            {/* show smaller than sm */}
                            <div className='sm:hidden flex-col items-start'>
                              <div className='flex items-end gap-2 sm:gap-4'>
                                <Text
                                  className={`text-[24px] mb-2 ${gradientTextClass}`}
                                  size='bold'
                                >
                                  {item.price}
                                </Text>
                                {!!item.sold && (
                                  <Text className='text-gray-a5 text-[12px] mb-[14px] italic text-nowrap'>
                                    {t('aiAgent.sold', { quantity: item.sold })}
                                  </Text>
                                )}
                              </div>
                              <Button
                                className='rounded-[35px] w-full h-7 text-[12px] font-semibold'
                                onClick={handleToCheckout(item.key)}
                              >
                                {isConnected
                                  ? t('aiAgent.orderNow')
                                  : t('aiAgent.connectToOrder')}
                              </Button>
                            </div>
                            {/* show larger than sm */}
                            <ul className='hidden sm:block list-disc klist-outside pl-8 text-[22px] max-w-[526px]'>
                              {item.tDescKey.map((key) => {
                                const desc = t(
                                  `aiAgent.${item.tKey}.${key}` as any
                                )
                                return <li key={desc}>{desc}</li>
                              })}
                            </ul>
                          </div>
                          {/* show larger than sm */}
                          <div className='hidden sm:flex flex-col items-end'>
                            <div className='flex items-end gap-2 sm:gap-4'>
                              {!!item.sold && (
                                <Text className='text-gray-a5 text-[12px] text-base mb-6 italic text-nowrap'>
                                  {t('aiAgent.sold', { quantity: item.sold })}
                                </Text>
                              )}
                              <Text
                                className={`text-[82px] ${gradientTextClass}`}
                                size='bold'
                              >
                                {item.price}
                              </Text>
                            </div>
                            <Button
                              className='rounded-[35px] h-12 text-base font-semibold w-[218px]'
                              onClick={handleToCheckout(item.key)}
                            >
                              {isConnected
                                ? t('aiAgent.orderNow')
                                : t('aiAgent.connectToOrder')}
                            </Button>
                          </div>
                        </div>
                        {/* show smaller than sm */}
                        <ul className='mt-[15px] sm:hidden list-disc klist-outside pl-8 w-full text-[12px]'>
                          {item.tDescKey.map((key) => {
                            const desc = t(`aiAgent.${item.tKey}.${key}` as any)
                            return <li key={desc}>{desc}</li>
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Content>
              </Container>
            </div>
          </PageContent>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default ProductPage
