import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTranslations } from 'next-intl'

import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const advantages = [
  'purchaseHardware',
  'ecosystemAirdrops',
  'promoteHardware',
  'profitSharing',
  'stakingRewards',
  'AIFinancialManagement'
] as const

const HomePage = () => {
  const t = useTranslations('Index')

  const { ref: section1Ref, inView: section1InView } = useInView({
    threshold: 0
  })
  const video1Ref = useRef<HTMLVideoElement | null>(null)

  const { ref: section2Ref, inView: section2InView } = useInView({
    threshold: 0
  })
  const video2Ref = useRef<HTMLVideoElement | null>(null)

  const { ref: section3Ref, inView: section3InView } = useInView({
    threshold: 0
  })
  const video3Ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!video1Ref.current) return
    if (section1InView) {
      video1Ref.current.play()
    } else {
      video1Ref.current.pause()
    }
  }, [section1InView])

  useEffect(() => {
    if (!video2Ref.current) return
    if (section2InView) {
      video2Ref.current.play()
    } else {
      video2Ref.current.pause()
    }
  }, [section2InView])

  useEffect(() => {
    if (!video3Ref.current) return
    if (section3InView) {
      video3Ref.current.play()
    } else {
      video3Ref.current.pause()
    }
  }, [section3InView])

  return (
    <Layout className='relative bg-black max-w-screen'>
      <Container>
        <div ref={section1Ref}>
          <video
            ref={video1Ref}
            className='w-screen h-full object-cover max-h-[1200px] min-h-[557px] sm:min-h-[1000px]'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src='/images/home/home_video_1.mp4' type='video/mp4' />
            your browser does not support video tag.
          </video>

          <ImagesField>
            <img
              className='absolute inset-0 w-full h-full object-cover'
              src='/images/home/home_bg_1.webp'
              alt='home-bg-1'
            />
            <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
            <img
              className='absolute w-[160px] object-cover left-0 top-0 lg:w-[245px] z-20'
              src={'/images/home/home_float_1.webp'}
              alt='home_float_1'
            />
          </ImagesField>
          <Content
            className='absolute left-1/2 top-[60%] sm:top-[55%] translate-x-[-50%] translate-y-[-50%]
              flex justify-center items-center'
          >
            <div className='flex flex-col w-full lg:w-[1000px] relative mx-auto'>
              <div className='flex flex-col justify-center items-center'>
                <Text
                  className='relative z-10 text-2xl leading-normal sm:text-[52px] text-white
                    font-pressStart2P text-center'
                >
                  MATRIX LAYER <br />
                  PROTOCOL
                </Text>
                <img
                  className='mt-7 sm:mt-0 w-[196px] h-[225px] sm:w-[456px] sm:h-[521px] object-cover relative
                    z-20'
                  src='/images/home/home_image_1.webp'
                  alt='home_image_1'
                />
              </div>
              <div
                className='bg-gradient-button-1 text-black h-fit font-chakraPetch relative z-20 bottom-0
                  sm:bottom-[50px] text-[14px] sm:text-[32px] text-center p-2.5 sm:p-5
                  rounded-[15px] sm:rounded-[20px] translate-y-0 sm:translate-y-[-6px]
                  whitespace-normal font-semibold'
              >
                {t('section1.unlock1')}
                <br className='sm:hidden' />
                {t('section1.unlock2')}
              </div>
            </div>
          </Content>
        </div>
      </Container>
      <Container className='flex flex-col justify-end bg-gradient-home-bg-1 sm:min-h-[800px]'>
        <div
          ref={section2Ref}
          className='flex flex-col-reverse sm:flex-col overflow-hidden'
        >
          <video
            ref={video2Ref}
            className='w-screen sm:relative h-full object-cover max-h-[1080px] rotate-[27.82deg]
              sm:opacity-30 scale-125 sm:scale-100'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src='/images/home/home_video_2.mp4' type='video/mp4' />
            your browser does not support video tag.
          </video>
          <ImagesField>
            <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
            <div
              className='absolute top-[-200px] right-[-30px] rounded-full w-[388px] h-[563px]
                blur-[150px] bg-radial-gradient-1'
            ></div>
            <img
              className='absolute w-[156px] top-[100px] sm:w-[490px] right-0 sm:top-[-200px] lg:w-[490px]
                z-20 object-cover'
              src='/images/home/home_float_3.webp'
              alt='home_float_3'
            />
          </ImagesField>
          <Content className='relative sm:absolute left-1/2 top-0 sm:top-[50px] translate-x-[-50%]'>
            <div className='flex flex-col gap-y-5 sm:gap-y-[30px] items-start lg:w-[920px]'>
              <Text
                className='text-[18px] text-left sm:text-[48px] clip-text bg-gradient-home-text-1
                  font-semibold'
              >
                {t('section2.title1')} <br />
                {t('section2.title2')}
              </Text>
              <Text className='text-[14px] font-normal lg:text-[22px] text-left w-[279px] sm:w-auto'>
                {t('section2.intro')}
              </Text>
              <div className='w-[65px] h-[1px] bg-white'></div>
              <Text className='text-[12px] font-normal lg:text-[28px] text-left uppercase tracking-[2px]'>
                {t('section2.footer')}
              </Text>
            </div>
          </Content>
        </div>
      </Container>
      <Container>
        <ImagesField>
          <img
            className='hidden lg:block absolute left-0 top-[260px] w-[206px] z-20 object-cover'
            src='/images/home/home_float_4.webp'
            alt='home_float_4'
          />
          <img
            className='absolute w-[109px] sm:w-[490px] right-0 bottom-[200px] sm:bottom-[400px]
              lg:w-[215px] z-20 object-cover'
            src='/images/home/home_float_5.webp'
            alt='home_float_5'
          />
          <div
            className='absolute bottom-[400px] right-[-100px] rounded-full w-[303px] h-[387px]
              blur-[77px] opacity-40 bg-radial-gradient-1'
          ></div>
        </ImagesField>
        <Content className='pb-[70px]'>
          <Text className='text-[24px] lg:text-[64px] mb-[12px] font-semibold text-center'>
            <span className='clip-text bg-gradient-home-text-1'>
              {t('section2-sub.title1')}
            </span>
            <span className='hidden sm:inline'> </span>
            <br className='sm:hidden' />
            <span className='#fff'>{t('section2-sub.title2')}</span>
          </Text>
          <div className='flex flex-col-reverse sm:flex-row justify-between items-center mb-[50px]'>
            <div className='w-full sm:w-[630px]'>
              <Text
                className='text-[18px] sm:text-[48px] text-center sm:text-left mb-2.5 sm:mb-10
                  font-semibold text-white'
              >
                {t('section2-sub.info1')}
              </Text>
              <div
                className='bg-gradient-button-1 text-black h-fit font-chakraPetch w-full p-2.5 rounded-lg
                  text-[12px] sm:text-[24px] font-semibold text-center'
              >
                {t('section2-sub.footer1')}
              </div>
            </div>
            <img
              src='/images/home/home_image_2.webp'
              alt='home_image_2'
              className='w-[560px] object-cover'
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-[50px]'>
            <img
              src='/images/home/home_image_3.webp'
              alt='home_image_3'
              className='w-[550px] object-cover'
            />
            <div className='w-full sm:w-[630px]'>
              <Text
                className='text-[18px] sm:text-[48px] text-center mb-2.5 sm:mb-10 font-semibold text-white
                  sm:text-right'
              >
                {t('section2-sub.info2')}
              </Text>
              <div
                className='bg-gradient-button-1 text-black h-fit font-chakraPetch w-full p-2.5 rounded-lg
                  text-[12px] sm:text-[24px] text-center font-semibold'
              >
                {t('section2-sub.footer2')}
              </div>
            </div>
          </div>
          <div>
            <Text
              className='text-[18px] sm:text-[48px] mb-[20px] font-semibold text-white text-left
                sm:text-center whitespace-normal sm:whitespace-nowrap'
            >
              {t('section2-sub.info3')}
            </Text>
            <Text
              className='text-[12px] sm:text-[28px] mb-8 sm:mb-[30px] font-semibold clip-text
                bg-gradient-home-text-1 sm:text-center sm:whitespace-nowrap uppercase w-[222px]
                sm:w-auto text-left whitespace-normal'
            >
              {t('section2-sub.footer3')}
            </Text>
            <img
              className='w-full object-cover hidden sm:inline-block'
              src='/images/home/home_image_4.webp'
              alt='home_image_4'
            />
            <img
              className='w-full object-cover sm:hidden'
              src='/images/home/home_image_4_mobile.webp'
              alt='home_image_4'
            />
          </div>
        </Content>
      </Container>
      <Container>
        <div ref={section3Ref}>
          <ImagesField>
            <div className='absolute left-0 top-0 sm:top-[-300px]'>
              <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
              <video
                ref={video3Ref}
                className='w-screen h-full object-cover max-h-[750px] opacity-30'
                autoPlay
                muted
                loop
                playsInline
              >
                <source src='/images/home/home_video_3.mp4' type='video/mp4' />
                your browser does not support video tag.
              </video>
            </div>
            <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
          </ImagesField>
          <Content className='flex justify-center pb-[66px] sm:pb-[235px]'>
            <div className='flex flex-col sm:flex-row gap-x-[40px] justify-between items-center'>
              <img
                src='/images/home/home_image_5.webp'
                alt='home_image_5'
                className='w-[495px] object-cover'
              />
              <div className='grow flex sm:block flex-col items-center'>
                <img
                  src={t('section3.imgSrc')}
                  alt='home_image_6'
                  className='w-[157px] sm:w-[425px] object-cover'
                />
                <Text className='sm:w-auto text-[18px] sm:text-[48px] font-semibold text-white'>
                  {t('section3.title')}
                </Text>
                <div className='w-[65px] h-[1px] bg-white my-2.5 sm:my-4'></div>
                <Text
                  className='text-[18px] lg:text-[28px] text-center lg:text-left uppercase clip-text
                    bg-gradient-home-text-1 font-semibold'
                >
                  {t('section3.info')}
                </Text>
              </div>
            </div>
          </Content>
        </div>
      </Container>
      <Container>
        <ImagesField>
          <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
          <img
            className='invisible sm:visible absolute w-[160px] left-0 bottom-[50px] lg:w-[233px] z-20
              object-cover'
            src={'/images/home/home_float_6.webp'}
            alt='home_float_6'
          />
          <img
            className='invisible sm:visible absolute top-0 left-0 w-screen z-10 object-cover'
            src='/images/home/home_bg_4.webp'
            alt='home-bg-4'
          />
          <div
            className='invisible sm:visible absolute bottom-[-50px] left-[-100px] rounded-full
              w-[368px] h-[535px] blur-[150px] opacity-80 bg-radial-gradient-1'
          ></div>
        </ImagesField>
        <Content className='pb-11 sm:pb-[185px]'>
          <Text className='text-[24px] lg:text-[64px] mb-[35px] sm:mb-[40px] font-semibold text-center'>
            <span className='#fff'>{t('section3-sub.title1')}</span>
            <br className='sm:hidden' />
            <span className='clip-text bg-gradient-home-text-1'>
              {t('section3-sub.title2')}
            </span>
          </Text>
          <img
            src={t('section3-sub.imgSrc')}
            alt='home_image_7'
            className='w-full object-cover hidden sm:inline-block'
          />
          <img
            src={t('section3-sub.mobileImgSrc')}
            alt='home_image_7'
            className='w-full object-cover sm:hidden'
          />
        </Content>
      </Container>
      <Container>
        <ImagesField>
          <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
          <img
            className='absolute w-[160px] right-0 top-0 lg:w-[184px] z-20 object-cover'
            src={'/images/home/home_float_7.webp'}
            alt='home_float_7'
          />
          <img
            className='absolute bottom-0 right-0 h-[1000px] z-10 object-cover'
            src='/images/home/home_bg_5.webp'
            alt='home-bg-5'
          />
        </ImagesField>
        <Content className='pb-[185px]'>
          <Text className='text-[24px] lg:text-[64px] mb-[57px] sm:mb-[40px] font-semibold text-center'>
            <span className='#fff'>{t('section4.title1')}</span>
            <br className='sm:hidden' />
            <span className='clip-text bg-gradient-home-text-1'>
              {t('section4.title2')}
            </span>
            <span className='#fff'>{t('section4.title3')} </span>
          </Text>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-[30px] gap-x-[20px] sm:gap-y-[50px]'>
            {advantages.map((key) => (
              <div
                key={key}
                className='relative flex justify-center items-center border-2 border-purple-500 h-fit
                  sm:h-[184px] rounded-[10px] sm:rounded-[20px] p-[20px]'
              >
                <div
                  className='absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[172px]
                    sm:w-[360px] px-2.5 py-[5px] sm:py-2.5 bg-gradient-button-1 rounded-[5px]
                    sm:rounded-[10px] text-center whitespace-nowrap sm:whitespace-normal'
                >
                  <Text
                    as='span'
                    className='leading-none text-[16px] sm:text-[20px] font-semibold text-black'
                  >
                    {t(`section4.${key}.title` as any)}
                  </Text>
                </div>
                <Text className='text-[14px] sm:text-[20px] font-semibold text-white text-center'>
                  {t(`section4.${key}.description` as any)}
                </Text>
              </div>
            ))}
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default HomePage
