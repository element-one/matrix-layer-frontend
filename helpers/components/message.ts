import type {
  ChatFollowUpOptionInput,
  ChatInteractionActiveTabInput,
  ChatInteractionChartInput,
  ChatInteractionCompletionStreamInput,
  ChatInteractionErrorInput,
  ChatInteractionFollowUpInput,
  ChatInteractionImageInput,
  ChatInteractionIndicatorInput,
  ChatInteractionPromptInput,
  ChatInteractionQuotesInput,
  ChatInteractionSingleSelectionInput,
  ChatInteractionTableInput,
  ChatInteractionXPostInput,
  ChatQuoteInput,
  ChatSingleSelectionContentOptionInput
} from '@type/graphqlApiSchema'
import {
  HandlerType,
  InternalMetaData,
  Message,
  MessageInteraction,
  MessageInteractions,
  MetaData,
  Role,
  UiCategory
} from '@type/internal/message'
import { deepMergeArrays } from '@utils/deepMerge'
import { generateRandomChatId, getRandomId } from '@utils/random'

function getInteractionByHandlerType(
  message: Message,
  handleType: HandlerType
): MessageInteraction | undefined {
  return message.interactions.find((interaction) => {
    return interaction.handler_type === handleType
  })
}

function getInteractionByUiCategory(
  message: Message,
  uiCategory: UiCategory
): MessageInteraction | undefined {
  return message.interactions.find((interaction) => {
    return interaction.ui_category === uiCategory
  })
}

export function getPromptInteractionByUiCategory(
  message: Message
): ChatInteractionPromptInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Prompt) as
    | ChatInteractionPromptInput
    | undefined
}

export function getXPostInteractionByUiCategory(
  message: Message
): ChatInteractionXPostInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.XPost) as
    | ChatInteractionXPostInput
    | undefined
}

export function getImagesInteractionByUiCategory(
  message: Message
): ChatInteractionImageInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Image) as
    | ChatInteractionImageInput
    | undefined
}

export function getErrorInteractionByUiCategory(
  message: Message
): ChatInteractionErrorInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Error) as
    | ChatInteractionErrorInput
    | undefined
}

export function getCompletionStreamInteractionByUiCategory(
  message: Message
): ChatInteractionCompletionStreamInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.CompletionStream) as
    | ChatInteractionCompletionStreamInput
    | undefined
}

export function getFollowUpInteractionByUiCategory(
  message: Message
): ChatInteractionFollowUpInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.FollowUp) as
    | ChatInteractionFollowUpInput
    | undefined
}

export function getSingleSelectionNewsTimeScope(
  message: Message
): ChatInteractionSingleSelectionInput | undefined {
  return getInteractionByHandlerType(message, HandlerType.NewsTimeScope) as
    | ChatInteractionSingleSelectionInput
    | undefined
}

export function createPromptInteraction(
  text: string
): ChatInteractionPromptInput {
  return {
    ui_category: UiCategory.Prompt,
    handler_type: HandlerType.Prompt,
    id: generateRandomChatId(),
    content: {
      text
    }
  }
}

export function createQuotesInteraction(
  quotes: ChatQuoteInput[]
): ChatInteractionQuotesInput {
  return {
    ui_category: UiCategory.Quotes,
    handler_type: HandlerType.Quotes,
    id: generateRandomChatId(),
    content: {
      quotes
    }
  }
}

export function createActiveTabInteraction(
  text: string,
  url: string
): ChatInteractionActiveTabInput {
  return {
    ui_category: UiCategory.ActiveTab,
    handler_type: HandlerType.ActiveTab,
    id: generateRandomChatId(),
    content: {
      text,
      url
    }
  }
}

function createSingleSelectionInteraction(
  options: ChatSingleSelectionContentOptionInput[],
  handlerType: HandlerType,
  selectedOptionIndex: number = -1
): ChatInteractionSingleSelectionInput {
  return {
    ui_category: UiCategory.SingleSelection,
    handler_type: handlerType,
    id: generateRandomChatId(),
    content: {
      options,
      selected_option_index: selectedOptionIndex
    }
  }
}

export function createSingleSelectionNewsTimeScope(
  options: ChatSingleSelectionContentOptionInput[],
  selectedOptionIndex: number = -1
): ChatInteractionSingleSelectionInput {
  return createSingleSelectionInteraction(
    options,
    HandlerType.NewsTimeScope,
    selectedOptionIndex
  )
}

export function createCompletionStreamInteraction(
  text: string
): ChatInteractionCompletionStreamInput {
  return {
    ui_category: UiCategory.CompletionStream,
    handler_type: HandlerType.CompletionStream,
    id: generateRandomChatId(),
    content: {
      text
    }
  }
}

export function createFollowUpInteraction(
  options: ChatFollowUpOptionInput[],
  selectedOptionIndex: number,
  id?: string
): ChatInteractionFollowUpInput {
  return {
    ui_category: UiCategory.FollowUp,
    handler_type: HandlerType.FollowUp,
    id: id || generateRandomChatId(),
    content: {
      options,
      selected_option_index: selectedOptionIndex
    }
  }
}

export function getMessageText(message: Message) {
  if (message.content) {
    return message.content
  }

  const promptInteraction = getPromptInteractionByUiCategory(message)
  const completionStreamInteraction =
    getCompletionStreamInteractionByUiCategory(message)

  return (
    promptInteraction?.content.text || completionStreamInteraction?.content.text
  )
}

function mergeInteractionsForResponse(
  interactions: MessageInteractions,
  previousMessageInteractions: MessageInteractions
): MessageInteractions {
  const previousInteractionsMap = new Map(
    previousMessageInteractions.map((interaction) => [
      interaction.id,
      interaction
    ])
  )

  interactions.forEach((interaction) => {
    previousInteractionsMap.set(
      interaction.id,
      deepMergeArrays(previousInteractionsMap.get(interaction.id), interaction)
    )
  })

  return Array.from(previousInteractionsMap.values())
}

