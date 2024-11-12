import type {
  ChatInteractionActiveTab,
  ChatInteractionActiveTabInput,
  ChatInteractionChart,
  ChatInteractionChartInput,
  ChatInteractionCompletionStream,
  ChatInteractionCompletionStreamInput,
  ChatInteractionError,
  ChatInteractionErrorInput,
  ChatInteractionFollowUp,
  ChatInteractionFollowUpInput,
  ChatInteractionImage,
  ChatInteractionImageInput,
  ChatInteractionIndicator,
  ChatInteractionIndicatorInput,
  ChatInteractionPrompt,
  ChatInteractionPromptInput,
  ChatInteractionQuotes,
  ChatInteractionQuotesInput,
  ChatInteractionSingleSelection,
  ChatInteractionSingleSelectionInput,
  ChatInteractionTable,
  ChatInteractionTableInput,
  ChatInteractionXPost,
  ChatInteractionXPostInput,
  ChatResponse,
  Interaction
} from '@type/graphqlApiSchema'
import {
  Message,
  MessageInteractions,
  Role,
  UiCategory
} from '@type/internal/message'
import { getRandomId } from '@utils/random'

function convertPromptInteraction(
  interaction: ChatInteractionPrompt
): ChatInteractionPromptInput {
  return {
    content: {
      text: interaction.content.text
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertQuotesInteraction(
  interaction: ChatInteractionQuotes
): ChatInteractionQuotesInput {
  return {
    content: {
      quotes: interaction.content.quotes.map((quote) => ({
        text: quote.text
      }))
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertActiveTabInteraction(
  interaction: ChatInteractionActiveTab
): ChatInteractionActiveTabInput {
  return {
    content: {
      text: interaction.content.text,
      url: interaction.content.url
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertFollowUpInteraction(
  interaction: ChatInteractionFollowUp
): ChatInteractionFollowUpInput {
  return {
    content: {
      options: interaction.content.options.map((option) => ({
        displayed_value: option.displayed_value,
        value: option.value
      })),
      selected_option_index: interaction.content.selected_option_index
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertSingleSelectionInteraction(
  interaction: ChatInteractionSingleSelection
): ChatInteractionSingleSelectionInput {
  return {
    content: {
      options: interaction.content.options.map((option) => ({
        display_value: option.display_value,
        value: option.value
      })),
      selected_option_index: interaction.content.selected_option_index
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertCompletionStreamInteraction(
  interaction: ChatInteractionCompletionStream
): ChatInteractionCompletionStreamInput {
  return {
    content: {
      text: interaction.content.text
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertImageInteraction(
  interaction: ChatInteractionImage
): ChatInteractionImageInput {
  return {
    content: {
      url_list: interaction.content.url_list.map((urlItem) => ({
        url: urlItem.url
      }))
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertXPostInteraction(
  interaction: ChatInteractionXPost
): ChatInteractionXPostInput {
  return {
    content: {
      post_id: interaction.content.post_id
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}
function convertChartInteraction(
  interaction: ChatInteractionChart
): ChatInteractionChartInput {
  return {
    content: {
      title: interaction.content.title,
      type: interaction.content.type,
      series: interaction.content.series.map((series) => ({
        name: series.name,
        type: series.type,
        data: series.data.map((point) => ({
          x: point.x,
          y: point.y,
          metadata: point.metadata
        })),
        metadata: series.metadata
      })),
      metadata: interaction.content.metadata
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertTableInteraction(
  interaction: ChatInteractionTable
): ChatInteractionTableInput {
  return {
    content: {
      title: interaction.content.title,
      type: interaction.content.type,
      columns: interaction.content.columns.map((column) => ({
        key: column.key,
        title: column.title,
        metadata: column.metadata
      })),
      rows: interaction.content.rows.map((row) => ({
        id: row.id,
        cells: row.cells.map((cell) => ({
          value: cell.value,
          metadata: cell.metadata
        })),
        metadata: row.metadata
      })),
      metadata: interaction.content.metadata
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertIndicatorInteraction(
  interaction: ChatInteractionIndicator
): ChatInteractionIndicatorInput {
  return {
    content: {
      name: interaction.content.name,
      type: interaction.content.type,
      value: interaction.content.value,
      signal: interaction.content.signal,
      metadata: interaction.content.metadata
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertErrorInteraction(
  interaction: ChatInteractionError
): ChatInteractionErrorInput {
  return {
    content: {
      error_type: interaction.content.error_type,
      text: interaction.content.text
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function transformInteractions(
  interactions: Interaction[]
): MessageInteractions {
  return interactions
    .map((interaction) => {
      switch (interaction.ui_category) {
        case UiCategory.Prompt:
          return convertPromptInteraction(interaction as ChatInteractionPrompt)
        case UiCategory.Quotes:
          return convertQuotesInteraction(interaction as ChatInteractionQuotes)
        case UiCategory.ActiveTab:
          return convertActiveTabInteraction(
            interaction as ChatInteractionActiveTab
          )
        case UiCategory.FollowUp:
          return convertFollowUpInteraction(
            interaction as ChatInteractionFollowUp
          )
        case UiCategory.SingleSelection:
          return convertSingleSelectionInteraction(
            interaction as ChatInteractionSingleSelection
          )
        case UiCategory.CompletionStream:
          return convertCompletionStreamInteraction(
            interaction as ChatInteractionCompletionStream
          )
        case UiCategory.Image:
          return convertImageInteraction(interaction as ChatInteractionImage)
        case UiCategory.XPost:
          return convertXPostInteraction(interaction as ChatInteractionXPost)
        case UiCategory.Error:
          return convertErrorInteraction(interaction as ChatInteractionError)
        case UiCategory.Chart:
          return convertChartInteraction(interaction as ChatInteractionChart)
        case UiCategory.Table:
          return convertTableInteraction(interaction as ChatInteractionTable)
        case UiCategory.Indicator:
          return convertIndicatorInteraction(
            interaction as ChatInteractionIndicator
          )
        default:
          return null
      }
    })
    .filter(Boolean) as MessageInteractions
}

export function chatMessageToMessage(chatResponse: ChatResponse): Message {
  return {
    id: getRandomId(),
    role: Role.AI,
    createdAt: new Date(),
    interactions: transformInteractions(chatResponse.interactions)
  }
}
