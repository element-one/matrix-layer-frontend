import { FC, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface AnimatedBorderContainerProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius: string
  children: ReactNode
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, type: 'spring', duration: 1, bounce: 0 },
        opacity: { delay: 0.5, duration: 0.01 }
      }
    }
  }
}

const AnimatedBorderContainer: FC<AnimatedBorderContainerProps> = ({
  borderRadius,
  children,
  className
}) => {
  return (
    <motion.div className={clsx('relative', className)}>
      <motion.svg
        className={`absolute top-0 left-0 flex flex-row justify-center items-center w-full h-full
          z-10`}
        initial='hidden'
        animate='visible'
      >
        <motion.rect
          className={'w-[95%] h-[95%] stroke-[1px]'}
          x='5'
          y='5'
          rx={borderRadius}
          stroke='#787878'
          variants={draw}
        />
      </motion.svg>
      {children}
    </motion.div>
  )
}

export default AnimatedBorderContainer
