import { StateCreator } from 'zustand'

import type { Product } from '@components/Checkout/ProductItem'

type CheckoutState = {
  currentProduct?: Product
}

type CheckoutActions = {
  setCurrentProduct: (product: Product | undefined) => void
}

export type CheckoutSlice = CheckoutState & CheckoutActions

const initialState: CheckoutState = {
  currentProduct: undefined
}

export const createCheckoutSlice: StateCreator<CheckoutSlice> = (set) => ({
  ...initialState,
  setCurrentProduct: (product) => set({ currentProduct: product })
})
