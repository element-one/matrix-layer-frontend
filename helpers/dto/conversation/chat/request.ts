import { sanitizeQuotes } from '@helpers/text'
import type {
  ChatInput,
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
  InteractionInput
} from '@type/graphqlApiSchema'
import {
  Message,
  MessageInteractions,
  UiCategory
} from '@type/internal/message'

function convertPromptInteraction(
  interaction: ChatInteractionPromptInput
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
  interaction: ChatInteractionQuotesInput
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
  interaction: ChatInteractionActiveTabInput
): ChatInteractionActiveTabInput {
  return {
    content: {
      text: sanitizeQuotes(interaction.content.text),
      url: interaction.content.url
    },
    handler_type: interaction.handler_type,
    id: interaction.id,
    ui_category: interaction.ui_category
  }
}

function convertFollowUpInteraction(
  interaction: ChatInteractionFollowUpInput
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
  interaction: ChatInteractionSingleSelectionInput
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
  interaction: ChatInteractionCompletionStreamInput
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
  interaction: ChatInteractionImageInput
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
  interaction: ChatInteractionXPostInput
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
  interaction: ChatInteractionChartInput
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
  interaction: ChatInteractionTableInput
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
  interaction: ChatInteractionIndicatorInput
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
  interaction: ChatInteractionErrorInput
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
  interactions: MessageInteractions
): InteractionInput[] {
  const mappedInteractions = interactions.map((interaction) => {
    switch (interaction.ui_category) {
      case UiCategory.Prompt:
        return {
          chatInteractionPrompt: convertPromptInteraction(
            interaction as ChatInteractionPromptInput
          )
        }
      case UiCategory.Quotes:
        return {
          chatInteractionQuotes: convertQuotesInteraction(
            interaction as ChatInteractionQuotesInput
          )
        }
      case UiCategory.ActiveTab:
        return {
          chatInteractionActiveTab: convertActiveTabInteraction(
            interaction as ChatInteractionActiveTabInput
          )
        }
      case UiCategory.FollowUp:
        return {
          chatInteractionFollowUp: convertFollowUpInteraction(
            interaction as ChatInteractionFollowUpInput
          )
        }
      case UiCategory.SingleSelection:
        return {
          chatInteractionSingleSelection: convertSingleSelectionInteraction(
            interaction as ChatInteractionSingleSelectionInput
          )
        }
      case UiCategory.CompletionStream:
        return {
          chatInteractionCompletionStream: convertCompletionStreamInteraction(
            interaction as ChatInteractionCompletionStreamInput
          )
        }
      case UiCategory.Image:
        return {
          chatInteractionImage: convertImageInteraction(
            interaction as ChatInteractionImageInput
          )
        }
      case UiCategory.XPost:
        return {
          chatInteractionXPost: convertXPostInteraction(
            interaction as ChatInteractionXPostInput
          )
        }
      case UiCategory.Error:
        return {
          chatInteractionError: convertErrorInteraction(
            interaction as ChatInteractionErrorInput
          )
        }
      case UiCategory.Chart:
        return {
          chatInteractionChart: convertChartInteraction(
            interaction as ChatInteractionChartInput
          )
        }
      case UiCategory.Table:
        return {
          chatInteractionTable: convertTableInteraction(
            interaction as ChatInteractionTableInput
          )
        }
      case UiCategory.Indicator:
        return {
          chatInteractionIndicator: convertIndicatorInteraction(
            interaction as ChatInteractionIndicatorInput
          )
        }
      default:
        return null
    }
  })

  return mappedInteractions.filter(Boolean) as InteractionInput[]
}

export function messageToChatMessage(
  message: Message,
  conversationId: string,
  userId: string
): { input: ChatInput } {
  return {
    input: {
      user_id: userId, //TODO:
      conversation_id: conversationId,
      interactions: transformInteractions(message.interactions)
    }
  }
}
