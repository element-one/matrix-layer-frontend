import { FC } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import {
  Textarea as NextTextarea,
  TextAreaProps as NextTextAreaProps,
  Tooltip
} from '@nextui-org/react'

export interface TextareaProps extends NextTextAreaProps {
  info?: string
  wrapperClassName?: string
}

export const Textarea: FC<TextareaProps> = ({ label, placeholder, isRequired, className, info, wrapperClassName }) => {
  return <div className={wrapperClassName}>
    <label className='text-co-text-1 text-[18px] font-semibold flex items-center gap-2'>
      {label}
      {isRequired
        ? <span className='text-red-600'>*</span>
        : <span className='text-co-text-2 text-[16px] font-normal'>(optional)</span>}
      {info && <Tooltip content={info} classNames={{ content: 'text-co-text-2 bg-co-bg-1' }}>
        <InformationCircleIcon className='text-co-text-2 w-5 h-5' />
      </Tooltip>}
    </label>
    <NextTextarea
      isRequired={isRequired}
      className={`border border-co-border rounded-lg focus:ring-co-primary hover:bg-transparent
        mt-2 ${className}`}
      placeholder={placeholder}
      classNames={{
        inputWrapper: `bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent 
          ring-1 ring-inset ring-1 ring-co-border group-data-[focus=true]:ring-co-primary p-0
          group-data-[focus=true]:bg-transparent rounded-lg`,
        input: `group-data-[has-value=true]:text-co-text-2 text-[16px] py-[22px] pl-[20px] pr-[30px] resize-y`
      }}
    ></NextTextarea>
  </div>
}