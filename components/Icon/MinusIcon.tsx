/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const MinusIcon = ({
  width = 30,
  height = 30,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 30 30'
    fill='none'
  >
    <path
      d='M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z'
      stroke='#CFCFD1'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M10 15H20'
      stroke='#CFCFD1'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
