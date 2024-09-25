import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { Button } from '@components/Button'
import { Container, Content, ImagesField } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const advantages = [
  {
    title: 'Purchase Hardware',
    description: 'Instantly receive rewards as a network node.'
  },
  {
    title: 'Ecosystem Airdrops',
    description:
      'Receive airdrops from ecosystem partners over time as part of the rewards.'
  },
  {
    title: 'Promote Hardware',
    description:
      'Earn promotional rewards for expanding the network node ecosystem. Continue earning over time.'
  },
  {
    title: 'Profit Sharing',
    description:
      'The more users you bring in, the more airdrops and ecosystem rewards they earn, and you’ll receive a share of those rewards.'
  },
  {
    title: 'Staking Rewards',
    description:
      'After becoming a network node, you can stake assets and receive additional incentives.'
  },
  {
    title: 'AI Financial Management',
    description:
      'WorldPhone serves as a hardware wallet that not only stores assets but continuously generates income for you through automated AI-driven investments.'
  }
]

const HomePage = () => {
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
            className='w-screen h-full object-cover max-h-[1200px] min-h-[1000px]'
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
            className='absolute left-1/2 top-[55%] translate-x-[-50%] translate-y-[-50%] flex
              justify-center items-center'
          >
            <div className='flex flex-col lg:w-[1000px] relative mx-auto'>
              <img
                className='w-[368px] h-[368px] object-cover absolute right-[120px] top-[-120px]'
                src='/images/home/home_float_2.webp'
                alt='home_float_2'
              />
              <div className='flex flex-col justify-center items-center'>
                <Text className='relative z-10 text-[52px] text-white font-pressStart2P text-center'>
                  MATRIX LAYER <br />
                  PROTOCOL
                </Text>
                <img
                  className='w-[456px] h-[521px] object-cover relative z-20'
                  src='/images/home/home_image_1.webp'
                  alt='home_image_1'
                />
              </div>
              <Button
                className='relative z-20 bottom-[50px] text-[32px] text-center p-[20px] rounded-[20px]
                  translate-y-[-6px]'
              >
                Unlock with Your Eyes, Connect with the Blockchain
              </Button>
            </div>
          </Content>
        </div>
      </Container>
      <Container className='flex flex-col justify-end bg-gradient-home-bg-1 min-h-[800px]'>
        <div ref={section2Ref}>
          <video
            ref={video2Ref}
            className='w-screen h-full object-cover max-h-[1080px] rotate-[27.82deg] opacity-30'
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
              className='absolute w-[490px] right-0 top-[-200px] lg:w-[490px] z-20 object-cover'
              src='/images/home/home_float_3.webp'
              alt='home_float_3'
            />
          </ImagesField>
          <Content className='absolute left-1/2 top-[50px] translate-x-[-50%]'>
            <div className='flex flex-col gap-y-[30px] items-start lg:w-[920px]'>
              <Text
                className='text-[14px] text-center lg:text-left lg:text-[48px] clip-text
                  bg-gradient-home-text-1 font-semibold'
              >
                The World&apos;s First Smartphone <br />
                with Full-Chain Network Integration
              </Text>
              <Text className='text-[12px] font-normal lg:text-[22px] text-center lg:text-left'>
                Matrix Layer Protocol is designed to break the limitations of
                traditional mobile devices by deeply integrating blockchain
                technology into smartphones through innovative hardware and
                software, simplifying users&apos; access to Web3 and enhancing
                their overall experience.
              </Text>
              <div className='w-[65px] h-[1px] bg-white'></div>
              <Text
                className='text-[12px] font-normal lg:text-[28px] text-center lg:text-left uppercase
                  tracking-[2px]'
              >
                Redefining the Gateway to the Blockchain Ecosystem
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
            className='absolute w-[490px] right-0 bottom-[400px] lg:w-[215px] z-20 object-cover'
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
              Why choose
            </span>{' '}
            <span className='#fff'>Matrix Layer Protocol</span>
          </Text>
          <div className='flex justify-between items-center mb-[50px]'>
            <div className='w-[630px]'>
              <Text className='text-[48px] mb-[40px] font-semibold text-white'>
                The world&apos;s first mobile blockchain network node with iris
                authentication.
              </Text>
              <Button className='w-full py-[10px]'>
                Safety and profitability coexist
              </Button>
            </div>
            <img
              src='/images/home/home_image_2.webp'
              alt='home_image_2'
              className='w-[560px] object-cover'
            />
          </div>
          <div className='flex justify-between items-center mb-[50px]'>
            <img
              src='/images/home/home_image_3.webp'
              alt='home_image_3'
              className='w-[550px] object-cover'
            />
            <div className='w-[630px]'>
              <Text className='text-[48px] mb-[40px] font-semibold text-white text-right'>
                Ultimate privacy and industry-standard confidentiality.
              </Text>
              <Button className='w-full py-[10px]'>
                Iris login, identification information ZK encryption
              </Button>
            </div>
          </div>
          <div>
            <Text className='text-[48px] mb-[20px] font-semibold text-white text-center whitespace-nowrap'>
              The first full-chain ecological Web3 mobile phone
            </Text>
            <Text
              className='text-[28px] mb-[30px] font-semibold clip-text bg-gradient-home-text-1
                text-center whitespace-nowrap uppercase'
            >
              One device in hand, interacts with the global ecosystem.
            </Text>
            <img
              className='w-full object-cover'
              src='/images/home/home_image_4.webp'
              alt='home_image_4'
            />
          </div>
        </Content>
      </Container>
      <Container>
        <div ref={section3Ref}>
          <ImagesField>
            <div className='absolute left-0 top-[-300px]'>
              <div className='absolute inset-0 w-full h-full bg-gradient-home-section-1'></div>
              <video
                ref={video3Ref}
                className='w-screen h-full object-cover max-h-[750px]'
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
          <Content className='flex justify-center pb-[235px]'>
            <div className='flex gap-x-[40px] justify-between items-center'>
              <img
                src='/images/home/home_image_5.webp'
                alt='home_image_5'
                className='w-[495px] object-cover'
              />
              <div className='grow'>
                <img
                  src='/images/home/home_image_6.webp'
                  alt='home_image_6'
                  className='w-[425px] object-cover'
                />
                <Text className='text-[48px] font-semibold text-white'>
                  smartphone assistant
                </Text>
                <div className='w-[65px] h-[1px] bg-white my-[20px]'></div>
                <Text
                  className='text-[12px] lg:text-[28px] text-center lg:text-left uppercase clip-text
                    bg-gradient-home-text-1 font-semibold'
                >
                  Follow Sam Altman&apos;s thoughts and let technology serve
                  life
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
            className='absolute w-[160px] left-0 bottom-[50px] lg:w-[233px] z-20 object-cover'
            src={'/images/home/home_float_6.webp'}
            alt='home_float_6'
          />
          <img
            className='absolute top-0 left-0 w-screen z-10 object-cover'
            src='/images/home/home_bg_4.webp'
            alt='home-bg-4'
          />
          <div
            className='absolute bottom-[-50px] left-[-100px] rounded-full w-[368px] h-[535px]
              blur-[150px] opacity-80 bg-radial-gradient-1'
          ></div>
        </ImagesField>
        <Content className='pb-[185px]'>
          <Text className='text-[24px] lg:text-[64px] mb-[40px] font-semibold text-center'>
            <span className='#fff'>One Mobile Phone, </span>
            <span className='clip-text bg-gradient-home-text-1'>
              6 Benefits
            </span>
          </Text>
          <img
            src='/images/home/home_image_7.webp'
            alt='home_image_7'
            className='w-full object-cover'
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
          <Text className='text-[24px] lg:text-[64px] mb-[40px] font-semibold text-center'>
            <span className='#fff'>How to join</span>
            <span className='clip-text bg-gradient-home-text-1'>
              &nbsp;Matrix Layer Protocol&nbsp;
            </span>
            <span className='#fff'>growth and maximize earnings? </span>
          </Text>
          <div className='grid grid-cols-2 gap-x-[20px] gap-y-[50px]'>
            {advantages.map((item) => (
              <div
                key={item.title}
                className='relative flex justify-center items-center border-2 border-purple-500 h-[184px]
                  rounded-[20px] p-[20px]'
              >
                <div
                  className='absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[360px]
                    py-[10px] bg-gradient-button-1 rounded-[10px] text-center'
                >
                  <Text
                    as='span'
                    className='leading-none text-[20px] font-semibold text-black'
                  >
                    {item.title}
                  </Text>
                </div>
                <Text className='text-[20px] font-semibold text-white text-center'>
                  {item.description}
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
