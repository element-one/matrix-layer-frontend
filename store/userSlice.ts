import { StateCreator } from 'zustand'

type UserState = {}

type UserActions = {}

export type UserSlice = UserState & UserActions

const initialState: UserState = {
  user: undefined,
  userMedals: [],
  userBenefits: [],
  selectedUserMedal: undefined
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  ...initialState
})
