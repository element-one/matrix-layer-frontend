import { StateCreator } from 'zustand'

import { ApiHoldingsResponse } from '@type/api'

type AccountState = {
  confirmLoading: boolean
  holdings: ApiHoldingsResponse
}

type AccountActions = {
  setHoldings: (holdings: ApiHoldingsResponse) => void
  setConfirmLoading: (loading: boolean) => void
}

export type AccountSlice = AccountState & AccountActions

const initialState: AccountState = {
  holdings: {},
  confirmLoading: false
}

export const createAccountSlice: StateCreator<AccountSlice> = (set) => ({
  ...initialState,
  setHoldings: (holdings) => set({ holdings }),
  setConfirmLoading: (confirmLoading) => set({ confirmLoading })
})
