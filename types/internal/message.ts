import type { InteractionInput } from '../graphqlApiSchema'
import { ValueOf } from '../map'

import type { MessageSelection } from './messageSelection'

type MessageInteractionRaw = ValueOf<InteractionInput>
export type MessageInteraction = Exclude<
  MessageInteractionRaw,
  null | undefined
>
export type MessageInteractions = MessageInteraction[]

export enum HandlerType {
  Prompt = 'prompt',
  Quotes = 'quotes',
  ActiveTab = 'active_tab',
  FollowUp = 'follow_up',
  NewsTimeScope = 'news_time_scope',
  CompletionStream = 'completion_stream',
  Image = 'image',
  XPost = 'x_post',
  Error = 'error',
  Chart = 'chart',
  Table = 'table',
  Indicator = 'indicator'
}

export enum UiCategory {
  Prompt = 'prompt',
  Quotes = 'quotes',
  ActiveTab = 'active_tab',
  FollowUp = 'follow_up',
  SingleSelection = 'single_selection',
  CompletionStream = 'completion_stream',
  Image = 'image',
  XPost = 'x_post',
  Error = 'error',
  Chart = 'chart',
  Table = 'table',
  Indicator = 'indicator'
}

export enum Role {
  User,
  AI
}

// For future metadata of messages.
export type MetaData = never

export type InternalMetaData = {
  isFinishedMessage?: boolean
  messageSelections?: MessageSelection[]
}

export type Message = {
  id: string
  role: Role
  createdAt: Date
  interactions: MessageInteractions
  metaData?: MetaData
  internalMetaData?: InternalMetaData
}
