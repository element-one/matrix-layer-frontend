import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { useAccount } from 'wagmi'

import { ApolloProvider } from '@apollo/client'
import ConversationComponent from '@components/AIExplorer/ConversationComponent'
import Sidebar from '@components/AIExplorer/Sidebar'
import { Button } from '@components/Button'
import { Container } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import client from '@graphql/client/client'
import {
  useDeleteConversations,
  useGetUserChatHistory
} from '@services/api/chat'
import { useStore } from '@store/store'
import { Conversation } from '@type/internal/conversation'
import { getRandomId } from '@utils/random'

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const AIExplorer = () => {
  const { address, isConnected } = useAccount()
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isSidebarOpen, onSidebarChange] = useState(false)
  const t = useTranslations('Ai')

  const {
    data: history,
    refetch,
    isFetched
  } = useGetUserChatHistory(address as string)
  const { mutateAsync: deleteConversations } = useDeleteConversations()

  const { conversations, setConversations } = useStore(
    ({ conversations, setConversations }) => ({
      conversations,
      setConversations
    })
  )

  useEffect(() => {
    return () => {
      setConversations([])
      setActiveConversationId('')
      refetch()
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setConversations(history)
  }, [history, setConversations])

  const createNewConversation = useCallback(() => {
    const conversation: Conversation = {
      id: getRandomId(),
      name: getRandomId(),
      messages: [],
      createdAt: new Date()
    }

    setConversations([...conversations, conversation])
    setActiveConversationId(conversation.id)
  }, [conversations, setConversations, setActiveConversationId])

  useEffect(() => {
    if (!address) {
      setActiveConversationId('')
    }
  }, [address])

  useEffect(() => {
    if (
      !address ||
      !isFetched ||
      (isFetched && history?.length && !conversations.length)
    )
      return

    const noConversations = conversations.length === 0

    if (noConversations) {
      createNewConversation()
    }

    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0]?.id || '')
    }
  }, [
    conversations,
    createNewConversation,
    setActiveConversationId,
    activeConversationId,
    address,
    isFetched,
    history
  ])

  const onDeleteConversation = async (conversationId: string) => {
    if (!isConnected) return

    try {
      await deleteConversations({
        user_id: address as string,
        conversation_ids: [conversationId]
      })
      if (conversationId === activeConversationId) {
        const remainingConversations = conversations.filter(
          (conv) => conv.id !== conversationId
        )
        if (remainingConversations.length > 0) {
          setActiveConversationId(remainingConversations[0]?.id || '')
        } else {
          setActiveConversationId('')
        }
      }
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout className='flex justify-center'>
      <Container
        className='w-[1440px] max-auto h-[100vh] px-2 md:px-10 pt-[120px] pb-[140px] sm:pt-[160px]
          sm:pb-[160px] overflow-hidden'
      >
        <div
          className={clsx(
            `p-4 mb-4 grid grid-cols-3 gap-4 md:px-8 md:py-4 border-2 rounded-[20px]
            md:backdrop-filter md:backdrop-blur-[10px]`,
            gradientBorderClass
          )}
        >
          <div
            className='bg-black rounded-[16px] h-[55px] w-full px-4 text-[18px] text-co-gray-7 flex
              justify-between items-center'
          >
            <span className=''>{t('totalNetworkDeposits')}</span>
            <span>--</span>
          </div>
          <div
            className='bg-black rounded-[16px] h-[55px] w-full px-4 text-[18px] text-co-gray-7 flex
              justify-between items-center'
          >
            <span className=''>{t('totalNetworkUsageCount')}</span>
            <span>--</span>
          </div>
          <div
            className='bg-black rounded-[16px] h-[55px] w-full px-4 text-[18px] text-co-gray-7 flex
              justify-between items-center'
          >
            <span className=''>{t('totalTokensConsumed')}</span>
            <span>--</span>
          </div>
        </div>
        <div className='w-full h-[55vh] relative overflow-hidden rounded-[32px]'>
          <Sidebar
            activeConversationId={activeConversationId}
            createNewConversation={createNewConversation}
            setActiveConversationId={setActiveConversationId}
            onDeleteConversation={onDeleteConversation}
            isSidebarOpen={isSidebarOpen}
            onSidebarChange={onSidebarChange}
          />
          <ConversationComponent conversationId={activeConversationId} />
        </div>
        <div
          className={clsx(
            'p-4 mb-4 grid grid-cols-5 gap-4 md:px-8 md:py-4 border-2 my-4',
            'rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px] border-[#666]'
          )}
        >
          <div
            className='bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>
              {t('totalNetworkDeposits')}
            </span>
            <span className='text-white text-[18px] font-[600]'>123456</span>
            <Button size='sm' className='w-full h-[32px] rounded-full'>
              {t('deposit')}
            </Button>
          </div>
          <div
            className='bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>
              {t('tokensConsumed')}
            </span>
            <span className='text-white text-[18px] font-[600]'>123456</span>
          </div>
          <div
            className='bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>{t('usageCount')}</span>
            <span className='text-white text-[18px] font-[600]'>123456</span>
          </div>
          <div
            className='bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>
              {t('remainingTokens')}
            </span>
            <span className='text-white text-[18px] font-[600]'>123456</span>
            <Button size='sm' className='w-full h-[32px] rounded-full'>
              {t('withdraw')}
            </Button>
          </div>
          <div
            className='bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>
              {t('remainingUsageCount')}
            </span>
            <span className='text-white text-[18px] font-[600]'>123456</span>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

const AIExplorerPage = () => {
  return (
    <ApolloProvider client={client}>
      <AIExplorer />
    </ApolloProvider>
  )
}

export default AIExplorerPage
