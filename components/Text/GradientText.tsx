import { FC, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import Text from './Text'

interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const GradientText: FC<GradientTextProps> = ({ children, className }) => {
  return (
    <Text
      as='span'
      className={clsx(
        'text-[10px] bg-gradient-title-1 bg-clip-text text-transparent font-semibold',
        className
      )}
    >
      {children}
    </Text>
  )
}

export default GradientText
