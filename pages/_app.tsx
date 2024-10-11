import React from 'react'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { Chakra_Petch, Inter, Poppins, Press_Start_2P } from 'next/font/google'
import Head from 'next/head'
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

import { AuthProvider } from '@contexts/auth'
import { ModalProvider } from '@contexts/modal'

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

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

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
            <NextUIProvider>
              <NextThemesProvider attribute='class' defaultTheme='light'>
                <AuthProvider>
                  <ModalProvider>
                    <Head>
                      <title>Matrix Layer Protocol</title>
                      <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                      />
                    </Head>
                    <Component {...pageProps} />
                    <ToastContainer />
                  </ModalProvider>
                </AuthProvider>
              </NextThemesProvider>
            </NextUIProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
