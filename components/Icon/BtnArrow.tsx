/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const BtnArrowIcon = ({
  width = 25,
  height = 25,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M13.8625 17.5C13.6005 17.5 13.3395 17.398 13.1435 17.195L9.28053 13.195C8.90253 12.802 8.90753 12.179 9.29353 11.793L13.2935 7.79301C13.6835 7.40201 14.3165 7.40201 14.7075 7.79301C15.0975 8.18401 15.0975 8.81601 14.7075 9.20701L11.4025 12.512L14.5815 15.805C14.9655 16.203 14.9545 16.836 14.5575 17.219C14.3625 17.407 14.1125 17.5 13.8625 17.5Z'
      fill='black'
    />
  </svg>
)
