import { motion } from 'framer-motion'

import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const Left_advantages = [
  {
    img: '/images/home/advantage_1.webp',
    text: 'Priority access to computing power'
  },
  {
    img: '/images/home/advantage_2.webp',
    text: 'Accelerated on-chain transaction verification'
  },
  {
    img: '/images/home/advantage_3.webp',
    text: 'Proactive verification mechanism'
  }
]

const Right_advantages = [
  {
    img: '/images/home/advantage_4.webp',
    text: 'Infrastructure construction'
  },
  {
    img: '/images/home/advantage_5.webp',
    text: 'Virtual/Physical Routers'
  },
  {
    img: '/images/home/advantage_6.webp',
    text: 'Market-based resource allocation mechanism'
  }
]

const Mobile_Advantages = [
  {
    img: '/images/home/advantage_1.webp',
    text: 'Priority access to computing power'
  },
  {
    img: '/images/home/advantage_4.webp',
    text: 'Infrastructure construction'
  },
  {
    img: '/images/home/advantage_2.webp',
    text: 'Accelerated on-chain transaction verification'
  },
  {
    img: '/images/home/advantage_5.webp',
    text: 'Virtual/Physical Routers'
  },
  {
    img: '/images/home/advantage_3.webp',
    text: 'Proactive verification mechanism'
  },
  {
    img: '/images/home/advantage_6.webp',
    text: 'Market-based resource allocation mechanism'
  }
]

