/* eslint-disable max-len */
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@nextui-org/react'

export interface InputProps {
  id: string
  type: 'email' | 'password' | 'text'
  label?: string
  value: string
  onChange: (value: string) => void
  onBlur?: (value: string) => void
  required?: boolean
  cornerContent?: JSX.Element
  info?: string | React.ReactNode
  placeholder?: string
  wrapperClassName?: string
  errorMessage?: string
  labelClassName?: string
  inputClassName?: string
  optional?: boolean
  inputEndContent?: JSX.Element
  isDisabled?: boolean
}

export const Input = ({
  id,
  type,
  label,
  value,
  onChange,
  onBlur,
  required = false,
  cornerContent,
  placeholder,
  info,
  wrapperClassName,
  errorMessage,
  labelClassName,
  inputClassName,
  optional,
  isDisabled = false
}: InputProps) => {
  const defaultBlurHandler = () => {}
  const handleBlur = onBlur || defaultBlurHandler

  return (
    <div className={wrapperClassName}>
      <div className='flex items-center justify-between'>
        <label
          htmlFor={id}
          className={`text-[18px] font-medium leading-6 text-co-text-1 flex items-center gap-2
            ${labelClassName}`}
        >
          {label}
          {optional && <span className='text-co-text-2'>(optional)</span>}
          {required && <span className='text-co-text-error'>*</span>}
          {info && (
            <Tooltip
              content={info}
              classNames={{ content: 'text-co-text-2 bg-co-bg-1' }}
            >
              <InformationCircleIcon className='text-co-text-2 w-5 h-5' />
            </Tooltip>
          )}
        </label>
        <div>{cornerContent}</div>
      </div>
      <div className='mt-2'>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type === 'password' ? 'current-password' : 'email'}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => handleBlur(e.target.value)}
          className={`block w-full rounded-lg border border-co-border bg-co-bg-1 py-1.5 outline-none
            ring-1 ring-inset ring-co-border text-co-text-1 shadow-sm
            placeholder:text-co-text-2 sm:text-sm sm:leading-10 px-4 h-[48px]
            ${inputClassName} ${
              isDisabled
                ? 'cursor-not-allowed text-opacity-30'
                : 'focus:ring-co-primary focus:ring-1 focus:ring-inset'
            }`}
          disabled={isDisabled}
        />
        {errorMessage && (
          <span className='text-co-text-error'>{errorMessage}</span>
        )}
      </div>
    </div>
  )
}
