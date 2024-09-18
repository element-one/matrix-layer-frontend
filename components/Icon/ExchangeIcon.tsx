import React, { SVGAttributes } from 'react'

export const ExchangeIcon = ({
  width = 24,
  height = 24,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <circle cx="12" cy="12" r="12" fill="#C4F360" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17.4123 8.0887C17.7589 8.24577 18 8.59473 18 9C18 9.55228 17.5523 10 17 10H7C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8H13.603L13.2893 7.67657C12.4369 6.79786 13.645 5.49952 14.6636 6.19957L17.4123 8.0887Z" fill="#0B0C09" />
    <path fillRule="evenodd" clipRule="evenodd" d="M6.58766 15.9113C6.24108 15.7542 6 15.4053 6 15C6 14.4477 6.44771 14 7 14H17C17.5523 14 18 14.4477 18 15C18 15.5523 17.5523 16 17 16H10.397L10.7107 16.3234C11.5631 17.2021 10.355 18.5005 9.33644 17.8004L6.58766 15.9113Z" fill="#0B0C09" />
  </svg>
)
