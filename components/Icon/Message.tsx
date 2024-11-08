import React, { SVGAttributes } from 'react'

export const MessageIcon = ({
  width = 16,
  height = 16,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='#ffffff'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g
      id='SVGRepo_tracerCarrier'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path
        d='M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z'
        stroke='#ffffff'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>{' '}
    </g>
  </svg>
)
