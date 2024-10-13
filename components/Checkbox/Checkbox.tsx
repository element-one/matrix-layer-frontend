import { Checkbox as NextCheckbox, extendVariants } from '@nextui-org/react'

const Checkbox = extendVariants(NextCheckbox, {
  variants: {
    color: {
      primary: {
        wrapper: `after:bg-co-bg-1 group-data-[selected=true]:after:bg-co-primary 
          group-data-[hover=true]:before:bg-co-bg-2 before:border-2 before:border-co-border`,
        icon: 'fill-co-text-2 text-co-text-2 scale-150',
        label: 'text-co-text-1'
      }
    }
  }
})

export default Checkbox
