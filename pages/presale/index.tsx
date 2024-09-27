import { useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'
import { TopSectionBackground } from '@components/TopSectionBackground/TopSectionBackground'
import { useAuth } from '@contexts/auth'

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
  const [currentPage, setCurrentPage] = useState<'product' | 'ai-agent-nft'>(
    'product'
  )

  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleToCheckout = () => {
    if (!isAuthenticated) return
    router.push('/checkout')
  }

  const paginate = (newPage: 'product' | 'ai-agent-nft') =>
    setCurrentPage(newPage)

  const PageContent = ({ children }: { children: React.ReactNode }) => (
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
  )

  const TabButton = ({ page }: { page: 'product' | 'ai-agent-nft' }) => (
    <Button
      color={currentPage === page ? 'primary' : 'secondary'}
      variant={currentPage === page ? 'faded' : 'light'}
      className={`focus:bg-gradient-button-1 border-none rounded-[30px] w-[200px] h-12 text-[22px]
        font-semibold ${currentPage === page ? 'text-black' : 'text-white'}`}
      onClick={() => paginate(page)}
    >
      {page === 'product' ? 'PRODUCT' : 'AI AGENT NFT'}
    </Button>
  )

  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <TopSectionBackground />
        <Content>
          <div className='flex flex-col items-center justify-center pt-[220px]'>
            <Text className='mb-5 font-pressStart2P text-white text-2xl'>
              PRE-SALE
            </Text>
            <div
              className={`flex p-2 gap-[30px] border-2 rounded-[40px] ${gradientBorderClass}`}
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
                  <div className='flex justify-between items-center pt-[171px]'>
                    <div className='flex flex-col gap-5 max-w-[612px]'>
                      <Text className='text-white text-[28px] font-semibold leading-normal tracking-[2.8px] uppercase'>
                        mobile hardware
                      </Text>
                      <Text className='text-white text-7xl font-semibold'>
                        MATRIX <br />
                        LAYER PROTOCOL
                      </Text>
                      <Text className='text-base font-semibold text-gray-a5 pr-[20px]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean ornare mattis risus, eget condimentum nibh
                        ultrices ut. Phasellus tempor accumsan eros. Proin odio
                        turpis, tristique eu tortor vulputate, sagittis suscipit
                        massa.
                      </Text>
                      <Text
                        className={`text-[98px] leading-[1.2] ${gradientTextClass}`}
                        size='extrabold'
                      >
                        $699
                      </Text>
                      <Button
                        className='rounded-[35px] h-12 text-base font-semibold w-[218px]'
                        onClick={handleToCheckout}
                      >
                        {isAuthenticated
                          ? 'Order Now'
                          : 'Connect Wallet to Order'}
                      </Button>
                    </div>
                    <div className='relative'>
                      <img
                        className='w-[456px] h-[521px]'
                        src='/images/product/phone21.png'
                        alt='phone21'
                      />
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/90'></div>
                    </div>
                  </div>
                </Content>
              </Container>
              <Container className='mt-[58px]'>
                <ImagesField>
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
                    <div className='flex gap-[54px]'>
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
                      <Text className='text-[28px]' size='bold'>
                        MATRIX LAYER PROTOCOL
                      </Text>
                      <Text
                        className={`text-[64px] ${gradientTextClass}`}
                        size='bold'
                      >
                        Spesification
                      </Text>
                      <div
                        className='py-[20px] grid grid-cols-[198px_198px_256px] gap-[20px] border-b
                          border-[rgba(102,102,102,0.40)]'
                      >
                        {[
                          ['Dimensions', '162.23x73.6x8.55 mm'],
                          ['Operating System', 'Based on Android 14'],
                          ['Display', 'AMOLED 6.67 inches, 120Hz']
                        ].map((item) => (
                          <div key={item[0]} className='flex flex-col gap-5'>
                            <Text className='text-xl'>{item[0]}</Text>
                            <Text className='text-xl text-gray-a5'>
                              {item[1]}
                            </Text>
                          </div>
                        ))}
                      </div>
                      <div
                        className='py-[20px] grid grid-cols-[198px_198px_256px] gap-[20px] border-b
                          border-[rgba(102,102,102,0.40)]'
                      >
                        {[
                          ['Battery Capacity', '5050mAh'],
                          ['GPU', 'Arm Mali-G57']
                        ].map((item) => (
                          <div key={item[0]} className='flex flex-col gap-5'>
                            <Text className='text-xl'>{item[0]}</Text>
                            <Text className='text-xl text-gray-a5'>
                              {item[1]}
                            </Text>
                          </div>
                        ))}
                        <div className='flex flex-col gap-5'>
                          <Text className='text-xl'>CPU</Text>
                          <Text className='text-base text-gray-a5'>
                            MTK-G992 * 2A76 <br />@ 2.0GHz + 6A55 @ 2.0GHz
                          </Text>
                        </div>
                      </div>
                      <div className='py-[20px] grid border-b border-[rgba(102,102,102,0.40)]'>
                        <div className='flex flex-col gap-5'>
                          <Text className='text-xl'>SIM Cards</Text>
                          <Text className='text-base text-gray-a5'>
                            Dual SIM
                            <br /> (Nano SIM, dual standby)
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
                    className='rotate-[276deg] absolute top-[140px] left-[28px] w-[156px] h-[156px]
                      blur-[4.6px]'
                    src='/images/product/product-dot.png'
                    alt='dot'
                  />
                  <div className='relative z-20 pt-[58px] flex flex-col items-center'>
                    <Text
                      className={`text-[64px] ${gradientTextClass}`}
                      size='bold'
                    >
                      User Benefits
                    </Text>
                    <div className='mt-10 grid justify-center grid-cols-[534px_554px] gap-[20px]'>
                      {[
                        {
                          img: '/images/svg/building-token.svg',
                          title: 'Built-in Tokens',
                          description:
                            'Each phone comes pre-installed with 10,000 $WPN tokens, to be released linearly over a period of 3 years.'
                        },
                        {
                          img: '/images/svg/mining-experience.svg',
                          title: 'Mining Experience',
                          description:
                            'Phone holders are granted 30 days of basic pool mining rights (a limited-time offer), with mining speeds matching that of AI Agent One'
                        },
                        {
                          img: '/images/svg/bitcoin.svg',
                          title: 'Ecosystem Token Airdrops',
                          description:
                            'Holders of the phone are eligible for future ecosystem token airdrops across the entire chain'
                        },
                        {
                          img: '/images/svg/platform-node.svg',
                          title: 'Platform Node',
                          description:
                            'The phone serves as a platform node, participating in network operations'
                        }
                      ].map((item) => (
                        <div
                          key={item.title}
                          className={`bg-black flex gap-8 px-[20px] py-[10px] rounded-[40px] items-center border-1
                            ${gradientBorderClass}`}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            className='w-[64px] shrink-0'
                          />
                          <div className='flex flex-col gap-[10px]'>
                            <Text
                              className={`text-[22px] ${gradientTextClass}`}
                              size='extrabold'
                            >
                              {item.title}
                            </Text>
                            <Text size='extrabold' className='text-base'>
                              {item.description}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Text
                      className='text-center text-[22px] mt-10 max-w-[1107px]
                        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                      size='bold'
                    >
                      The actual specifications of the delivered product may
                      differ from the official descriptions due to material
                      supply constraints and other uncontrollable factors.
                      MetaLink reserves the right to make changes to the product
                      specifications without prior notice.
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
              <Container className='pt-[160px] pb-[200px]'>
                <Content>
                  <Text
                    className='mb-[78px] text-center text-white text-7xl'
                    size='bold'
                  >
                    AI AGENT
                  </Text>
                  <div className='flex flex-col gap-12'>
                    {[
                      {
                        title: 'AI Agent One',
                        img: '/images/product/ai_agent_one.png',
                        descriptionList: [
                          'Purchase $699 worth of $WPN to activate the NFT (the tokens will be burned after activation).',
                          'Unlocks basic pool mining',
                          'Mining coefficient: 1'
                        ],
                        price: '$699'
                      },
                      {
                        title: 'AI Agent Pro',
                        img: '/images/product/ai_agent_pro.png',
                        descriptionList: [
                          'Purchase $899 worth of $WPN to activate the NFT (the tokens will be burned after activation).',
                          'Unlocks basic pool mining',
                          'Mining coefficient: 1.2'
                        ],
                        price: '$899'
                      },
                      {
                        title: 'AI Agent Ultra',
                        img: '/images/product/ai_agent_ultra.png',
                        descriptionList: [
                          'Purchase $1299 worth of $WPN to activate the NFT (the tokens will be burned after activation).',
                          'Unlocks basic pool mining',
                          'Mining coefficient: 1.5'
                        ],
                        price: '$1299'
                      }
                    ].map((item) => (
                      <div key={item.title} className='flex items-center'>
                        <img
                          className='w-[250px] h-[250px] mr-10'
                          src={item.img}
                          alt={item.title}
                        />
                        <div className='grow w-[526px]'>
                          <Text
                            className={`mb-4 text-5xl font-semibold ${gradientTextClass} leading-tight`}
                            size='semibold'
                          >
                            {item.title}
                          </Text>
                          <ul className='list-disc klist-outside pl-8 text-[22px] max-w-[526px]'>
                            {item.descriptionList.map((description) => (
                              <li key={description}>{description}</li>
                            ))}
                          </ul>
                        </div>
                        <div className='flex flex-col items-end'>
                          <Text
                            className={`text-[82px] ${gradientTextClass}`}
                            size='bold'
                          >
                            {item.price}
                          </Text>
                          <Button
                            className='rounded-[35px] h-12 text-base font-semibold w-[218px]'
                            onClick={handleToCheckout}
                          >
                            {isAuthenticated
                              ? 'Order Now'
                              : 'Connect Wallet to Order'}
                          </Button>
                        </div>
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
