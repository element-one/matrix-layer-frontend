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
  AcceleratePoolModal,
  AcceleratePoolModalProps
} from '@components/Modal/AcceleratePoolModal'
import { BuyNFTModal } from '@components/Modal/BuyNFTModal'
import {
  ManageAddressModal,
  ManageAddressModalProps
} from '@components/Modal/ManageAddressModal'
import { RewardsMLPHistoryModal } from '@components/Modal/RewardsMLPHistoryModal'
import { RewardsModal, RewardsModalProps } from '@components/Modal/RewardsModal'

export enum ModalType {
  CONNECT_WALLET_MODAL = 'CONNECT_WALLET_MODAL',
  PAY_SUCCESS_MODAL = 'PAY_SUCCESS_MODAL',
  REFERRAL_CODE_MODAL = 'REFERRAL_CODE_MODAL',
  SHIPPING_ADDRESS_MODAL = 'SHIPPING_ADDRESS_MODAL',
  MANAGE_ADDRESS_MODAL = 'MANAGE_ADDRESS_MODAL',
  REWARDS_MODAL = 'REWARDS_MODAL',
  ACCELERATE_POOL_MODAL = 'ACCELERATE_POOL_MODAL',
  REWARDS_MLP_HISTORY_MODAL = 'REWARDS_MLP_HISTORY_MODAL',
  BUY_NFT_MODAL = 'BUY_NFT_MODAL'
}

const MODAL_COMPONENTS = {
  [ModalType.CONNECT_WALLET_MODAL]: ConnectWalletModal,
  [ModalType.PAY_SUCCESS_MODAL]: PaySuccessModal,
  [ModalType.REFERRAL_CODE_MODAL]: ReferralCodeModal,
  [ModalType.SHIPPING_ADDRESS_MODAL]: ShippingAddressModal,
  [ModalType.MANAGE_ADDRESS_MODAL]: ManageAddressModal,
  [ModalType.REWARDS_MODAL]: RewardsModal,
  [ModalType.ACCELERATE_POOL_MODAL]: AcceleratePoolModal,
  [ModalType.REWARDS_MLP_HISTORY_MODAL]: RewardsMLPHistoryModal,
  [ModalType.BUY_NFT_MODAL]: BuyNFTModal
}

type ModalProps =
  | ConnectWalletModalProps
  | PaySuccessModalProps
  | ReferralCodeModalProps
  | ShippingAddressModalProps
  | ManageAddressModalProps
  | RewardsModalProps
  | AcceleratePoolModalProps
  | undefined

type ModalStore = { type: ModalType | null; props?: ModalProps }

export interface ModalContextProps {
  store: ModalStore
  isModalShown: (modal: ModalType) => boolean
  showModal: <T extends ModalProps>(modal: ModalType, props?: T) => void
  hideModal: () => void
}

const defaultContext: ModalContextProps = {
  store: { type: null, props: undefined },
  isModalShown: () => false,
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

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        store,
        isModalShown,
        showModal,
        hideModal
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
