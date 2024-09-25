/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const MinusIcon = ({
  width = 24,
  height = 24,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 24 24'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M19 13H5C4.448 13 4 12.553 4 12C4 11.447 4.448 11 5 11H19C19.553 11 20 11.447 20 12C20 12.553 19.553 13 19 13Z'
    />
  </svg>
)
