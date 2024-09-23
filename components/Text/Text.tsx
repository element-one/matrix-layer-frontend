import { forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { tn } from '@utils/tn'

const text = tv(
  {
    base: 'font-chakraPetch text-left leading-none',
    variants: {
      color: {
        primary: 'text-white',
        secondary: 'text-co-gray-2',
        light: 'text-co-gray-3',
        purple: 'text-co-purple-1'
      },
      size: {
        extrabold: 'font-extrabold',
        bold: 'font-bold',
        semibold: 'font-semibold',
        medium: 'font-medium',
        normal: 'font-normal',
        light: 'font-light'
      },
      variant: {
        xl: 'text-xl',
        md: 'text-md',
        sm: 'text-sm',
        h0: 'text-h0',
        h1: 'text-h1',
        h2: 'text-h2',
        h3: 'text-h3',
        h4: 'text-h4',
        b1: 'text-b1',
        b2: 'text-b2',
        b3: 'text-b3',
        ll: 'text-ll',
        ls: 'text-ls',
        none: 'text-none'
      }
    },
    defaultVariants: {
      color: 'primary',
      size: 'medium',
      variant: 'sm'
    }
  },
  { twMerge: true }
)

type TextVariants = VariantProps<typeof text>

interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, 'color'>,
    TextVariants {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div'
  children: React.ReactNode
}

export const Text = forwardRef<
  HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
  TextProps
>(({ color, size, as = 'p', className, ...props }, ref) => {
  const Comp = as

  return (
    <Comp
      className={tn(text({ color, size }), className)}
      ref={ref as LegacyRef<HTMLParagraphElement>}
      {...props}
    >
      {props.children}
    </Comp>
  )
})

Text.displayName = 'Text'
export default Text
