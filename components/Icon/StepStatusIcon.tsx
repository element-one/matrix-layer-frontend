/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const CompletedIcon = ({
  width = 16,
  height = 16,
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
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='8' cy='8' r='8' fill='#C4F360' />
    <path
      d='M3.74131 6.88846C3.6468 6.79352 3.53447 6.71818 3.41076 6.66678C3.28705 6.61537 3.1544 6.58891 3.02044 6.58891C2.88647 6.58891 2.75383 6.61537 2.63012 6.66678C2.50641 6.71818 2.39407 6.79352 2.29956 6.88846C2.20462 6.98298 2.12928 7.09531 2.07787 7.21902C2.02646 7.34273 2 7.47538 2 7.60934C2 7.74331 2.02646 7.87595 2.07787 7.99966C2.12928 8.12337 2.20462 8.23571 2.29956 8.33022L5.96484 11.9955L6.02433 12.055C6.11372 12.1446 6.21991 12.2156 6.3368 12.2641C6.45369 12.3126 6.579 12.3375 6.70555 12.3375C6.83209 12.3375 6.9574 12.3126 7.07429 12.2641C7.19118 12.2156 7.29737 12.1446 7.38677 12.055L13.7175 5.7243C13.807 5.6349 13.8781 5.52872 13.9266 5.41182C13.975 5.29493 14 5.16963 14 5.04308C14 4.91653 13.975 4.79122 13.9266 4.67433C13.8781 4.55744 13.807 4.45125 13.7175 4.36186L13.6381 4.28255C13.5487 4.19298 13.4426 4.12192 13.3257 4.07344C13.2088 4.02495 13.0835 4 12.9569 4C12.8304 4 12.7051 4.02495 12.5882 4.07344C12.4713 4.12192 12.3651 4.19298 12.2757 4.28255L6.70413 9.85128L3.74131 6.88846Z'
      fill='#1A1A1A'
    />
  </svg>
)

export const CurrentIcon = ({
  width = 16,
  height = 16,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    focusable='false'
    viewBox='0 0 16 16'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <circle cx='8' cy='8' r='8' fill='#C4F360' />
  </svg>
)

export const UndoIcon = ({
  width = 9,
  height = 8,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox='0 0 9 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='4.5' cy='4' r='4' fill='#7C7C7C' />
  </svg>
)
