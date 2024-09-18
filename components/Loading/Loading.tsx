import { FC } from 'react'
import { CircularProgress } from '@nextui-org/react'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Loading: FC<LoadingProps> = ({
  size = 'lg',
  className
}) => {
  return <div className={`flex flex-col gap-4 items-center justify-center ${className ?? ''}`}>
    <span>Loading</span>
    <CircularProgress size={size} />
  </div>
}

export default Loading
