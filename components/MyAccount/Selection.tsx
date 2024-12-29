import { ChangeEvent, FC } from 'react'
import { Select, SelectedItems, SelectItem } from '@nextui-org/react'

import { SelectArrowIcon } from '@components/Icon/SelectArrowIcon'
import { Text } from '@components/Text'

export type SelectionItemProps = {
  code: string
  name: string
  flag: string
  dial_code: string
}

export interface SelectionProps {
  countryCode: string
  onChange: (countryCode: string) => void
  disabledValues?: string[]
  selectionItems: SelectionItemProps[]
}

const Selection: FC<SelectionProps> = ({
  selectionItems,
  disabledValues = [],
  countryCode,
  onChange
}) => {
  const handleDigitsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }
  return (
    <Select
      aria-label={'payment'}
      disabledKeys={disabledValues}
      items={selectionItems}
      selectorIcon={<SelectArrowIcon className='!w-[24px] !h-[13px]' />}
      selectedKeys={[countryCode]}
      onChange={handleDigitsChange}
      classNames={{
        base: 'w-[150px]',
        trigger:
          'h-[50px] h-fit rounded-[12px] bg-black-15 data-[hover=true]:bg-black-15 border border-gray-666 rounded-[12px]',
        innerWrapper: 'min-h-[20px] h-fit'
      }}
      renderValue={(items: SelectedItems<SelectionItemProps>) => {
        return items.map((item) => (
          <div key={item.key} className='flex items-center gap-x-[8px]'>
            <Text className='text-[20px]'>{item.data?.flag}</Text>
            <Text className='text-co-text-primary text-[12px]'>
              {item.data?.dial_code}
            </Text>
          </div>
        ))
      }}
    >
      {(item) => (
        <SelectItem
          key={item.code}
          textValue={item.name}
          aria-label={item.name}
        >
          <div className='flex gap-2 items-center'>
            <Text className='text-[20px]'>{item.flag}</Text>
            <Text className='text-black text-[12px]'>{item.dial_code}</Text>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}

export default Selection
