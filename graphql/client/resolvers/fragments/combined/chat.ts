import { gql } from '@apollo/client'

import {
  ChatInteractionActiveTabFragment,
  ChatInteractionChartFragment,
  ChatInteractionCompletionStreamFragment,
  ChatInteractionErrorFragment,
  ChatInteractionFollowUpFragment,
  ChatInteractionImageFragment,
  ChatInteractionIndicatorFragment,
  ChatInteractionPromptFragment,
  ChatInteractionQuotesFragment,
  ChatInteractionSingleSelectionFragment,
  ChatInteractionTableFragment,
  ChatInteractionXPostFragment
} from '../chunks/chat'

export const ChatInteractionFullFragment = gql`
  fragment ChatInteractionFullFragment on Interaction {
    ...ChatInteractionPromptFragment
    ...ChatInteractionQuotesFragment
    ...ChatInteractionActiveTabFragment
    ...ChatInteractionFollowUpFragment
    ...ChatInteractionSingleSelectionFragment
    ...ChatInteractionCompletionStreamFragment
    ...ChatInteractionImageFragment
    ...ChatInteractionXPostFragment
    ...ChatInteractionErrorFragment
    ...ChatInteractionChartFragment
    ...ChatInteractionTableFragment
    ...ChatInteractionIndicatorFragment
  }
  ${ChatInteractionPromptFragment}
  ${ChatInteractionQuotesFragment}
  ${ChatInteractionActiveTabFragment}
  ${ChatInteractionFollowUpFragment}
  ${ChatInteractionSingleSelectionFragment}
  ${ChatInteractionCompletionStreamFragment}
  ${ChatInteractionImageFragment}
  ${ChatInteractionXPostFragment}
  ${ChatInteractionErrorFragment}
  ${ChatInteractionChartFragment}
  ${ChatInteractionTableFragment}
  ${ChatInteractionIndicatorFragment}
`

export const ChatFragment = gql`
  fragment ChatFragment on ChatResponse {
    user_id
    conversation_id
    interactions {
      ...ChatInteractionFullFragment
    }
  }
  ${ChatInteractionFullFragment}
`
