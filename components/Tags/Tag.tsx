import { Chip, extendVariants } from '@nextui-org/react'

export const Tag = extendVariants(Chip, {
  variants: {
    variant: {
      dot: {
        base: `border-co-gray-1 border-1 border-opacity-10 
          dark:border-co-gray-4 dark:border-opacity-100`
      }
    },
    color: {
      green: {
        base: 'bg-co-tag-bg-1 text-co-tag-text-1'
      },
      red: {
        base: 'bg-co-tag-bg-2 text-co-tag-text-2'
      },
      active: {
        dot: 'bg-co-green-1'
      },
      paused: {
        dot: 'bg-co-gray-3 dark:bg-co-gray-4 text-co-gray-3'
      },
      high: {
        base: 'bg-co-tag-bg-4 text-co-tag-text-4'
      },
      medium: {
        base: 'bg-co-tag-bg-5 text-co-tag-text-5'
      },
      low: {
        base: `bg-co-gray-3/10 dark:bg-co-gray-5 text-co-gray-3 
          dark:text-co-gray-2`
      },
      recommended: {
        base: `bg-co-purple-3 dark:bg-[#72708B] text-co-purple-1 
          dark:text-co-purple-4`
      }
    }
  },
  defaultVariants: {
    variant: 'solid',
    color: 'green'
  }
})
