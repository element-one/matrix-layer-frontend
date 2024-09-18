// MyInput.tsx
import { extendVariants, Input } from '@nextui-org/react'

export const BaseInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        inputWrapper: [
          'bg-co-bg-1',
          'border border-co-border',
          'focus-within:bg-co-bg-1',
          'data-[hover=true]:bg-co-bg-1',
          'data-[hover=true]:bg-co-bg-1',
          'group-data-[focus=true]:bg-co-bg-1'
        ],
        input: ['text-white', 'placeholder:text-co-text-5']
      }
    },
    size: {
      xs: {
        inputWrapper: 'h-unit-6 min-h-unit-6 px-1',
        input: 'text-tiny'
      },
      md: {
        inputWrapper: 'h-unit-10 min-h-unit-10',
        input: 'text-small'
      },
      lg: {
        inputWrapper: 'h-unit-12 min-h-unit-12',
        input: 'text-small'
      },
      xl: {
        inputWrapper: 'h-unit-14 min-h-unit-14',
        input: 'text-medium'
      }
    },
    radius: {
      xs: {
        inputWrapper: 'rounded'
      },
      md: {
        inputWrapper: 'rounded-[8px]'
      },
      sm: {
        inputWrapper: 'rounded-[4px]'
      }
    },
    textSize: {
      base: {
        input: 'text-base'
      },
      xs: {
        input: 'text-sm'
      }
    },
    removeLabel: {
      true: {
        label: 'hidden'
      },
      false: {}
    }
  },
  defaultVariants: {
    color: 'stone',
    textSize: 'xs',
    radius: 'md',
    removeLabel: true
  }
})
