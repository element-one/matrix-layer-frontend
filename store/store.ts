import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { mountStoreDevtool } from 'simple-zustand-devtools'

import { AccountSlice, createAccountSlice } from './accountSlice'
import { AppSlice, createAppSlice } from './appSlice'
import { AuthSlice, createAuthSlice } from './authSlice'
import { CheckoutSlice, createCheckoutSlice } from './checkoutSlice'
import { createUserSlice, UserSlice } from './userSlice'

type StoreState = AppSlice &
  UserSlice &
  AuthSlice &
  CheckoutSlice &
  AccountSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createUserSlice(...a),
      ...createAuthSlice(...a),
      ...createCheckoutSlice(...a),
      ...createAccountSlice(...a)
    }),
    {
      name: 'matrix-App'
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
