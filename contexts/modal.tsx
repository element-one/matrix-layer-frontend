import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

import {
  ConnectWalletModal,
  ConnectWalletModalProps,
  PaySuccessModal,
  PaySuccessModalProps,
  ReferralCodeModal,
  ReferralCodeModalProps,
  ShippingAddressModal,
  ShippingAddressModalProps
} from '@components/Modal'
import {
  AccelerateNFTPoolModal,
  AccelerateNFTPoolModalProps
} from '@components/Modal/AccelerateNFTPoolModal'
import {
  AcceleratePoolModal,
  AcceleratePoolModalProps
} from '@components/Modal/AcceleratePoolModal'
import { BuyNFTModal } from '@components/Modal/BuyNFTModal'
import {
  ManageAddressModal,
  ManageAddressModalProps
} from '@components/Modal/ManageAddressModal'
import {
  RewardsClaimHistoryModal,
  RewardsClaimHistoryModalProps
} from '@components/Modal/RewardsClaimHistoryModal'
import { RewardsMLPHistoryModal } from '@components/Modal/RewardsMLPHistoryModal'
import { RewardsModal, RewardsModalProps } from '@components/Modal/RewardsModal'
import {
  RewardsPoolBHistoryModal,
  RewardsPoolBHistoryModalProps
} from '@components/Modal/RewardsPoolBHistoryModal'
import {
  WithdrawDetailModal,
  WithdrawDetailModalProps
} from '@components/Modal/WithdrawDetailModal'
import { WithdrawModal } from '@components/Modal/WithdrawModal'

export enum ModalType {
  CONNECT_WALLET_MODAL = 'CONNECT_WALLET_MODAL',
  PAY_SUCCESS_MODAL = 'PAY_SUCCESS_MODAL',
  REFERRAL_CODE_MODAL = 'REFERRAL_CODE_MODAL',
  SHIPPING_ADDRESS_MODAL = 'SHIPPING_ADDRESS_MODAL',
  MANAGE_ADDRESS_MODAL = 'MANAGE_ADDRESS_MODAL',
  REWARDS_MODAL = 'REWARDS_MODAL',
  ACCELERATE_POOL_MODAL = 'ACCELERATE_POOL_MODAL',
  REWARDS_MLP_HISTORY_MODAL = 'REWARDS_MLP_HISTORY_MODAL',
  REWARDS_POOL_B_HISTORY_MODAL = 'REWARDS_POOL_B_HISTORY_MODAL',
  REWARDS_CLAIM_HISTORY_MODAL = 'REWARDS_CLAIM_HISTORY_MODAL',
  BUY_NFT_MODAL = 'BUY_NFT_MODAL',
  ACCELERATE_NFT_POOL_MODAL = 'ACCELERATE_NFT_POOL_MODAL',
  WITHDRAW_MODAL = 'WITHDRAW_MODAL',
  WITHDRAW_DETAIL_MODAL = 'WITHDRAW_DETAIL_MODAL'
}

const MODAL_COMPONENTS = {
  [ModalType.CONNECT_WALLET_MODAL]: ConnectWalletModal,
  [ModalType.PAY_SUCCESS_MODAL]: PaySuccessModal,
  [ModalType.REFERRAL_CODE_MODAL]: ReferralCodeModal,
  [ModalType.SHIPPING_ADDRESS_MODAL]: ShippingAddressModal,
  [ModalType.MANAGE_ADDRESS_MODAL]: ManageAddressModal,
  [ModalType.REWARDS_MODAL]: RewardsModal,
  [ModalType.ACCELERATE_POOL_MODAL]: AcceleratePoolModal,
  [ModalType.ACCELERATE_NFT_POOL_MODAL]: AccelerateNFTPoolModal,
  [ModalType.REWARDS_MLP_HISTORY_MODAL]: RewardsMLPHistoryModal,
  [ModalType.REWARDS_POOL_B_HISTORY_MODAL]: RewardsPoolBHistoryModal,
  [ModalType.BUY_NFT_MODAL]: BuyNFTModal,
  [ModalType.WITHDRAW_MODAL]: WithdrawModal,
  [ModalType.WITHDRAW_DETAIL_MODAL]: WithdrawDetailModal,
  [ModalType.REWARDS_CLAIM_HISTORY_MODAL]: RewardsClaimHistoryModal
}

type ModalProps =
  | ConnectWalletModalProps
  | PaySuccessModalProps
  | ReferralCodeModalProps
  | ShippingAddressModalProps
  | ManageAddressModalProps
  | RewardsModalProps
  | AcceleratePoolModalProps
  | AccelerateNFTPoolModalProps
  | WithdrawDetailModalProps
  | RewardsPoolBHistoryModalProps
  | RewardsClaimHistoryModalProps
  | undefined

type ModalStore = { type: ModalType | null; props?: ModalProps }

export interface ModalContextProps {
  store: ModalStore
  isModalShown: (modal: ModalType) => boolean
  isConfirmLoading: Record<ModalType, boolean> | null
  setIsConfirmLoading: (modal: ModalType, isLoading: boolean) => void
  showModal: <T extends ModalProps>(modal: ModalType, props?: T) => void
  hideModal: () => void
}

const defaultContext: ModalContextProps = {
  store: { type: null, props: undefined },
  isModalShown: () => false,
  isConfirmLoading: null,
  setIsConfirmLoading: () => null,
  showModal: () => null,
  hideModal: () => null
}

export const ModalContext = createContext<ModalContextProps>(defaultContext)

export const ModalProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {
  const [store, setStore] = useState<ModalStore>(defaultContext.store)

  const isModalShown = useCallback(
    (modal: ModalType) => {
      return modal === store.type
    },
    [store]
  )

  const showModal = useCallback(
    <T extends ModalProps>(type: ModalType, props?: T) => {
      setStore({ ...store, type, props })
    },
    [store]
  )

  const hideModal = useCallback(
    () => setStore({ type: null, props: undefined }),
    []
  )

  const renderComponent = () => {
    if (!store.type) {
      return null
    }

    const ModalComponent = MODAL_COMPONENTS[store.type]
    return <ModalComponent {...(store.props as any)} onClose={hideModal} /> // eslint-disable-line
  }

  const [isConfirmLoading, setIsConfirmLoadingOriginal] = useState<Record<
    ModalType,
    boolean
  > | null>(null)

  const setIsConfirmLoading = useCallback(
    (type: ModalType, loading: boolean) => {
      setIsConfirmLoadingOriginal((prev) => {
        if (prev?.[type] === loading) {
          return prev
        }

        return {
          ...((prev ?? {}) as Record<ModalType, boolean>),
          [type]: loading
        }
      })
    },
    []
  )

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        store,
        isModalShown,
        showModal,
        hideModal,
        isConfirmLoading,
        setIsConfirmLoading
      }}
    >
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
