/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const ArrowUpIcon = ({
  width = 16,
  height = 16,
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
    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
    <g
      id='SVGRepo_tracerCarrier'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967L18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303C18.2374 10.8232 17.7626 10.8232 17.4697 10.5303L12.75 5.81066L12.75 20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20L11.25 5.81066L6.53033 10.5303C6.23744 10.8232 5.76256 10.8232 5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967L11.4697 3.46967Z'
        fill='currentColor'
      ></path>
    </g>
  </svg>
)

export const ArrowDownIcon = ({
  width = 16,
  height = 16,
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
    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
    <g
      id='SVGRepo_tracerCarrier'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path
        d='M17.5431 14.2672C17.8288 13.9673 17.8172 13.4926 17.5172 13.2069C17.2173 12.9212 16.7426 12.9328 16.4569 13.2328L17.5431 14.2672ZM11.4569 18.4828C11.1712 18.7827 11.1828 19.2574 11.4828 19.5431C11.7827 19.8288 12.2574 19.8172 12.5431 19.5172L11.4569 18.4828ZM11.4569 19.5172C11.7426 19.8172 12.2173 19.8288 12.5172 19.5431C12.8172 19.2574 12.8288 18.7827 12.5431 18.4828L11.4569 19.5172ZM7.5431 13.2328C7.25744 12.9328 6.78271 12.9212 6.48276 13.2069C6.18281 13.4926 6.17123 13.9673 6.4569 14.2672L7.5431 13.2328ZM11.25 19C11.25 19.4142 11.5858 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19H11.25ZM12.75 5C12.75 4.58579 12.4142 4.25 12 4.25C11.5858 4.25 11.25 4.58579 11.25 5H12.75ZM16.4569 13.2328L11.4569 18.4828L12.5431 19.5172L17.5431 14.2672L16.4569 13.2328ZM12.5431 18.4828L7.5431 13.2328L6.4569 14.2672L11.4569 19.5172L12.5431 18.4828ZM12.75 19V5H11.25V19H12.75Z'
        fill='currentColor'
      ></path>
    </g>
  </svg>
)