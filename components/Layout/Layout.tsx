import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Footer from './Footer/Footer'
import Header from './Header/Header'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children, className }) => {
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
          <div
            className='absolute bottom-0 left-1/2 translate-x-[-50%] w-full px-2 md:px-10 z-50
              max-w-[1440px]'
          >
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
