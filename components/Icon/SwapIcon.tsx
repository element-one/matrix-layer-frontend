/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const SwapIcon = ({
  width,
  height,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    viewBox='0 0 24 24'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    fill='none'
  >
    <g clipPath='url(#clip0_17_24417)'>
      <path
        d='M7.5 15H19.5C19.6989 15 19.8897 14.921 20.0303 14.7803C20.171 14.6397 20.25 14.4489 20.25 14.25V4.5C20.25 4.30109 20.171 4.11032 20.0303 3.96967C19.8897 3.82902 19.6989 3.75 19.5 3.75H9C8.80109 3.75 8.61032 3.82902 8.46967 3.96967C8.32902 4.11032 8.25 4.30109 8.25 4.5V5.25'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.75 12.75L7.5 15L9.75 17.25'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.5 9H4.5C4.30109 9 4.11032 9.07902 3.96967 9.21967C3.82902 9.36032 3.75 9.55109 3.75 9.75V19.5C3.75 19.6989 3.82902 19.8897 3.96967 20.0303C4.11032 20.171 4.30109 20.25 4.5 20.25H15C15.1989 20.25 15.3897 20.171 15.5303 20.0303C15.671 19.8897 15.75 19.6989 15.75 19.5V18.75'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.25 11.25L16.5 9L14.25 6.75'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_17_24417'>
        <rect width='24' height='24' fill='none' />
      </clipPath>
    </defs>
  </svg>
)
