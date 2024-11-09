import cloneDeep from 'lodash/cloneDeep'
import { StateCreator } from 'zustand'

import { Conversation } from '@type/internal/conversation'

type AIExplorerState = {
  allConversations: {
    [address: string]: Conversation[] | undefined
  }
}

type AIExplorerActions = {
  setConversations: (userAddress: string, conversations: Conversation[]) => void
}

export type AIExplorerSlice = AIExplorerState & AIExplorerActions

const initialState: AIExplorerState = {
  allConversations: {}
}

export const createAIExplorerSlice: StateCreator<AIExplorerSlice> = (
  set,
  get
) => ({
  ...initialState,
  setConversations: (userAddress, conversations) => {
    const allConversations = cloneDeep(get().allConversations)

    allConversations[userAddress] = conversations
    set({ allConversations })
  }
})
