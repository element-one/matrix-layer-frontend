import { FC, useMemo, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure
} from '@nextui-org/react'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { AddressItemSkeleton } from '@components/Skeleton/AddressItemSkeleton'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { useDeleteAddress, useGetAllAddresses } from '@services/api'
import { useStore } from '@store/store'
import { IAddress } from '@type/api'

import { ShippingAddressModal } from './ShippingAddressModal'

export interface IFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  province: string
  country: string
  zone: string
  phone: string
}

export interface ManageAddressModalProps {
  type?: 'management' | 'shipping'
  onClose?: () => void
  onConfirm?: (addressId: string) => void
}

export const ManageAddressModal: FC<ManageAddressModalProps> = ({
  type = 'management',
  onClose,
  onConfirm
}) => {
  const { isActiveLoading } = useStore((state) => ({
    isActiveLoading: state.confirmLoading
  }))

  const { isModalShown, hideModal } = useModal()
  const {
    data: myAddresses,
    refetch,
    isLoading,
    isRefetching
  } = useGetAllAddresses()
  const [selectedAddress, setSelectedAddress] = useState('')
  const { isOpen, onOpen, onClose: onCloseCreateAddressModal } = useDisclosure()
  const [editFromData, setEditFormData] = useState<IAddress | null>(null)
  const { mutateAsync: deleteAddress } = useDeleteAddress()

  const addressesLoading = useMemo(
    () => isLoading || isRefetching,
    [isLoading, isRefetching]
  )

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  const handleChangeAddress = (id: string) => () => {
    if (id === selectedAddress) return
    setSelectedAddress(id)
  }

  const handleOpenCreateAddressModal = () => {
    onOpen()
  }

  const handleCreateNewAddress = () => {
    onCloseCreateAddressModal()
    refetch()
  }

  const handleEditAddress = (formData: IAddress) => () => {
    setEditFormData(formData)
    handleOpenCreateAddressModal()
  }

  const handleDeleteAddress = (id: string) => async () => {
    await deleteAddress({ id })
    refetch()
  }

  const handleConfirm = () => {
    if (!selectedAddress) return
    onConfirm && onConfirm(selectedAddress)
  }

  const handleCloseCreateAddressModal = () => {
    setEditFormData(null)
    onCloseCreateAddressModal()
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.MANAGE_ADDRESS_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size='xl'
      placement='center'
      scrollBehavior={'outside'}
      classNames={{
        closeButton:
          'top-4 right-4 md:right-12 md:top-12 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody>
          <div className='flex flex-col gap-5 px-2 pt-10 pb-5 md:py-10 md:px-6 text-co-text-1'>
            <div className='text-xl leading-9 font-chakraPetch text-center'>
              {type === 'management' ? 'ADDRESS MANAGEMENT' : 'SELECT ADDRESS'}
            </div>
            <Button
              className='self-start px-5 py-2 text-[16px]'
              onClick={handleOpenCreateAddressModal}
            >
              Add Address
            </Button>
            <div className='flex flex-col gap-3 max-h-[800px] overflow-y-auto'>
              {addressesLoading &&
                Array(2)
                  .fill('')
                  .map((_, index) => <AddressItemSkeleton key={index} />)}
              {!addressesLoading &&
                myAddresses?.map((address) => (
                  <div
                    key={address.id}
                    className={clsx(
                      `w-full flex flex-col gap-y-1.5 box-border transition cursor-pointer p-4`,
                      address.id === selectedAddress
                        ? 'border-address-item-active-gradient'
                        : 'border-address-item-gradient'
                    )}
                    onClick={handleChangeAddress(address.id)}
                  >
                    <div className='flex flex-row justify-between items-center'>
                      <Text className='text-[14px] md:text-[18px] font-bold text-co-text-primary leading-[1.5]'>
                        {address.firstName} {address.lastName}
                      </Text>
                      <Text className='text-[14px] md:text-[18px] font-bold text-co-text-primary'>
                        {address.areaCode} {address.phoneNumber}
                      </Text>
                    </div>
                    <Text className='text-[12px] md:text-[16px] font-bold text-co-text-primary'>
                      {address.address},&nbsp;{address.city},&nbsp;
                      {address.country},&nbsp;
                      {address.province}
                    </Text>
                    <div className='flex flex-row justify-end items-center gap-x-2'>
                      <Button
                        className='text-[14px] py-1'
                        onClick={handleEditAddress(address)}
                      >
                        Edit
                      </Button>
                      <Button
                        className='text-[14px] py-1'
                        onClick={handleDeleteAddress(address.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            {type === 'shipping' && (
              <Button
                isLoading={isActiveLoading}
                disabled={!selectedAddress}
                className='w-full text-[16px] p-[10px] rounded-[35px]'
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            )}
          </div>
        </ModalBody>
      </ModalContent>
      <ShippingAddressModal
        savedFormData={editFromData}
        isOpen={isOpen}
        onSubmit={handleCreateNewAddress}
        onClose={handleCloseCreateAddressModal}
      />
    </Modal>
  )
}
