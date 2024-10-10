import { FC, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import Text from './Text'

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Title: FC<TitleProps> = ({ children, className }) => {
  return (
    <Text
      className={clsx(
        `text-[32px] bg-gradient-title-2 md:bg-gradient-title-1 bg-clip-text
          text-transparent font-semibold`,
        className
      )}
    >
      {children}
    </Text>
  )
}

export default Title
