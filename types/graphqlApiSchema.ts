export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: any; output: any }
  Bytes: { input: any; output: any }
  Date: { input: any; output: any }
  Decimal: { input: any; output: any }
  Json: { input: any; output: any }
}

export type Agent = {
  __typename?: 'Agent'
  augmentTaskInstances: Array<AugmentTaskInstance>
  augmentTaskOptions: Array<AugmentTaskOption>
  clerkId: Scalars['String']['output']
  createdAt: Scalars['Date']['output']
  cryptoAccounts: Array<CryptoAccount>
  discordExpiryTime?: Maybe<Scalars['Date']['output']>
  discordRefreshToken?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  referrals: Array<AgentReferral>
  referredBy?: Maybe<AgentReferral>
  referredById?: Maybe<Scalars['String']['output']>
  status: AgentStatus
  telegramId?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['Date']['output']
}

export type AgentReferral = {
  __typename?: 'AgentReferral'
  agentId: Scalars['String']['output']
  agentOwner: Agent
  agents: Array<Agent>
  createdAt: Scalars['Date']['output']
  id: Scalars['ID']['output']
  referralCode: Scalars['String']['output']
  updatedAt: Scalars['Date']['output']
}

export type AgentReferralsFilter = {
  createdAt?: InputMaybe<DateFilter>
}

export type AgentReferralsResponse = {
  __typename?: 'AgentReferralsResponse'
  metadata: ResponseMetadata
  records: Array<AgentReferral>
}

export enum AgentStatus {
  Free = 'FREE',
  Gold = 'GOLD',
  Platinum = 'PLATINUM',
  Silver = 'SILVER'
}

export type AgentsResponse = {
  __typename?: 'AgentsResponse'
  metadata: ResponseMetadata
  records: Array<Agent>
}

export type AugmentTask = {
  __typename?: 'AugmentTask'
  augmentTaskInstances: Array<AugmentTaskInstance>
  augmentTaskOptions: Array<AugmentTaskOption>
  createdAt: Scalars['Date']['output']
  criticalLevel: AugmentTaskCriticalLevel
  expiry: Scalars['Date']['output']
  id: Scalars['String']['output']
  points: Scalars['Int']['output']
  prompt: Scalars['String']['output']
  taskType: AugmentTaskType
  updatedAt: Scalars['Date']['output']
}

export enum AugmentTaskCriticalLevel {
  Critical = 'CRITICAL',
  Normal = 'NORMAL'
}

export type AugmentTaskInstance = {
  __typename?: 'AugmentTaskInstance'
  answer: Scalars['Int']['output']
  augment: Scalars['String']['output']
  augmentTask: AugmentTask
  augmentTaskId: Scalars['String']['output']
  augmenter: Agent
  augmenterId: Scalars['String']['output']
  awardedPoints: Scalars['Int']['output']
  createdAt: Scalars['Date']['output']
  finishTime?: Maybe<Scalars['Date']['output']>
  id: Scalars['String']['output']
  status: AugmentTaskInstanceStatus
  updatedAt: Scalars['Date']['output']
}

export enum AugmentTaskInstanceStatus {
  Expired = 'EXPIRED',
  FinishedAccepted = 'FINISHED_ACCEPTED',
  FinishedDenied = 'FINISHED_DENIED',
  Pending = 'PENDING'
}

export type AugmentTaskInstancesFilter = {
  augmenterId?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<DateFilter>
  status?: InputMaybe<AugmentTaskInstanceStatus>
}

export type AugmentTaskInstancesFilterNested = {
  every?: InputMaybe<AugmentTaskInstancesFilter>
  none?: InputMaybe<AugmentTaskInstancesFilter>
  some?: InputMaybe<AugmentTaskInstancesFilter>
}

export type AugmentTaskInstancesResponse = {
  __typename?: 'AugmentTaskInstancesResponse'
  metadata: ResponseMetadata
  records: Array<AugmentTaskInstance>
}

export type AugmentTaskOption = {
  __typename?: 'AugmentTaskOption'
  augmentTask: AugmentTask
  augmentTaskId: Scalars['String']['output']
  augmenter: Agent
  augmenterId: Scalars['String']['output']
  createdAt: Scalars['Date']['output']
  id: Scalars['ID']['output']
  text: Scalars['String']['output']
  updatedAt: Scalars['Date']['output']
}

export type AugmentTaskOptionsResponse = {
  __typename?: 'AugmentTaskOptionsResponse'
  metadata: ResponseMetadata
  records: Array<AugmentTaskOption>
}

