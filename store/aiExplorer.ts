import { StateCreator } from 'zustand'

import { Conversation } from '@type/internal/conversation'

type AIExplorerState = {
  conversations: Conversation[]
}

type AIExplorerActions = {
  setConversations: (conversations: Conversation[]) => void
}

export type AIExplorerSlice = AIExplorerState & AIExplorerActions

const initialState: AIExplorerState = {
  conversations: []
}

export const createAIExplorerSlice: StateCreator<AIExplorerSlice> = (set) => ({
  ...initialState,
  setConversations: (conversations) => set({ conversations })
})
