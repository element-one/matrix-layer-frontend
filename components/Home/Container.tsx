import { FC, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(clsx('relative', className))} {...props}>
      {children}
    </div>
  )
}

interface ImagesFieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ImagesField: FC<ImagesFieldProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(clsx('images-field absolute inset-0 z-10', className))}
      {...props}
    >
      {children}
    </div>
  )
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Content: FC<ContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx('relative z-20 container mx-auto px-[30px] lg:px-0', className)
      )}
      {...props}
    >
      {children}
    </div>
  )
}
