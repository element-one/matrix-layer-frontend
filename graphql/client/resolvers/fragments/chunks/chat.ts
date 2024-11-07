import { gql } from '@apollo/client'

export const ChatInteractionPromptFragment = gql`
  fragment ChatInteractionPromptFragment on ChatInteractionPrompt {
    ui_category
    handler_type
    id
    content {
      text
    }
  }
`

export const ChatInteractionQuotesFragment = gql`
  fragment ChatInteractionQuotesFragment on ChatInteractionQuotes {
    ui_category
    handler_type
    id
    content {
      quotes {
        text
      }
    }
  }
`

export const ChatInteractionActiveTabFragment = gql`
  fragment ChatInteractionActiveTabFragment on ChatInteractionActiveTab {
    ui_category
    handler_type
    id
    content {
      text
      url
    }
  }
`

export const ChatInteractionFollowUpFragment = gql`
  fragment ChatInteractionFollowUpFragment on ChatInteractionFollowUp {
    ui_category
    handler_type
    id
    content {
      options {
        value
        displayed_value
      }
      selected_option_index
    }
  }
`

export const ChatInteractionSingleSelectionFragment = gql`
  fragment ChatInteractionSingleSelectionFragment on ChatInteractionSingleSelection {
    ui_category
    handler_type
    id
    content {
      options {
        value
        display_value
      }
      selected_option_index
    }
  }
`

export const ChatInteractionCompletionStreamFragment = gql`
  fragment ChatInteractionCompletionStreamFragment on ChatInteractionCompletionStream {
    ui_category
    handler_type
    id
    content {
      text
    }
  }
`

export const ChatInteractionImageFragment = gql`
  fragment ChatInteractionImageFragment on ChatInteractionImage {
    ui_category
    handler_type
    id
    content {
      url_list {
        url
      }
    }
  }
`

export const ChatInteractionXPostFragment = gql`
  fragment ChatInteractionXPostFragment on ChatInteractionXPost {
    ui_category
    handler_type
    id
    content {
      post_id
    }
  }
`

export const ChatInteractionChartFragment = gql`
  fragment ChatInteractionChartFragment on ChatInteractionChart {
    ui_category
    handler_type
    id
    content {
      title
      type
      series {
        name
        type
        data {
          x
          y
          metadata
        }
        metadata
      }
      metadata
    }
  }
`

export const ChatInteractionTableFragment = gql`
  fragment ChatInteractionTableFragment on ChatInteractionTable {
    ui_category
    handler_type
    id
    content {
      title
      type
      columns {
        key
        title
        metadata
      }
      rows {
        id
        cells {
          value
          metadata
        }
        metadata
      }
      metadata
    }
  }
`

export const ChatInteractionIndicatorFragment = gql`
  fragment ChatInteractionIndicatorFragment on ChatInteractionIndicator {
    ui_category
    handler_type
    id
    content {
      name
      type
      value
      signal
      metadata
    }
  }
`

export const ChatInteractionErrorFragment = gql`
  fragment ChatInteractionErrorFragment on ChatInteractionError {
    ui_category
    handler_type
    id
    content {
      error_type
      text
    }
  }
`
