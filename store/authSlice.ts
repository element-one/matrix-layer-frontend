import { StateCreator } from 'zustand'

type AuthState = {
  hasSignSuccess: boolean
}

type AuthActions = {
  setHasSignSuccess: (hasSignSuccess: boolean) => void
}

export type AuthSlice = AuthState & AuthActions

const initialState: AuthState = {
  hasSignSuccess: false
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setHasSignSuccess: (hasSignSuccess) => set({ hasSignSuccess })
})
