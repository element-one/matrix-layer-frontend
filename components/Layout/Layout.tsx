import { FC, HTMLAttributes } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useAccount } from 'wagmi'

import { RobotIcon } from '@components/Icon/Robot'
import { ModalType, useModal } from '@contexts/modal'

import Footer from './Footer/Footer'
import Header from './Header/Header'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children, className }) => {
  const { asPath } = useRouter()

  const isShowAi = !asPath.startsWith('/ai-explorer')

  return (
    <div className='w-full bg-co-bg-1 overflow-auto overflow-x-hidden'>
      <main className={twMerge(clsx('mx-auto w-screen'))}>
        <div
          className='min-h-screen h-fit relative flex flex-col bg-co-bg-1 w-full font-chakraPetch
            font-normal'
        >
          <div
            className='px-2 md:px-10 fixed left-1/2 translate-x-[-50%] top-4 md:top-8 w-full z-50
              max-w-[1440px]'
          >
            <Header />
          </div>
          <div
            className={twMerge(
              clsx(
                `h-fit text-co-text-1 bg-co-bg-1 w-screen mx-auto overflow-x-hidden
                  max-w-[1440px]`,
                className
              )
            )}
          >
            {children}
          </div>
          {isShowAi && <AiComponent />}
          <div
            className='absolute bottom-0 left-1/2 translate-x-[-50%] w-full px-2 md:px-10 z-50
              max-w-[1440px]'
          >
            <Footer />
            AiComponent
          </div>
        </div>
      </main>
    </div>
  )
}

const AiComponent = () => {
  const { isConnected, address } = useAccount()
  const { showModal } = useModal()

  const router = useRouter()

  const handleLinkToAI = () => {
    if (isConnected && address) {
      router.push('/ai-explorer')
    } else {
      showModal(ModalType.CONNECT_WALLET_MODAL)
    }
  }
  return (
    <div className='fixed right-5 bottom-10 z-[100]'>
      <Button isIconOnly onClick={handleLinkToAI}>
        <RobotIcon />
      </Button>
    </div>
  )
}

export default Layout