export function createMessage(
  interactions: MessageInteractions,
  internalMetaData?: InternalMetaData,
  metaData?: MetaData
): Message {
  return {
    id: getRandomId(),
    role: Role.User,
    createdAt: new Date(),
    interactions,
    ...(metaData ? { metaData } : {}),
    ...(internalMetaData ? { internalMetaData } : {})
  }
}

type MessageRest = Omit<Message, 'id' | 'role' | 'createdAt' | 'interactions'>

export function mergeResponseMessages(
  responseMessage: Message,
  lastSystemMessage?: Message
): Message {
  if (!lastSystemMessage) {
    return responseMessage
  }

  const responseMessageToMerge: MessageRest = {
    ...(responseMessage.metaData ? { metaData: responseMessage.metaData } : {}),
    ...(responseMessage.internalMetaData
      ? { internalMetaData: responseMessage.internalMetaData }
      : {})
  }

  const lastSystemMessageToMerge: MessageRest = {
    ...(lastSystemMessage.metaData
      ? { metaData: lastSystemMessage.metaData }
      : {}),
    ...(lastSystemMessage.internalMetaData
      ? { internalMetaData: lastSystemMessage.internalMetaData }
      : {})
  }

  const mergedMessageRest = deepMergeArrays(
    lastSystemMessageToMerge,
    responseMessageToMerge
  ) as MessageRest

  return {
    ...lastSystemMessage,
    interactions: mergeInteractionsForResponse(
      responseMessage.interactions,
      lastSystemMessage.interactions
    ),
    ...mergedMessageRest
  }
}

function mergeRequestInteractions(
  interactions: MessageInteractions,
  previousMessageInteractions: MessageInteractions
): MessageInteractions {
  // Create a Set of ui_categories from the new interactions for efficient lookup
  const interactionCategories = new Set(interactions.map((i) => i.ui_category))

  const previousInteractionsMap = new Map(
    previousMessageInteractions.flatMap((interaction) => {
      if (interaction.ui_category === UiCategory.CompletionStream) {
        return []
      }

      if (interactionCategories.has(interaction.ui_category)) {
        return []
      }

      return [[interaction.id, interaction]]
    })
  )

  interactions.forEach((interaction) => {
    previousInteractionsMap.set(
      interaction.id,
      deepMergeArrays(previousInteractionsMap.get(interaction.id), interaction)
    )
  })

  return Array.from(previousInteractionsMap.values())
}

export function mergeRequestMessages(
  requestMessage: Message,
  lastAiMessage?: Message | null
): Message {
  if (!lastAiMessage) {
    return requestMessage
  }

  return {
    ...requestMessage,
    interactions: mergeRequestInteractions(
      requestMessage.interactions,
      lastAiMessage.interactions
    )
  }
}

// New function to get all interactions of a specific category
export function getAllInteractionsByUiCategory(
  message: Message,
  uiCategory: UiCategory
): MessageInteraction[] {
  return message.interactions.filter((interaction) => {
    return interaction.ui_category === uiCategory
  })
}

// Specific helpers for single interactions (existing pattern)
export function getChartInteractionByUiCategory(
  message: Message
): ChatInteractionChartInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Chart) as
    | ChatInteractionChartInput
    | undefined
}

export function getTableInteractionByUiCategory(
  message: Message
): ChatInteractionTableInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Table) as
    | ChatInteractionTableInput
    | undefined
}

export function getIndicatorInteractionByUiCategory(
  message: Message
): ChatInteractionIndicatorInput | undefined {
  return getInteractionByUiCategory(message, UiCategory.Indicator) as
    | ChatInteractionIndicatorInput
    | undefined
}

// New helpers for multiple interactions
export function getAllChartInteractionsByUiCategory(
  message: Message
): ChatInteractionChartInput[] {
  return getAllInteractionsByUiCategory(
    message,
    UiCategory.Chart
  ) as ChatInteractionChartInput[]
}

export function getAllTableInteractionsByUiCategory(
  message: Message
): ChatInteractionTableInput[] {
  return getAllInteractionsByUiCategory(
    message,
    UiCategory.Table
  ) as ChatInteractionTableInput[]
}

export function getAllIndicatorInteractionsByUiCategory(
  message: Message
): ChatInteractionIndicatorInput[] {
  return getAllInteractionsByUiCategory(
    message,
    UiCategory.Indicator
  ) as ChatInteractionIndicatorInput[]
}

// Optional: Helper to get interactions by type
export function getInteractionsByType<T extends MessageInteraction>(
  message: Message,
  uiCategory: UiCategory,
  type: string
): T[] {
  return getAllInteractionsByUiCategory(message, uiCategory).filter(
    (interaction) => interaction.handler_type === type
  ) as T[]
}

// Usage examples:
// Get all charts of type 'line_chart'
export function getLineChartInteractions(
  message: Message
): ChatInteractionChartInput[] {
  return getInteractionsByType<ChatInteractionChartInput>(
    message,
    UiCategory.Chart,
    'line_chart'
  )
}

// Get all indicators of type 'momentum'
export function getMomentumIndicatorInteractions(
  message: Message
): ChatInteractionIndicatorInput[] {
  return getInteractionsByType<ChatInteractionIndicatorInput>(
    message,
    UiCategory.Indicator,
    'momentum'
  )
}

// Get all tables of type 'price_levels'
export function getPriceLevelTableInteractions(
  message: Message
): ChatInteractionTableInput[] {
  return getInteractionsByType<ChatInteractionTableInput>(
    message,
    UiCategory.Table,
    'price_levels'
  )
}
