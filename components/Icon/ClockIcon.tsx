/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const ClockIcon = ({
  width,
  height,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    viewBox='0 0 25 24'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    fill='none'
  >
    <g clipPath='url(#clip0_17_24527)'>
      <path
        d='M12.25 7.5V12L16 14.25'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.5 9.75H21.25V6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.913 18.0001C16.7336 19.113 15.2525 19.8536 13.6546 20.1295C12.0568 20.4054 10.413 20.2043 8.92881 19.5513C7.44459 18.8983 6.18569 17.8225 5.30942 16.4581C4.43314 15.0938 3.97834 13.5015 4.00184 11.8802C4.02535 10.2588 4.52612 8.68038 5.44157 7.34202C6.35703 6.00366 7.64659 4.96475 9.14912 4.35509C10.6516 3.74543 12.3005 3.59207 13.8897 3.91415C15.4789 4.23624 16.9379 5.01949 18.0845 6.16605C19.188 7.28355 20.0992 8.33731 21.2505 9.75012'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_17_24527'>
        <rect width='24' height='24' fill='none' transform='translate(0.25)' />
      </clipPath>
    </defs>
  </svg>
)
