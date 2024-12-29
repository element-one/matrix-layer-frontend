import { ChangeEvent, FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Input, Modal, ModalBody, ModalContent } from '@nextui-org/react'

import { Button } from '@components/Button'
import Selection from '@components/MyAccount/Selection'
import Digits from '@config/country_dial_info.json'
import { ModalType, useModal } from '@contexts/modal'
import { useSaveAddress, useUpdateAddress } from '@services/api'
import { IAddress } from '@type/api'

export interface IFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  province: string
  country: string
  CountryCode: string
  phone: string
}

export interface ShippingAddressModalProps {
  savedFormData: IAddress | null
  isOpen?: boolean
  onClose?: () => void
  onSubmit: () => void
}

const inputStyles = {
  label: 'text-[12px] font-semibold !text-co-text-primary',
  mainWrapper: 'border border-gray-666 rounded-[12px]',
  inputWrapper:
    'bg-black-15 group-data-[focus=true]:bg-black-15 data-[hover=true]:bg-black-15',
  input:
    'font-chakraPetch text-[12px] group-data-[has-value=true]:text-co-text-primary'
}

const DEFAULT_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  province: '',
  country: '',
  CountryCode: 'US',
  phoneNumber: ''
}

export const ShippingAddressModal: FC<ShippingAddressModalProps> = ({
  savedFormData,
  isOpen,
  onClose,
  onSubmit
}) => {
  const { isModalShown, hideModal } = useModal()

  const { mutateAsync: save, isPending: isSavePending } = useSaveAddress()
  const { mutateAsync: update, isPending: isUpdatePending } = useUpdateAddress()

  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)

  useEffect(() => {
    if (savedFormData) {
      const newFormData = {
        firstName: savedFormData.firstName,
        lastName: savedFormData.lastName,
        email: savedFormData.email,
        address: savedFormData.address,
        city: savedFormData.city,
        province: savedFormData.province,
        country: savedFormData.country,
        CountryCode: savedFormData.countryCode,
        phoneNumber: savedFormData.phoneNumber
      }

      setFormData(newFormData)
    }
  }, [savedFormData])

  const handleFormDataChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [key]: e.target.value
      })
    }

  const handleZoneChange = (CountryCode: string) => {
    setFormData({
      ...formData,
      CountryCode
    })
  }

  const handleClose = () => {
    setFormData(DEFAULT_FORM_DATA)
    if (onClose) {
      onClose()
    } else {
      hideModal()
    }
  }

  const handleSubmit = async () => {
    if (!Object.values(formData).every((v) => v)) return

    try {
      const form = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        countryCode: formData.CountryCode,
        isDefault: false,
        areaCode:
          Digits.find((d) => d.code === formData.CountryCode)?.dial_code || ''
      }

      if (savedFormData) {
        await update({ id: savedFormData.id, data: form })
      } else {
        await save(form)
      }
      setFormData(DEFAULT_FORM_DATA)
      onSubmit()
    } catch (e) {
      console.log(e)
      toast.error('Address save failed, please try again later')
    }
  }

  return (
    <Modal
      isOpen={isOpen || isModalShown(ModalType.SHIPPING_ADDRESS_MODAL)}
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
          <div className='flex flex-col gap-5 items-center px-2 pt-10 pb-5 md:py-10 md:px-6 text-co-text-1'>
            <div className='text-xl leading-9 font-chakraPetch'>
              MY DELIVERY ADDRESS
            </div>
            <div className='text-red-255 text-[14px] font-semibold font-chakraPetch'>
              You need to confirm your delivery address for World Phone
            </div>
            <div className='flex flex-col w-full gap-y-6 mb-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
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
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
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
                  countryCode={formData.CountryCode}
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
              isLoading={isSavePending || isUpdatePending}
              disabled={!Object.values(formData).every((v) => v)}
              className='w-full text-[16px] p-[10px] rounded-[35px]'
              onClick={handleSubmit}
            >
              {savedFormData ? 'Update Address' : 'Create New Address'}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
