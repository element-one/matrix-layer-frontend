import { StateCreator } from 'zustand'

import type { IProduct } from '@components/Checkout/ProductItem'

type CheckoutState = {
  currentProduct?: IProduct
}

type CheckoutActions = {
  setCurrentProduct: (product: IProduct | undefined) => void
}

export type CheckoutSlice = CheckoutState & CheckoutActions

const initialState: CheckoutState = {
  currentProduct: undefined
}

export const createCheckoutSlice: StateCreator<CheckoutSlice> = (set) => ({
  ...initialState,
  setCurrentProduct: (product) => set({ currentProduct: product })
})
