import { FC } from 'react'
import { Avatar, Select, SelectedItems, SelectItem } from '@nextui-org/react'

import { SelectArrowIcon } from '@components/Icon/SelectArrowIcon'
import { Text } from '@components/Text'

export type SelectionItemProps = {
  id: string
  name: string
  icon: string
}

export interface SelectionProps {
  disabledValues?: string[]
  selectionItems: SelectionItemProps[]
}

const Selection: FC<SelectionProps> = ({
  selectionItems,
  disabledValues = []
}) => {
  return (
    <Select
      aria-label={'payment'}
      disabledKeys={disabledValues}
      defaultSelectedKeys={[selectionItems[0]?.id]}
      items={selectionItems}
      selectorIcon={<SelectArrowIcon className='!w-[24px] !h-[13px]' />}
      classNames={{
        trigger:
          'px-[24px] py-[16px] min-h-[20px] h-fit rounded-[16px] bg-black-28 data-[hover=true]:bg-black-28',
        innerWrapper: 'min-h-[20px] h-fit'
      }}
      renderValue={(items: SelectedItems<SelectionItemProps>) => {
        return items.map((item) => (
          <div key={item.key} className='flex items-center gap-x-[8px]'>
            <Avatar
              alt={item.data?.name}
              className='flex-shrink-0 w-[24px] h-[24px]'
              src={item.data?.icon}
            />
            <Text className='text-white font-bold text-[20px]'>
              {item.data?.name}
            </Text>
          </div>
        ))
      }}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name} aria-label={item.name}>
          <div className='flex gap-2 items-center'>
            <Avatar
              alt={item.name}
              className='flex-shrink-0 w-[20px] h-[20px]'
              src={item.icon}
            />
            <Text className='text-black text-[14px]'>{item.name}</Text>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}

export default Selection
