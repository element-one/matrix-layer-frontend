import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { ApolloProvider } from '@apollo/client'
import ConversationComponent from '@components/AIExplorer/ConversationComponent'
import Sidebar from '@components/AIExplorer/Sidebar'
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

const AIExplorer = () => {
  const { address, isConnected } = useAccount()
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isSidebarOpen, onSidebarChange] = useState(false)

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
    setConversations(history || [])
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
        className='w-[1440px] max-auto h-[100vh] px-2 md:px-10 py-[120px] sm:py-[160px]
          overflow-hidden'
      >
        <div className='w-full h-full relative overflow-hidden rounded-[32px]'>
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
