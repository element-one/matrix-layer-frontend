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
  totalCommission: string
  updatedAt: string
  referredByUserAddress?: string
  referrerReferralCode?: string
  totalRewards: string
  availableRewards: string
  mlpTokenAmountPoolA: string
  mlpTokenAmountPoolB1: string
  mlpTokenAmountPoolB2: string
  mlpTokenAmountPoolC: string
  mlpTokenAmountPoolPhone: string
  stakingNoncePoolA: number
  stakingNoncePoolB1: number
  stakingNoncePoolB2: number
  stakingNoncePoolC: number
  stakingNoncePoolPhone: number
  merchantAddress: string | null
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
  id: string
  name: string
  price: string
  quantity: number
  receiverInfo: unknown
  status: PaymentStatus
  transactionHash: string
  type: ProductType
  updatedAt: string
  shippingAddress: IAddress
}

export type ApiPayment = {
  total: number
  pageSize: number
  page: number
  data: ApiPaymentData[]
}

export type ApiPaymentResponse = ApiPayment

export type ProductType = 'phone' | 'agent_one' | 'agent_pro' | 'agent_ultra'

export type ApiTokenAddressResponse = ApiResponse & {
  address: `0x${string}`
}

export type ApiPaymentAddressResponse = ApiResponse & {
  address: `0x${string}`
}

export type ApiProofResponse = {
  proof: string[]
}

export type ApiProduct = {
  name: string
  price: number
  type: string
}
export type ApiProducts = {
  data: ApiProduct[]
}

export type ApiProductsResponse = ApiProduct[]

export type ApiSaveAddressParams = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  province: string
  country: string
  phoneNumber: string
  countryCode: string
  areaCode: string
  isDefault: boolean
}

export type ApiSaveAddressResponse = ApiSaveAddressParams & {
  id: string
  user: { address: string }
}

export type IAddress = {
  id: string
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  province: string
  country: string
  phoneNumber: string
  countryCode: string
  areaCode: string
  isDefault: boolean
  createdAt: string
  deletedAt: string
  updatedAt: string
}

export type ApiGetAddressResponse = IAddress[]

export type ApiHoldingsResponse = Partial<{
  totalRewards: number | string
  availableRewards: number | string
  mlpTokenAmount: number | string
  phone: number | string
  agent_limit: number | string
  agent_one: number | string
  agent_pro: number | string
  agent_ultra: number | string
}>

export type ApiErrorResponse = {
  error: string
  message: string[]
  statusCode: number
}

export type ApiGetSignatureResponse = {
  signature: string
  payload: {
    isWhitelisted: boolean
    directPercentage: number
    directReferral: string
    levelPercentages: number[]
    levelReferrals: string[]
    totalAmount: number
  }
}

export type ApiConfirmDeliveryResponse = {
  createdAt: string
  deletedAt: string
  id: string
  name: string
  price: string
  quantity: number
  status: string
  totalPrice: string
  transactionHash: string
  type: string
  updatedAt: string
}

export type RewardHistoryItem = {
  claimedAmount: string
  tokenAmount: string
  createdAt: string
  deletedAt: string
  id: string
  status: string
  updatedAt: string
  address: string
}

export type ApiRewardHistoryResponse = {
  total: number
  pageSize: number
  page: number
  data: RewardHistoryItem[]
}

export type ApiInWhitelistResponse = {
  isWhitelisted: boolean
}

export type ApiGetAllClaimSignatureResponse = {
  amounts: string[]
  signatures: string[]
}
