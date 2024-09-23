import { Button as NextButton, extendVariants } from '@nextui-org/react'

const Button = extendVariants(NextButton, {
  variants: {
    color: {
      primary: `bg-gradient-button-1 text-black disabled:opacity-80 focus:bg-gradient-to-r
         disabled:cursor-not-allowed`,
      default: `text-co-button-default-text bg-co-button-default-bg 
        hover:bg-co-gray-4 disabled:bg-co-gray-4 border-1 border-co-gray-4`,
      ghost: `text-co-button-ghost-text bg-transparent 
        border-co-button-ghost-border`,
      alert: 'text-co-button-primary-text bg-co-alert',
      dark: 'bg-co-button-dark-bg text-co-button-dark-text',
      light: 'bg-co-button-light-bg text-co-button-light-text'
    },
    size: {
      sm: `px-unit-4 py-unit-2 min-w-unit-20 text-sm font-normal 
        gap-unit-2 rounded-[8px]`,
      md: `px-unit-4 py-unit-2 min-w-unit-20 text-md font-semibold 
        gap-unit-2 rounded-[8px]`
    },
    radius: {
      full: 'rounded-[100px]'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm',
    radius: 'full'
  }
})

Button.displayName = 'Button'
export default Button
