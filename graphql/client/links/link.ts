import { createHttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

import createCustomChatFlowLink, {
  createCustomChatFlowHeaders
} from './contexts/customChatFlow'
import { SSELink } from './sse'

const httpLink = createHttpLink({
  uri: '/api/graphql'
})

const sseLink = new SSELink({
  url: '/api/graphql',
  headers: async () => {
    return createCustomChatFlowHeaders()
  }
})

const httpAndSSELinks = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  sseLink,
  httpLink
)

export const link = createCustomChatFlowLink(httpAndSSELinks)
