/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const GoogleIcon = ({
  width,
  height,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    viewBox='0 0 533.5 544.3'
    height={height}
    width={width}
    className={className ?? ''}
    {...props}
  >
    <path
      d='M533.5 278.4c0-18.5-2.2-36.3-6.7-53.3H272.1v99.7h147c-6.1 33.8-25 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-197.1z'
      fill='#4285f4'
    ></path>
    <path
      d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-88.2-68c-24.4 16.6-55.9 26-92.2 26-71 0-131.2-47.9-153.2-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
      fill='#34a853'
    ></path>
    <path
      d='M118.9 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9C10.2 193 0 239.6 0 289.4c0 49.9 10.2 96.5 28.9 140.4l90-70.1z'
      fill='#fbbc04'
    ></path>
    <path
      d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90 70.1c22-64.5 82.3-112.4 153.2-112.4z'
      fill='#ea4335'
    ></path>
  </svg>
)
