import {
  extendVariants,
  Tab as NextTab,
  Tabs as NextTabs,
} from '@nextui-org/react'

export const Tabs = extendVariants(NextTabs, {
  variants: {
    variant: {
      underlined: {
        base: 'border-b border-co-gray-4',
        tabList: 'px-0 pb-0',
        tab: 'px-0 mr-4 pb-2 text-co-gray-1',
        cursor: 'bg-co-purple-1 dark:bg-co-purple-2 w-full h-1',
      },
    },
  },
  defaultVariants: {
    variant: 'underlined',
  },
})

export const Tab = NextTab
