import React, { SVGAttributes } from 'react'

export const PlusRoundedIcon = ({
  width,
  height,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    viewBox='0 0 64 64'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    focusable='false'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <path
      d='M0.0136719 32C0.0136719 14.3361 14.3361 0.0136719 32 0.0136719C49.6639 0.0136719 63.9863 14.3361 63.9863 32C63.9863 49.6639 49.6639 63.9863 32 63.9863C14.3361 63.9863 0.0136719 49.6639 0.0136719 32ZM45.1429 34.2994C45.4647 34.2994 45.728 34.0361 45.728 33.7143V30.2857C45.728 29.9639 45.4647 29.7006 45.1429 29.7006H34.2994V18.8571C34.2994 18.5353 34.0361 18.272 33.7143 18.272H30.2857C29.9639 18.272 29.7006 18.5353 29.7006 18.8571V29.7006H18.8571C18.5353 29.7006 18.272 29.9639 18.272 30.2857V33.7143C18.272 34.0361 18.5353 34.2994 18.8571 34.2994H29.7006V45.1429C29.7006 45.4647 29.9639 45.728 30.2857 45.728H33.7143C34.0361 45.728 34.2994 45.4647 34.2994 45.1429V34.2994H45.1429Z' fill='url(#paint0_linear_202_657)'
      stroke='#7C7C7C'
      strokeWidth='0.0273438' />
    <defs>
      <linearGradient
        id='paint0_linear_202_657'
        x1='0'
        y1='32'
        x2='64'
        y2='32'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#C4F360' />
        <stop offset='1' stopColor='#75F3B9' />
      </linearGradient>
    </defs>
  </svg>
)
