import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeExtended = extendTailwindMerge({})

export function tn(...args: ClassValue[]) {
  return twMergeExtended(clsx(args))
}
