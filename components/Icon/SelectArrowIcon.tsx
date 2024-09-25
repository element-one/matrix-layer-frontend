/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const SelectArrowIcon = ({
  width = 24,
  height = 13,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 24 13'
    fill='none'
  >
    <g clipPath='url(#clip0_118_4447)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.2884 10.6569L5.63137 4.99994L7.04537 3.58594L11.9954 8.53594L16.9454 3.58594L18.3594 4.99994L12.7024 10.6569C12.5148 10.8444 12.2605 10.9497 11.9954 10.9497C11.7302 10.9497 11.4759 10.8444 11.2884 10.6569Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_118_4447'>
        <rect
          width='12'
          height='24'
          fill='white'
          transform='translate(24 0.5) rotate(90)'
        />
      </clipPath>
    </defs>
  </svg>
)
