/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const PaginationArrowIcon = ({
  width = 12,
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
    viewBox='0 0 12 13'
    fill='none'
  >
    <g clipPath='url(#clip0_490_2415)'>
      <path
        d='M3.27734 0.505209C3.14692 0.505209 3.01636 0.554986 2.9168 0.654541C2.71769 0.853653 2.71769 1.1765 2.9168 1.37547L7.95673 6.41539L2.9168 11.4552C2.71769 11.6542 2.71769 11.9771 2.9168 12.1761C3.11591 12.3752 3.43862 12.3752 3.63773 12.1761L9.03819 6.77579C9.13379 6.68016 9.1875 6.55047 9.1875 6.41525C9.1875 6.28003 9.13379 6.15035 9.03819 6.05472L3.63773 0.654541C3.53831 0.554986 3.40775 0.505209 3.27734 0.505209Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_490_2415'>
        <rect
          width='12'
          height='12'
          fill='white'
          transform='matrix(-1 0 0 -1 12 12.4248)'
        />
      </clipPath>
    </defs>
  </svg>
)
