/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const RightArrowIcon = ({
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
      d='M20.7307 4.8106C21.2838 4.41146 21.2838 3.58797 20.7307 3.18883L17.9415 1.17586C16.9633 0.469912 15.8031 1.77919 16.6217 2.6653L16.9074 2.97461H1.85449C1.30221 2.97461 0.854492 3.42232 0.854492 3.97461C0.854492 4.52689 1.30221 4.97461 1.85449 4.97461H16.9537L16.6212 5.33447C15.8027 6.22058 16.9628 7.52985 17.941 6.8239L20.7307 4.8106Z'
      fill='#0B0C09'
    />
  </svg>
)