const HomePage = () => {
  return (
    <Layout className='relative bg-black max-w-screen'>
      <Container>
        <ImagesField>
          <img
            className='absolute w-[160px] left-0 top-0 lg:w-[325px] z-20'
            src='/images/home/home_float_1.webp'
            alt='home_float_1'
          />
          <img
            className='hidden lg:block absolute top-0 right-0 w-screen z-10'
            src='/images/home/home_bg_3.webp'
            alt='home-bg-2'
          />
          <img
            className='absolute left-0 top-[300px] lg:top-[213px] w-screen z-5'
            src='/images/home/home_bg_2.webp'
            alt='home-bg-2'
          />
        </ImagesField>
        <Content>
          <div
            className='flex flex-col gap-y-[20px] pt-[220px] lg:pt-[280px] pb-[120px] lg:pb-[232px]
              lg:w-[965px] mx-auto'
          >
            <Text
              className='text-[22px] lg:text-[48px] leading-none text-center bg-gradient-home-text-1
                clip-text'
            >
              Unleash the Web3 Potential,
            </Text>
            <Text
              className='text-[42px] lg:!text-[80px] leading-[1.2] text-center bg-gradient-home-text-2
                clip-text lg:font-extra-bold'
              size='bold'
            >
              Build an
              <br /> Interconnected World.
            </Text>
          </div>
        </Content>
      </Container>
      <Container className='z-20'>
        <ImagesField>
          <img
            className='absolute w-[227px] top-[-135px] right-0 lg:bottom-[150px] lg:w-[623px] z-20'
            src='/images/home/home_float_2.webp'
            alt='home_float_2'
          />
        </ImagesField>
        <Content>
          <div className='flex flex-col items-start lg:w-[720px] pt-[130px] pb-0 lg:pb-[253px]'>
            <Text
              className='text-[14px] text-center lg:text-left lg:text-[32px] clip-text
                bg-gradient-home-text-3 mb-[20px] leading-[1.7] lg:leading-[52px] font-semibold'
            >
              xxxasdasdasd
            </Text>
            <Text
              className='text-[12px] text-co-text-3 font-normal lg:text-[16px] lg:leading-[24px]
                text-center lg:text-left'
            >
              asdasd
            </Text>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <img
            className='hidden lg:block absolute right-0 bottom-[-250px] h-[1141px] z-20'
            src='/images/home/home_bg_4.webp'
            alt='home_bg_4'
          />
          <img
            className='hidden lg:block absolute left-0 bottom-[-160px] w-[170px] z-20'
            src='/images/home/home_float_3.webp'
            alt='home_float_3'
          />
        </ImagesField>
        <img
          className='block lg:hidden w-full mb-[-60px]'
          src='/images/home/home_bg_4_mobile.webp'
          alt='home_bg_4_mobile'
        />
        <Content>
          <div className='lg:w-[660px] lg:pt-[51px] lg:pb-[300px]'>
            <Text className='text-[24px] lg:text-[42px] mb-[12px] font-normal text-center lg:text-left'>
              Core Positioning
            </Text>
            <Text
              className='text-[32px] lg:text-[64px] clip-text bg-gradient-home-text-3 lg:leading-[96px]
                text-center lg:text-left lg:font-extra-bold'
              size='bold'
            >
              Intelligent Resource Allocation
            </Text>
          </div>
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <img
            className='absolute right-0 bottom-[-110px] lg:bottom-[-200px] lg:w-[230px] w-[100px] z-20'
            src='/images/home/home_float_4.webp'
            alt='home_float_4'
          />
        </ImagesField>
        <div className='px-[30px]'>
          <img
            className='block lg:hidden mb-[-60px] max-h-[600px] mx-auto'
            src='/images/home/advantage_bg_mobile.webp'
            alt='advantage_bg_mobile'
          />
        </div>
        <Content>
          <div className='block lg:hidden'>
            <Text className='text-[24px] lg:text-[64px] text-center'>
              Six Major
            </Text>
            <Text
              className='text-[32px] lg:text-[64px] clip-text bg-gradient-home-text-3 text-center'
              size='semibold'
            >
              Core Advantages
            </Text>
            <div className='grid grid-cols-2 gap-[22px] mt-[20px]'>
              {Mobile_Advantages.map((item, index) => (
                <div
                  key={index}
                  className='p-[20px] flex flex-col justify-center items-center gap-y-[24px] border-gradient
                    w-full py-[25px] lg:[50px] max-h-[260px] !rounded-[20px]'
                >
                  <img
                    src={item.img}
                    alt={item.text}
                    className='w-[52px] lg:w-[88px]'
                  />
                  <Text className='text-[12px] lg:text-[18px] text-center'>
                    {item.text}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <div
            className='hidden lg:flex flex-row justify-between items-start gap-x-[78px] mb-[84px]
              px-[87px]'
          >
            <div className='flex flex-col gap-y-[32px]'>
              {Left_advantages.map((item, index) => (
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    visible: {
                      opacity: [0, 1],
                      x: [`-${30 - index * 10}vw`, 0],
                      y: [-300, 0]
                    },
                    hidden: {
                      x: 0,
                      y: 0,
                      opacity: 0
                    }
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index / 6,
                    ease: 'easeInOut'
                  }}
                  key={index}
                  className='p-[20px] flex flex-col justify-center items-center gap-y-[24px] border-gradient
                    !rounded-[30px] w-[260px] h-[260px]'
                >
                  <img src={item.img} alt={item.text} className='w-[88px]' />
                  <Text className='text-[18px] text-center'>{item.text}</Text>
                </motion.div>
              ))}
            </div>
            <div className='mt-[42px]'>
              <Text className='text-[64px] text-center font-normal'>
                Six Major
              </Text>
              <Text
                className='text-[64px] font-extra-bold clip-text bg-gradient-home-text-3 text-center'
                size='bold'
              >
                Core Advantages
              </Text>
              <img
                src='/images/home/advantage_bg.webp'
                alt='advantage_bg'
                className='w-[590px] mt-[44px]'
              />
            </div>
            <div className='flex flex-col gap-y-[32px]'>
              {Right_advantages.map((item, index) => (
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    visible: {
                      opacity: [0, 1],
                      x: [`${30 - index * 10}vw`, 0],
                      y: [-300, 0]
                    },
                    hidden: {
                      x: 0,
                      y: 0,
                      opacity: 0
                    }
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index / 6,
                    ease: 'easeInOut'
                  }}
                  key={index}
                  className='p-[20px] flex flex-col justify-center items-center gap-y-[24px] border-gradient
                    w-[260px] h-[260px] !rounded-[30px]'
                >
                  <img src={item.img} alt={item.text} className='w-[88px]' />
                  <Text className='text-[18px] text-center'>{item.text}</Text>
                </motion.div>
              ))}
            </div>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default HomePage
