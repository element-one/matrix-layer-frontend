import { FC, ReactNode } from 'react'

interface ScrollAreaProps {
  children: ReactNode
}
const ScrollArea: FC<ScrollAreaProps> = ({ children }) => {
  return <div className='w-full h-full'>{children}</div>
}

export default ScrollArea
