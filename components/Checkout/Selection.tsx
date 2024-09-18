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
  title: string
  disabledValues?: string[]
  selectionItems: SelectionItemProps[]
}

const Selection: FC<SelectionProps> = ({
  title,
  selectionItems,
  disabledValues = []
}) => {
  return (
    <div className='w-full mt-1'>
      <Text className='mb-[8px] text-xs md:text-[14px] font-normal md:font-bold'>{title}</Text>
      <Select
        aria-label={title}
        disabledKeys={disabledValues}
        defaultSelectedKeys={[selectionItems[0]?.id]}
        items={selectionItems}
        selectorIcon={<SelectArrowIcon className='w-[24[px] h-[13px]' />}
        classNames={{
          trigger: 'px-[20px] py-[8px] min-h-[20px] h-fit rounded-[22px]',
          innerWrapper: 'min-h-[20px] h-fit'
        }}
        renderValue={(items: SelectedItems<SelectionItemProps>) => {
          return items.map((item) => (
            <div key={item.key} className='flex items-center gap-x-[20px]'>
              <Avatar
                alt={item.data?.name}
                className='flex-shrink-0 w-[20px] h-[20px]'
                src={item.data?.icon}
              />
              <Text className='text-black text-[14px]'>{item.data?.name}</Text>
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
    </div>
  )
}

export default Selection
