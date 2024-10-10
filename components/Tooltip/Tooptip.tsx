import { extendVariants, Tooltip as NextTooltip } from '@nextui-org/react'

export const Tooltip = extendVariants(NextTooltip, {
  variants: {
    color: {
      default: {
        content: 'bg-co-gray-1 dark:bg-co-gray-5 text-white max-w-[400px]',
        base: 'before:bg-co-gray-1 dark:before:bg-co-gray-5'
      }
    }
  },
  defaultVariants: {
    color: 'default',
    radius: 'md',
    showArrow: 'true',
    placement: 'top'
  }
})
