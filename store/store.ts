import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { mountStoreDevtool } from 'simple-zustand-devtools'

import { AccountSlice, createAccountSlice } from './accountSlice'
import { AIExplorerSlice, createAIExplorerSlice } from './aiExplorer'
import { AppSlice, createAppSlice } from './appSlice'
import { CheckoutSlice, createCheckoutSlice } from './checkoutSlice'

type StoreState = AppSlice & CheckoutSlice & AccountSlice & AIExplorerSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createCheckoutSlice(...a),
      ...createAccountSlice(...a),
      ...createAIExplorerSlice(...a)
    }),
    {
      name: 'matrix-App'
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