export enum AugmentTaskType {
  Augment = 'AUGMENT'
}

export type AugmentTasksFilter = {
  augmentTaskInstances?: InputMaybe<AugmentTaskInstancesFilterNested>
  createdAt?: InputMaybe<DateFilter>
  expiry?: InputMaybe<DateFilter>
}

export type AugmentTasksResponse = {
  __typename?: 'AugmentTasksResponse'
  metadata: ResponseMetadata
  records: Array<AugmentTask>
}

export type BigIntFilter = {
  equals?: InputMaybe<Scalars['BigInt']['input']>
  gt?: InputMaybe<Scalars['BigInt']['input']>
  gte?: InputMaybe<Scalars['BigInt']['input']>
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  lt?: InputMaybe<Scalars['BigInt']['input']>
  lte?: InputMaybe<Scalars['BigInt']['input']>
  not?: InputMaybe<BigIntFilter>
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>
  not?: InputMaybe<BooleanFilter>
}

export type BytesFilter = {
  equals?: InputMaybe<Scalars['Bytes']['input']>
  in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  not?: InputMaybe<BytesFilter>
  notIn?: InputMaybe<Array<Scalars['Bytes']['input']>>
}

export type ChatActiveTabContent = {
  __typename?: 'ChatActiveTabContent'
  text: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type ChatActiveTabContentInput = {
  text: Scalars['String']['input']
  url: Scalars['String']['input']
}

export type ChatCompletionStreamContent = {
  __typename?: 'ChatCompletionStreamContent'
  text: Scalars['String']['output']
}

export type ChatCompletionStreamContentInput = {
  text: Scalars['String']['input']
}

export type ChatErrorContent = {
  __typename?: 'ChatErrorContent'
  error_type: Scalars['String']['output']
  text: Scalars['String']['output']
}

export type ChatErrorContentInput = {
  error_type: Scalars['String']['input']
  text: Scalars['String']['input']
}

export type ChatFollowUpContent = {
  __typename?: 'ChatFollowUpContent'
  options: Array<ChatFollowUpOption>
  selected_option_index: Scalars['Int']['output']
}

export type ChatFollowUpContentInput = {
  options: Array<ChatFollowUpOptionInput>
  selected_option_index: Scalars['Int']['input']
}

export type ChatFollowUpOption = {
  __typename?: 'ChatFollowUpOption'
  displayed_value: Scalars['String']['output']
  display_value?: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type ChatFollowUpOptionInput = {
  displayed_value: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type ChatImageContent = {
  __typename?: 'ChatImageContent'
  url_list: Array<ChatImageUrl>
}

export type ChatImageContentInput = {
  url_list: Array<ChatImageUrlInput>
}

export type ChatImageUrl = {
  __typename?: 'ChatImageUrl'
  url: Scalars['String']['output']
}

export type ChatImageUrlInput = {
  url: Scalars['String']['input']
}

export type ChatInput = {
  conversation_id: Scalars['String']['input']
  interactions: Array<InteractionInput>
  metadata?: InputMaybe<EmptyObjectInput>
  user_id: Scalars['String']['input']
}

export type ChatInteractionActiveTab = {
  __typename?: 'ChatInteractionActiveTab'
  content: ChatActiveTabContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionActiveTabInput = {
  content: ChatActiveTabContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionCompletionStream = {
  __typename?: 'ChatInteractionCompletionStream'
  content: ChatCompletionStreamContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionCompletionStreamInput = {
  content: ChatCompletionStreamContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionError = {
  __typename?: 'ChatInteractionError'
  content: ChatErrorContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionErrorInput = {
  content: ChatErrorContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionFollowUp = {
  __typename?: 'ChatInteractionFollowUp'
  content: ChatFollowUpContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionFollowUpInput = {
  content: ChatFollowUpContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionImage = {
  __typename?: 'ChatInteractionImage'
  content: ChatImageContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionImageInput = {
  content: ChatImageContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionPrompt = {
  __typename?: 'ChatInteractionPrompt'
  content: ChatPromptContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionPromptInput = {
  content: ChatPromptContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionQuotes = {
  __typename?: 'ChatInteractionQuotes'
  content: ChatQuotesContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionQuotesInput = {
  content: ChatQuotesContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionSingleSelection = {
  __typename?: 'ChatInteractionSingleSelection'
  content: ChatSingleSelectionContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionSingleSelectionInput = {
  content: ChatSingleSelectionContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionXPost = {
  __typename?: 'ChatInteractionXPost'
  content: ChatXPostContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionXPostInput = {
  content: ChatXPostContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatPromptContent = {
  __typename?: 'ChatPromptContent'
  text: Scalars['String']['output']
}

export type ChatPromptContentInput = {
  text: Scalars['String']['input']
}

export type ChatQuote = {
  __typename?: 'ChatQuote'
  text: Scalars['String']['output']
}

export type ChatQuoteInput = {
  text: Scalars['String']['input']
}

export type ChatQuotesContent = {
  __typename?: 'ChatQuotesContent'
  quotes: Array<ChatQuote>
}

export type ChatQuotesContentInput = {
  quotes: Array<ChatQuoteInput>
}

export type ChatRequest = {
  __typename?: 'ChatRequest'
  conversation_id: Scalars['String']['output']
  interactions: Array<Interaction>
  metadata?: Maybe<EmptyObject>
  user_id: Scalars['String']['output']
}

export type ChatResponse = {
  __typename?: 'ChatResponse'
  conversation_id: Scalars['String']['output']
  interactions: Array<Interaction>
  metadata?: Maybe<EmptyObject>
  user_id: Scalars['String']['output']
}

export type ChatSingleSelectionContent = {
  __typename?: 'ChatSingleSelectionContent'
  options: Array<ChatSingleSelectionContentOption>
  selected_option_index: Scalars['Int']['output']
}

export type ChatSingleSelectionContentInput = {
  options: Array<ChatSingleSelectionContentOptionInput>
  selected_option_index: Scalars['Int']['input']
}

export type ChatSingleSelectionContentOption = {
  __typename?: 'ChatSingleSelectionContentOption'
  display_value: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type ChatSingleSelectionContentOptionInput = {
  display_value: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type ChatXPostContent = {
  __typename?: 'ChatXPostContent'
  post_id: Scalars['String']['output']
}

export type ChatXPostContentInput = {
  post_id: Scalars['String']['input']
}

export type CreateAgentInput = {
  clerkId: Scalars['String']['input']
  discordExpiryTime?: InputMaybe<Scalars['Date']['input']>
  discordRefreshToken?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
  status: AgentStatus
  telegramId?: InputMaybe<Scalars['String']['input']>
}

export type CreateAgentReferralInput = {
  agentId: Scalars['String']['input']
  referralCode: Scalars['String']['input']
}

export type CreateAugmentTaskInput = {
  criticalLevel: AugmentTaskCriticalLevel
  expiry: Scalars['Date']['input']
  points: Scalars['Int']['input']
  prompt: Scalars['String']['input']
  taskType: AugmentTaskType
}

export type CreateAugmentTaskInstanceInput = {
  answer: Scalars['Int']['input']
  augment: Scalars['String']['input']
  augmentTaskId: Scalars['String']['input']
  augmenterId: Scalars['String']['input']
  awardedPoints: Scalars['Int']['input']
  finishTime?: InputMaybe<Scalars['Date']['input']>
  status: AugmentTaskInstanceStatus
}

export type CreateAugmentTaskOptionInput = {
  augmentTaskId: Scalars['String']['input']
  augmenterId: Scalars['String']['input']
  text: Scalars['String']['input']
}

export type CreateCryptoAccountInput = {
  address: Scalars['String']['input']
  agentId: Scalars['String']['input']
  balance: Scalars['Decimal']['input']
  chain: CryptoAccountChain
  stake: Scalars['Decimal']['input']
}

export type CryptoAccount = {
  __typename?: 'CryptoAccount'
  address: Scalars['String']['output']
  agent: Agent
  agentId: Scalars['String']['output']
  balance: Scalars['Decimal']['output']
  chain: CryptoAccountChain
  createdAt: Scalars['Date']['output']
  id: Scalars['String']['output']
  stake: Scalars['Decimal']['output']
  updatedAt: Scalars['Date']['output']
}

export enum CryptoAccountChain {
  Metabit = 'METABIT',
  Solana = 'SOLANA'
}

export type CryptoAccountsResponse = {
  __typename?: 'CryptoAccountsResponse'
  metadata: ResponseMetadata
  records: Array<CryptoAccount>
}

export type DateFilter = {
  equals?: InputMaybe<Scalars['Date']['input']>
  gt?: InputMaybe<Scalars['Date']['input']>
  gte?: InputMaybe<Scalars['Date']['input']>
  in?: InputMaybe<Array<Scalars['Date']['input']>>
  lt?: InputMaybe<Scalars['Date']['input']>
  lte?: InputMaybe<Scalars['Date']['input']>
  not?: InputMaybe<DateFilter>
  notIn?: InputMaybe<Array<Scalars['Date']['input']>>
}

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>
  gt?: InputMaybe<Scalars['Decimal']['input']>
  gte?: InputMaybe<Scalars['Decimal']['input']>
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>
  lt?: InputMaybe<Scalars['Decimal']['input']>
  lte?: InputMaybe<Scalars['Decimal']['input']>
  not?: InputMaybe<DecimalFilter>
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>
}

export type EmptyObject = {
  __typename?: 'EmptyObject'
  placeholder?: Maybe<Scalars['String']['output']>
}

export type EmptyObjectInput = {
  placeholder?: InputMaybe<Scalars['String']['input']>
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<Scalars['Float']['input']>>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  not?: InputMaybe<FloatFilter>
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntFilter>
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type Interaction =
  | ChatInteractionActiveTab
  | ChatInteractionCompletionStream
  | ChatInteractionError
  | ChatInteractionFollowUp
  | ChatInteractionImage
  | ChatInteractionPrompt
  | ChatInteractionQuotes
  | ChatInteractionSingleSelection
  | ChatInteractionXPost
  | ChatInteractionChart
  | ChatInteractionTable
  | ChatInteractionIndicator

export type InteractionInput = {
  chatInteractionActiveTab?: InputMaybe<ChatInteractionActiveTabInput>
  chatInteractionCompletionStream?: InputMaybe<ChatInteractionCompletionStreamInput>
  chatInteractionError?: InputMaybe<ChatInteractionErrorInput>
  chatInteractionFollowUp?: InputMaybe<ChatInteractionFollowUpInput>
  chatInteractionImage?: InputMaybe<ChatInteractionImageInput>
  chatInteractionPrompt?: InputMaybe<ChatInteractionPromptInput>
  chatInteractionQuotes?: InputMaybe<ChatInteractionQuotesInput>
  chatInteractionSingleSelection?: InputMaybe<ChatInteractionSingleSelectionInput>
  chatInteractionXPost?: InputMaybe<ChatInteractionXPostInput>
  chatInteractionChart?: InputMaybe<ChatInteractionChartInput>
  chatInteractionTable?: InputMaybe<ChatInteractionTableInput>
  chatInteractionIndicator?: InputMaybe<ChatInteractionIndicatorInput>
}

export type JsonFilter = {
  equals?: InputMaybe<Scalars['Json']['input']>
  not?: InputMaybe<JsonFilter>
}

export type Mutation = {
  __typename?: 'Mutation'
  createAgent: Agent
  createAgentReferral: AgentReferral
  createAugmentTask: AugmentTask
  createAugmentTaskInstance: AugmentTaskInstance
  createAugmentTaskOption: AugmentTaskOption
  createCryptoAccount: CryptoAccount
  deleteAgent: Agent
  deleteAgentReferral: AgentReferral
  deleteAugmentTask: AugmentTask
  deleteAugmentTaskInstance: AugmentTaskInstance
  deleteAugmentTaskOption: AugmentTaskOption
  deleteCryptoAccount: CryptoAccount
  updateAgent: Agent
  updateAgentReferral: AgentReferral
  updateAugmentTask: AugmentTask
  updateAugmentTaskInstance: AugmentTaskInstance
  updateAugmentTaskOption: AugmentTaskOption
  updateCryptoAccount: CryptoAccount
}

export type MutationCreateAgentArgs = {
  input: CreateAgentInput
}

export type MutationCreateAgentReferralArgs = {
  input: CreateAgentReferralInput
}

export type MutationCreateAugmentTaskArgs = {
  input: CreateAugmentTaskInput
}

export type MutationCreateAugmentTaskInstanceArgs = {
  input: CreateAugmentTaskInstanceInput
}

export type MutationCreateAugmentTaskOptionArgs = {
  input: CreateAugmentTaskOptionInput
}

export type MutationCreateCryptoAccountArgs = {
  input: CreateCryptoAccountInput
}

export type MutationDeleteAgentArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteAgentReferralArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteAugmentTaskArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteAugmentTaskInstanceArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteAugmentTaskOptionArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteCryptoAccountArgs = {
  id: Scalars['String']['input']
}

export type MutationUpdateAgentArgs = {
  input: UpdateAgentInput
}

export type MutationUpdateAgentReferralArgs = {
  input: UpdateAgentReferralInput
}

export type MutationUpdateAugmentTaskArgs = {
  input: UpdateAugmentTaskInput
}

export type MutationUpdateAugmentTaskInstanceArgs = {
  input: UpdateAugmentTaskInstanceInput
}

export type MutationUpdateAugmentTaskOptionArgs = {
  input: UpdateAugmentTaskOptionInput
}

export type MutationUpdateCryptoAccountArgs = {
  input: UpdateCryptoAccountInput
}

export type OrderInput = {
  field: Scalars['String']['input']
  type: OrderType
}

export enum OrderType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query'
  agent?: Maybe<Agent>
  agentByClerkId?: Maybe<Agent>
  agentByEmail?: Maybe<Agent>
  agentReferral?: Maybe<AgentReferral>
  agentReferrals: AgentReferralsResponse
  agents: AgentsResponse
  augmentTask?: Maybe<AugmentTask>
  augmentTaskInstance?: Maybe<AugmentTaskInstance>
  augmentTaskInstances: AugmentTaskInstancesResponse
  augmentTaskOption?: Maybe<AugmentTaskOption>
  augmentTaskOptions: AugmentTaskOptionsResponse
  augmentTasks: AugmentTasksResponse
  cryptoAccount?: Maybe<CryptoAccount>
  cryptoAccounts: CryptoAccountsResponse
}

export type QueryAgentArgs = {
  id: Scalars['String']['input']
}

export type QueryAgentByClerkIdArgs = {
  clerkId: Scalars['String']['input']
}

export type QueryAgentByEmailArgs = {
  email: Scalars['String']['input']
}

export type QueryAgentReferralArgs = {
  id: Scalars['String']['input']
}

export type QueryAgentReferralsArgs = {
  filter?: InputMaybe<AgentReferralsFilter>
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export type QueryAgentsArgs = {
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export type QueryAugmentTaskArgs = {
  id: Scalars['String']['input']
}

export type QueryAugmentTaskInstanceArgs = {
  id: Scalars['String']['input']
}

export type QueryAugmentTaskInstancesArgs = {
  filter?: InputMaybe<AugmentTaskInstancesFilter>
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export type QueryAugmentTaskOptionArgs = {
  id: Scalars['String']['input']
}

export type QueryAugmentTaskOptionsArgs = {
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export type QueryAugmentTasksArgs = {
  filter?: InputMaybe<AugmentTasksFilter>
  limit?: InputMaybe<Scalars['Int']['input']>
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export type QueryCryptoAccountArgs = {
  id: Scalars['String']['input']
}

export type QueryCryptoAccountsArgs = {
  order?: InputMaybe<OrderInput>
  select?: InputMaybe<SelectInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type ResponseMetadata = {
  __typename?: 'ResponseMetadata'
  count: Scalars['Int']['output']
  limit: Scalars['Int']['output']
  offset: Scalars['Int']['output']
}

export type SelectInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<StringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type Subscription = {
  __typename?: 'Subscription'
  chat: ChatResponse
}

export type SubscriptionChatArgs = {
  input: ChatInput
}

export type UpdateAgentInput = {
  clerkId: Scalars['String']['input']
  discordExpiryTime?: InputMaybe<Scalars['Date']['input']>
  discordRefreshToken?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
  id: Scalars['String']['input']
  status: AgentStatus
  telegramId?: InputMaybe<Scalars['String']['input']>
}

export type UpdateAgentReferralInput = {
  agentId: Scalars['String']['input']
  id: Scalars['String']['input']
  referralCode: Scalars['String']['input']
}

export type UpdateAugmentTaskInput = {
  criticalLevel: AugmentTaskCriticalLevel
  expiry: Scalars['Date']['input']
  id: Scalars['String']['input']
  points: Scalars['Int']['input']
  prompt: Scalars['String']['input']
  taskType: AugmentTaskType
}

export type UpdateAugmentTaskInstanceInput = {
  answer: Scalars['Int']['input']
  augment: Scalars['String']['input']
  augmentTaskId: Scalars['String']['input']
  augmenterId: Scalars['String']['input']
  awardedPoints: Scalars['Int']['input']
  finishTime?: InputMaybe<Scalars['Date']['input']>
  id: Scalars['String']['input']
  status: AugmentTaskInstanceStatus
}

export type UpdateAugmentTaskOptionInput = {
  augmentTaskId: Scalars['String']['input']
  augmenterId: Scalars['String']['input']
  id: Scalars['String']['input']
  text: Scalars['String']['input']
}

export type UpdateCryptoAccountInput = {
  address: Scalars['String']['input']
  balance: Scalars['Decimal']['input']
  chain: CryptoAccountChain
  id: Scalars['String']['input']
  stake: Scalars['Decimal']['input']
}

export type ChartPoint = {
  __typename?: 'ChartPoint'
  x: Scalars['String']['output']
  y: Scalars['Float']['output']
  metadata?: Scalars['Json']['output']
}

export type ChartSeries = {
  __typename?: 'ChartSeries'
  name: Scalars['String']['output']
  type: Scalars['String']['output']
  data: Array<ChartPoint>
  metadata?: Scalars['Json']['output']
}

export type ChatChartContent = {
  __typename?: 'ChatChartContent'
  title: Scalars['String']['output']
  type: Scalars['String']['output']
  series: Array<ChartSeries>
  metadata?: Scalars['Json']['output']
}

// Table types
export type TableCell = {
  __typename?: 'TableCell'
  value: Scalars['String']['output']
  metadata?: Scalars['Json']['output']
}

export type TableRow = {
  __typename?: 'TableRow'
  id: Scalars['String']['output']
  cells: Array<TableCell>
  metadata?: Scalars['Json']['output']
}

export type TableColumn = {
  __typename?: 'TableColumn'
  key: Scalars['String']['output']
  title: Scalars['String']['output']
  metadata?: Scalars['Json']['output']
}

export type ChatTableContent = {
  __typename?: 'ChatTableContent'
  title: Scalars['String']['output']
  type: Scalars['String']['output']
  columns: Array<TableColumn>
  rows: Array<TableRow>
  metadata?: Scalars['Json']['output']
}

// Indicator type
export type ChatIndicatorContent = {
  __typename?: 'ChatIndicatorContent'
  name: Scalars['String']['output']
  type: Scalars['String']['output']
  value: Scalars['Float']['output']
  signal?: Scalars['String']['output']
  metadata?: Scalars['Json']['output']
}

// Input types
export type ChatChartPointInput = {
  x: Scalars['String']['input']
  y: Scalars['Float']['input']
  metadata?: Scalars['Json']['input']
}

export type ChatChartSeriesInput = {
  name: Scalars['String']['input']
  type: Scalars['String']['input']
  data: Array<ChatChartPointInput>
  metadata?: Scalars['Json']['input']
}

export type ChatChartContentInput = {
  title: Scalars['String']['input']
  type: Scalars['String']['input']
  series: Array<ChatChartSeriesInput>
  metadata?: Scalars['Json']['input']
}

export type ChatTableCellInput = {
  value: Scalars['String']['input']
  metadata?: Scalars['Json']['input']
}

export type ChatTableRowInput = {
  id: Scalars['String']['input']
  cells: Array<ChatTableCellInput>
  metadata?: Scalars['Json']['input']
}

export type ChatTableColumnInput = {
  key: Scalars['String']['input']
  title: Scalars['String']['input']
  metadata?: Scalars['Json']['input']
}

export type ChatTableContentInput = {
  title: Scalars['String']['input']
  type: Scalars['String']['input']
  columns: Array<ChatTableColumnInput>
  rows: Array<ChatTableRowInput>
  metadata?: Scalars['Json']['input']
}

export type ChatIndicatorContentInput = {
  name: Scalars['String']['input']
  type: Scalars['String']['input']
  value: Scalars['Float']['input']
  signal?: Scalars['String']['input']
  metadata?: Scalars['Json']['input']
}

// Interaction types
export type ChatInteractionChart = {
  __typename?: 'ChatInteractionChart'
  content: ChatChartContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionTable = {
  __typename?: 'ChatInteractionTable'
  content: ChatTableContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

export type ChatInteractionIndicator = {
  __typename?: 'ChatInteractionIndicator'
  content: ChatIndicatorContent
  handler_type: Scalars['String']['output']
  id: Scalars['String']['output']
  ui_category: Scalars['String']['output']
}

// Input types for interactions
export type ChatInteractionChartInput = {
  content: ChatChartContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionTableInput = {
  content: ChatTableContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}

export type ChatInteractionIndicatorInput = {
  content: ChatIndicatorContentInput
  handler_type: Scalars['String']['input']
  id: Scalars['String']['input']
  ui_category: Scalars['String']['input']
}
