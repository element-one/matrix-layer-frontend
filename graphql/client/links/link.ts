import { createHttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GRAPHQL_API_URL } from '@helpers/env'

import createCustomChatFlowLink, {
  createCustomChatFlowHeaders
} from './contexts/customChatFlow'
import { SSELink } from './sse'

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL
})

const sseLink = new SSELink({
  url: GRAPHQL_API_URL,
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