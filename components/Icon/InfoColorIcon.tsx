/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const InfoColorIcon = ({
  width = 20,
  height = 21,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 20 21'
  >
    <path
      d='M9 7.5H11V5.5H9M10 18.5C5.59 18.5 2 14.91 2 10.5C2 6.09 5.59 2.5 10 2.5C14.41 2.5 18 6.09 18 10.5C18 14.91 14.41 18.5 10 18.5ZM10 0.5C8.68678 0.5 7.38642 0.758658 6.17317 1.2612C4.95991 1.76375 3.85752 2.50035 2.92893 3.42893C1.05357 5.3043 0 7.84784 0 10.5C0 13.1522 1.05357 15.6957 2.92893 17.5711C3.85752 18.4997 4.95991 19.2362 6.17317 19.7388C7.38642 20.2413 8.68678 20.5 10 20.5C12.6522 20.5 15.1957 19.4464 17.0711 17.5711C18.9464 15.6957 20 13.1522 20 10.5C20 9.18678 19.7413 7.88642 19.2388 6.67317C18.7362 5.45991 17.9997 4.35752 17.0711 3.42893C16.1425 2.50035 15.0401 1.76375 13.8268 1.2612C12.6136 0.758658 11.3132 0.5 10 0.5ZM9 15.5H11V9.5H9V15.5Z'
      fill='url(#paint0_linear_1223_2865)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_1223_2865'
        x1='10'
        y1='0.5'
        x2='10'
        y2='20.5'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#E789FF' />
        <stop offset='1' stopColor='#9299FF' />
      </linearGradient>
    </defs>
  </svg>
)
