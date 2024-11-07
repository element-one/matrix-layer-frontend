import React, { SVGAttributes } from 'react'

export const SendMessageIcon = ({
  width = 18,
  height = 18,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g
      id='SVGRepo_tracerCarrier'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path
        d='M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167'
        stroke='#ffffff'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>{' '}
    </g>
  </svg>
)
