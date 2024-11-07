import { gql } from '@apollo/client'

import { ChatFragment } from './fragments/combined/chat'

export const chatSubscription = gql`
  subscription chat($input: ChatInput!) {
    chat(input: $input) {
      ...ChatFragment
    }
  }
  ${ChatFragment}
`
