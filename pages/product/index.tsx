import { Button } from '@nextui-org/react'

import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const bgGradient =
  'linear-gradient(to bottom, rgba(231, 137, 255, 1) 0%, rgba(146, 153, 255, 1) 100%)'
const gradientTextStyle = {
  background: 'linear-gradient(180deg, #E789FF 0%, #9299FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const ProductPage = () => {
  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <ImagesField>
          <img
            className='w-screen absolute top-0 left-0'
            src='/images/product/product-top.png'
            alt='product-top'
          />
          <img
            className='rotate-[276deg] absolute top-[140px] -right-[28px] w-[156px] h-[156px]'
            style={{
              filter: 'blur(4.6px)'
            }}
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
          <img
            className='absolute rotate-[45deg] top-[300px] -left-[73px] w-[245px] h-[245px]'
            src='/images/product/product-dot.png'
            alt='product-dot'
          />
        </ImagesField>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[220px]'>
            <Text className='mb-5 font-pressStart2P text-white text-2xl'>
              PRE-SALE
            </Text>
            <div
              className='flex p-2 gap-[30px]'
              style={{
                border: '2px solid transparent',
                borderRadius: '40px',
                backgroundClip: 'padding-box, border-box',
                backgroundOrigin: 'padding-box, border-box',
                backgroundImage:
                  'linear-gradient(to right, #000, #000), linear-gradient(to bottom, rgba(231, 137, 255, 1) 0%, rgba(146, 153, 255, 1) 100%)'
              }}
            >
              <Button
                color='primary'
                className='rounded-[30px] w-[200px] h-12 text-black text-[22px] font-bold'
                style={{
                  backgroundImage: bgGradient
                }}
              >
                PRODUCT
              </Button>
              <Button
                variant='light'
                color='secondary'
                className='text-white rounded-[30px] w-[200px] h-12 text-[22px] font-bold'
              >
                AI AGENT NFT
              </Button>
            </div>
          </div>
        </Content>
      </Container>
      <Container>
        <Content>
          <div className='flex justify-between items-center pt-[171px]'>
            <div className='flex flex-col gap-5 max-w-[563px]'>
              <Text className='text-white text-[28px] font-semibold leading-normal tracking-[2.8px] uppercase'>
                mobile hardware
              </Text>
              <Text className='text-white text-7xl font-bold'>WORLD PHONE</Text>
              <Text className='text-base font-bold text-[#A5A5A5]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                ornare mattis risus, eget condimentum nibh ultrices ut.
                Phasellus tempor accumsan eros. Proin odio turpis, tristique eu
                tortor vulputate, sagittis suscipit massa.
              </Text>
              <Text
                className='text-[98px]'
                size='extrabold'
                style={gradientTextStyle}
              >
                $699
              </Text>
              <Button
                color='primary'
                className='rounded-[30px] w-[191px] h-12 text-black text-[22px] font-bold'
                style={{
                  backgroundImage: bgGradient
                }}
              >
                ORDER NOW
              </Button>
            </div>
            <div className='relative'>
              <img
                className='w-[474px] h-[544px]'
                src='/images/product/phone21.png'
                alt='phone21'
              />
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .9) 100%)'
                }}
              ></div>
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
              flex-shrink-0 rounded-[780.298px] opacity-50'
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, #A2A2A2 0%, rgba(162, 162, 162, 0.50) 100%)',
              filter: 'blur(150px)'
            }}
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
                className='h-[553px]'
                src='/images/product/phone4.png'
                alt='phone4'
              />
              <img
                className='h-[553px]'
                src='/images/product/phone-side.png'
                alt='phone-side'
              />
            </div>
            <div className='flex flex-col'>
              <Text className='text-[28px]' size='bold'>
                WORLD PHONE
              </Text>
              <Text
                className='text-[64px]'
                size='bold'
                style={gradientTextStyle}
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
                    <Text className='text-xl text-[#A5A5A5]'>{item[1]}</Text>
                  </div>
                ))}
              </div>
              <div
                className='py-[20px] grid grid-cols-[198px_198px_256px] gap-[20px] border-b
                  border-[rgba(102,102,102,0.40)]'
              >
                {[
                  ['Battery Capacity', '5050mAh'],
                  ['GPU', '5050mAh']
                ].map((item) => (
                  <div key={item[0]} className='flex flex-col gap-5'>
                    <Text className='text-xl'>{item[0]}</Text>
                    <Text className='text-xl text-[#A5A5A5]'>{item[1]}</Text>
                  </div>
                ))}
                <div className='flex flex-col gap-5'>
                  <Text className='text-xl'>CPU</Text>
                  <Text className='text-base text-[#A5A5A5]'>
                    MTK-G992 * 2A76 @ 2.0GHz + 6A55 @ 2.0GHz
                  </Text>
                </div>
              </div>
              <div className='py-[20px] grid border-b border-[rgba(102,102,102,0.40)]'>
                <div className='flex flex-col gap-5'>
                  <Text className='text-xl'>SIM Cards</Text>
                  <Text className='text-base text-[#A5A5A5]'>
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
        <ImagesField>
          <img
            className='absolute top-[260px] w-[156px] -right-[20px] -rotate-[20deg]'
            src='/images/product/product-dot.png'
            alt='dot'
          />
        </ImagesField>
        <Content>
          <div className='pt-[58px] flex flex-col items-center'>
            <Text
              className='text-[64px] text-center'
              style={gradientTextStyle}
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
                  className='bg-black flex gap-8 px-[20px] py-[10px] border border-[rgba(102,102,102,0.40)]
                    rounded-[20px] items-center'
                  style={{
                    border: '1px solid transparent',
                    borderRadius: '40px',
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'padding-box, border-box',
                    backgroundImage:
                      'linear-gradient(to right, #000, #000), linear-gradient(to bottom, rgba(231, 137, 255, 1) 0%, rgba(146, 153, 255, 1) 100%)'
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className='w-[64px] shrink-0'
                  />
                  <div className='flex flex-col gap-[10px]'>
                    <Text
                      style={gradientTextStyle}
                      className='text-[22px]'
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
              className='text-center text-[22px] mt-10 max-w-[1107px]'
              style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
              size='bold'
            >
              The actual specifications of the delivered product may differ from
              the official descriptions due to material supply constraints and
              other uncontrollable factors. MetaLink reserves the right to make
              changes to the product specifications without prior notice.
            </Text>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default ProductPage
