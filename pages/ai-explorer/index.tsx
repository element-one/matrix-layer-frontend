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
  }, [conversations, createNewConversation])

  return (
    <Layout className='flex justify-center'>
      <Container
        className='w-[1310px] max-auto h-[100vh] flex justify-center gap-x-8 py-[200px]
          overflow-hidden'
      >
        <Sidebar />
        <ConversationComponent
          userId={getRandomId()}
          conversationId={activeConversationId}
        />
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
