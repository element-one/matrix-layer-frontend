import clsx from 'clsx'

interface OKXIconProps {
  color?: string
  className?: string
  width?: number | string
  height?: number | string
}

export function OKXIcon({
  color,
  className,
  width = 60,
  height = 60
}: OKXIconProps) {
  return (
    <svg
      className={clsx(
        'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1iirmgg',
        className
      )}
      width={width}
      height={height}
      viewBox='0 0 2500 750'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill={color || 'black'}>
        <path d='M733 0H17C12 0 8 2 5 5 2 8 0 12 0 17v717c0 4 2 9 5 12 3 3 7 5 12 5h716c4 0 9-2 12-5 3-3 5-7 5-12V17c0-4-2-9-5-12-3-3-7-5-12-5zM500 483c0 4-2 9-5 12-3 3-7 5-12 5H267c-4 0-9-2-12-5-3-3-5-7-5-12V267c0-4 2-9 5-12 3-3 7-5 12-5h216c4 0 9 2 12 5 3 3 5 7 5 12v216z' />
        <path d='M2234 250h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V267c0-9-8-17-17-17zM1983 0h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V17c0-9-8-17-17-17zM2483 0h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V17c0-9-8-17-17-17zM1983 500h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V517c0-9-8-17-17-17zM2483 500h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V517c0-9-8-17-17-17zM1608 0h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V17c0-9-8-17-17-17zM1608 500h-217c-9 0-17 8-17 17v217c0 9 8 17 17 17h217c9 0 17-8 17-17V517c0-9-8-17-17-17z' />
        <path d='M1375 267c0-4-2-9-5-12s-7-5-12-5h-233V17c0-4-2-9-5-12s-7-5-12-5H892c-4 0-9 2-12 5s-5 7-5 12v716c0 4 2 9 5 12 3 3 7 5 12 5h217c4 0 9-2 12-5s5-7 5-12V500h233c4 0 9-2 12-5s5-7 5-12V267z' />
      </g>
    </svg>
  )
}
