import { ChangeEvent, FC, useState } from 'react'
import { Input, Modal, ModalBody, ModalContent } from '@nextui-org/react'

import { Button } from '@components/Button'
import Selection from '@components/MyAccount/Selection'
import Digits from '@config/country_dial_info.json'
import { ModalType, useModal } from '@contexts/modal'
import { ApiSaveAddressParams } from '@type/api'

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

export interface ShippingAddressModalProps {
  onClose?: () => void
  onSubmit: (formData: ApiSaveAddressParams) => void
}

const inputStyles = {
  label: 'text-[12px] font-semibold !text-white',
  mainWrapper: 'border border-gray-666 rounded-[12px]',
  inputWrapper:
    'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
  input: 'font-chakraPetch text-[12px] group-data-[has-value=true]:text-white'
}

export const ShippingAddressModal: FC<ShippingAddressModalProps> = ({
  onClose,
  onSubmit
}) => {
  const { isModalShown, hideModal } = useModal()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    province: '',
    country: '',
    zone: 'US',
    phoneNumber: ''
  })

  const handleFormDataChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [key]: e.target.value
      })
    }

  const handleZoneChange = (zone: string) => {
    setFormData({
      ...formData,
      zone
    })
  }

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  const handleSubmit = () => {
    if (!Object.values(formData).every((v) => v)) return

    onSubmit({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      country: formData.country,
      phoneNumber: `${Digits.find((d) => d.code === formData.zone)?.dial_code || ''} ${formData.phoneNumber}`,
      isDefault: true
    })
  }

  return (
    <Modal
      isOpen={isModalShown(ModalType.SHIPPING_ADDRESS_MODAL)}
      onClose={handleClose}
      isDismissable={false}
      size='xl'
      placement='center'
      classNames={{
        closeButton:
          'right-12 top-12 text-co-text-1 text-lg hover:bg-co-bg-3 bg-co-bg-1 active:bg-co-bg-3'
      }}
    >
      <ModalContent className='bg-black-15 border border-co-border-gray backdrop-blur-[10px]'>
        <ModalBody>
          <div className='flex flex-col gap-5 items-center py-10 px-6 text-co-text-1'>
            <div className='text-xl leading-9 font-chakraPetch'>
              MY DELIVERY ADDRESS
            </div>
            <div className='text-red-255 text-[14px] font-semibold font-chakraPetch'>
              You need to confirm your delivery address for World Phone
            </div>
            <div className='flex flex-col w-full gap-y-6 mb-8'>
              <div className='grid grid-cols-2 gap-4 w-full'>
                <Input
                  label='First Name'
                  labelPlacement={'outside'}
                  placeholder='First Name'
                  classNames={inputStyles}
                  value={formData.firstName}
                  onChange={handleFormDataChange('firstName')}
                />
                <Input
                  label='Last Name'
                  labelPlacement={'outside'}
                  placeholder='last name'
                  classNames={inputStyles}
                  value={formData.lastName}
                  onChange={handleFormDataChange('lastName')}
                />
              </div>
              <Input
                label='Email Address'
                labelPlacement={'outside'}
                placeholder='email address'
                classNames={inputStyles}
                value={formData.email}
                onChange={handleFormDataChange('email')}
              />
              <Input
                label='Address'
                labelPlacement={'outside'}
                placeholder='address'
                classNames={inputStyles}
                value={formData.address}
                onChange={handleFormDataChange('address')}
              />
              <div className='grid grid-cols-2 gap-4 w-full'>
                <Input
                  label='City'
                  labelPlacement={'outside'}
                  placeholder='city'
                  classNames={inputStyles}
                  value={formData.city}
                  onChange={handleFormDataChange('city')}
                />
                <Input
                  label='Province'
                  labelPlacement={'outside'}
                  placeholder='province'
                  classNames={inputStyles}
                  value={formData.province}
                  onChange={handleFormDataChange('province')}
                />
              </div>
              <Input
                label='Country'
                labelPlacement={'outside'}
                placeholder='country'
                classNames={inputStyles}
                value={formData.country}
                onChange={handleFormDataChange('country')}
              />
              <div className='flex flex-row gap-4 w-full'>
                <Selection
                  selectionItems={Digits}
                  countryCode={formData.zone}
                  onChange={handleZoneChange}
                />
                <Input
                  labelPlacement={'outside'}
                  placeholder='Phone'
                  classNames={inputStyles}
                  value={formData.phoneNumber}
                  onChange={handleFormDataChange('phoneNumber')}
                />
              </div>
            </div>
            <Button
              disabled={!Object.values(formData).every((v) => v)}
              className='w-full text-[16px] p-[10px] rounded-[35px]'
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
