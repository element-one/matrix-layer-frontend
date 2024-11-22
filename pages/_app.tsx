import React from 'react'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { Chakra_Petch, Inter, Poppins, Press_Start_2P } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import { binanceWallet, okxWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { bsc, bscTestnet, mainnet } from 'viem/chains'
import { WagmiProvider } from 'wagmi'

import { ModalProvider } from '@contexts/modal'
import { UserProvider } from '@contexts/user'

import enMessages from '../messages/en.json'
import zhMessages from '../messages/zh.json'

import '@rainbow-me/rainbowkit/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const pressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

const chakraPetch = Chakra_Petch({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra-petch'
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const { wallets } = getDefaultWallets()

const config = getDefaultConfig({
  appName: 'matrix-layer',
  projectId: '45ecc68adffe3012e792cfa6ee6ebc08',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [okxWallet, binanceWallet]
    }
  ],
  chains:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? [bscTestnet, mainnet]
      : [bsc, mainnet],
  ssr: true
})

const queryClient = new QueryClient()

const messagesMap: Record<string, AbstractIntlMessages> = {
  en: enMessages,
  zh: zhMessages
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const messages = messagesMap[router.locale ?? 'en'] ?? messagesMap.en
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
          --font-press-start-2p: ${pressStart2P.style.fontFamily};
          --font-chakra-petch: ${chakraPetch.style.fontFamily};
        }
      `}</style>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <NextIntlClientProvider
              locale={router.locale}
              messages={messages}
              formats={{
                dateTime: {
                  short: {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }
                }
              }}
              now={new Date(pageProps.now)}
              timeZone='asia/shanghai'
            >
              <NextUIProvider>
                <NextThemesProvider attribute='class' defaultTheme='light'>
                  <UserProvider>
                    <ModalProvider>
                      <Head>
                        <title>Matrix Layer Protocol</title>
                        <meta
                          name='viewport'
                          content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content'
                        />
                      </Head>
                      <Component {...pageProps} />
                      <ToastContainer />
                    </ModalProvider>
                  </UserProvider>
                </NextThemesProvider>
              </NextUIProvider>
            </NextIntlClientProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
