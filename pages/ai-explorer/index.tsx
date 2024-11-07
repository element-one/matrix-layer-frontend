import { useCallback, useEffect, useState } from 'react'

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
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isSidebarOpen, onSidebarChange] = useState(false)

  const { conversations, setConversations } = useStore(
    ({ conversations, setConversations }) => ({
      conversations,
      setConversations
    })
  )

  const createNewConversation = useCallback(() => {
    const conversation: Conversation = {
      id: getRandomId(),
      name: getRandomId(),
      messages: [],
      createdAt: new Date()
    }

    setConversations([...conversations, conversation])
    setActiveConversationId(conversation.id)
  }, [conversations, setConversations])

  useEffect(() => {
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
    activeConversationId
  ])

  const onDeleteConversation = (conversationId: string) => {
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
      <Container className='w-[1310px] max-auto h-[100vh] py-[200px] overflow-hidden'>
        <div className='w-full h-full relative overflow-hidden rounded-[32px]'>
          <Sidebar
            activeConversationId={activeConversationId}
            createNewConversation={createNewConversation}
            setActiveConversationId={setActiveConversationId}
            onDeleteConversation={onDeleteConversation}
            isSidebarOpen={isSidebarOpen}
            onSidebarChange={onSidebarChange}
          />
          <ConversationComponent
            userId={getRandomId()}
            conversationId={activeConversationId}
          />
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
