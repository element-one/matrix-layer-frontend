import clsx from 'clsx'

interface XIconProps {
  color?: string
  className?: string
}

export function XIcon({ color, className }: XIconProps) {
  return (
    <svg
      className={clsx(
        'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1iirmgg',
        className
      )}
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ fill: color }}
    >
      <path
        d='M13.7447 1.42798H16.2748L10.7473 7.7456L17.25 16.3425H12.1584L8.17053 11.1285L3.60746 16.3425H1.07582L6.98808 9.58505L0.75 1.42798H5.97083L9.57555 6.19373L13.7447 1.42798ZM12.8567 14.8281H14.2587L5.20905 2.86283H3.7046L12.8567 14.8281Z'
        fill='currentColor'
      />
    </svg>
  )
}