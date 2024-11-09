import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAccount } from 'wagmi'

import { ApolloProvider } from '@apollo/client'
import ConversationComponent from '@components/AIExplorer/ConversationComponent'
import Sidebar from '@components/AIExplorer/Sidebar'
import { Container } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import client from '@graphql/client/client'
import { useStore } from '@store/store'
import { Conversation } from '@type/internal/conversation'
import { getRandomId } from '@utils/random'

const AIExplorer = () => {
  const { address, isConnected } = useAccount()

  const isInitialLoad = useRef(false)
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isSidebarOpen, onSidebarChange] = useState(false)

  const { allConversations, setConversations } = useStore(
    ({ allConversations, setConversations }) => ({
      allConversations,
      setConversations
    })
  )

  const conversations = useMemo(
    () => allConversations[address as string] || [],
    [allConversations, address]
  )

  const createNewConversation = useCallback(() => {
    const emptyConversation = conversations.find(
      (convo) => convo.messages.length === 0
    )

    if (!isInitialLoad.current && emptyConversation) {
      setActiveConversationId(emptyConversation.id)
    } else {
      const conversation: Conversation = {
        id: getRandomId(),
        name: getRandomId(),
        messages: [],
        createdAt: new Date()
      }

      setConversations(address as string, [...conversations, conversation])
      setActiveConversationId(conversation.id)
    }
  }, [conversations, setConversations, setActiveConversationId, address])

  useEffect(() => {
    if (!address) {
      setActiveConversationId('')
    }
  }, [address])

  useEffect(() => {
    if (!address) return

    const noConversations = conversations.length === 0

    if (noConversations) {
      createNewConversation()
    }

    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0]?.id || '')
    }

    if (!isInitialLoad.current) {
      isInitialLoad.current = true
    }
  }, [
    conversations,
    createNewConversation,
    setActiveConversationId,
    activeConversationId,
    address
  ])

  const onDeleteConversation = (conversationId: string) => {
    if (!isConnected) return

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
