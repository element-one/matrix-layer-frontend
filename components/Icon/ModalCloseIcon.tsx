/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const ModalCloseIcon = ({
  width = 25,
  height = 25,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.1779 12.4998L18.4709 8.20676C18.8619 7.81576 18.8619 7.18376 18.4709 6.79276C18.0799 6.40176 17.4479 6.40176 17.0569 6.79276L12.7639 11.0858L8.47092 6.79276C8.07992 6.40176 7.44792 6.40176 7.05692 6.79276C6.66592 7.18376 6.66592 7.81576 7.05692 8.20676L11.3499 12.4998L7.05692 16.7928C6.66592 17.1838 6.66592 17.8158 7.05692 18.2068C7.25192 18.4018 7.50792 18.4998 7.76392 18.4998C8.01992 18.4998 8.27592 18.4018 8.47092 18.2068L12.7639 13.9138L17.0569 18.2068C17.2519 18.4018 17.5079 18.4998 17.7639 18.4998C18.0199 18.4998 18.2759 18.4018 18.4709 18.2068C18.8619 17.8158 18.8619 17.1838 18.4709 16.7928L14.1779 12.4998Z'
      fill='white'
    />
  </svg>
)
