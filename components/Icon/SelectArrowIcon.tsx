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
    <g clipPath='url(#clip0_633_1214)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.2894 10.6569L5.63235 4.99994L7.04635 3.58594L11.9964 8.53594L16.9464 3.58594L18.3604 4.99994L12.7034 10.6569C12.5158 10.8444 12.2615 10.9497 11.9964 10.9497C11.7312 10.9497 11.4769 10.8444 11.2894 10.6569Z'
        fill='black'
      />
    </g>
    <defs>
      <clipPath id='clip0_633_1214'>
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
