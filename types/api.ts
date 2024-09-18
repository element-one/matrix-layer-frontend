import { PaymentStatus } from './enums'

export type ApiResponse = {
  statusCode: number
  message?: string
}

export type ApiMessageResponse = {
  message: string
}

export type ApiAuthResponse = ApiResponse & {
  data: {
    isAuthenticated: boolean
  }
}

export type ApiUserResponse = ApiResponse & ApiUser

export type ApiUser = {
  address: string
  availableCommission: string
  createdAt: string
  deletedAt: string | null
  id: string
  isInWhitelist: boolean
  nonce: string | null
  ownedProducts: { wifi: number; aiAgent: number }
  profileImage: string | null
  receiverInfos: unknown[]
  referralCode: string | null
  referredBy: string | null
  totalCommission: string
  updatedAt: string
}

export type ApiWalletLoginParams = {
  address: string
  signature: string
}

export type ApiWalletLoginResponse = ApiResponse & {
  success: boolean
}

export type ApiAuthNonce = {
  nonce: string
}

export type ApiAuthLoginData = {
  address: string
  signature: string
}

export type ApiPaymentData = {
  actualPrice: string
  createdAt: string
  deletedAt: string | null
  expectedPrice: string
  from: `0x${string}`
  id: string
  name: string
  price: string
  quantity: number
  receiverInfo: unknown
  status: PaymentStatus
  transactionHash: string
  type: ProductType
  updatedAt: string
}

export type ApiPayment = {
  total: number
  pageSize: number
  page: number
  data: ApiPaymentData[]
}

export type ApiPaymentResponse = ApiResponse & ApiPayment

export type ProductType = 'wifi' | 'aiAgent'

export type ApiTokenAddressResponse = ApiResponse & {
  address: `0x${string}`
}

export type ApiPaymentAddressResponse = ApiResponse & {
  address: `0x${string}`
}

export type ApiProofResponse = {
  proof: string[]
}
