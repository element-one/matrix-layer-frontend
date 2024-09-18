/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const LeftArrowIcon = ({
  width = 21,
  height = 8,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    fill='none'
    viewBox='0 0 21 8'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.769287 4.8106C0.216228 4.41146 0.216227 3.58797 0.769287 3.18883L3.55854 1.17586C4.53673 0.469912 5.69685 1.77919 4.87829 2.6653L4.59256 2.97461H19.6455C20.1978 2.97461 20.6455 3.42232 20.6455 3.97461C20.6455 4.52689 20.1978 4.97461 19.6455 4.97461H4.54634L4.87876 5.33447C5.69731 6.22058 4.53718 7.52985 3.559 6.8239L0.769287 4.8106Z'
      fill='#C4F360'
    />
  </svg>
)
