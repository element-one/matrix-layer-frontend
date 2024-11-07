import { AnchorHTMLAttributes } from 'react'

export default function ChatLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      {...props}
      className='text-[#428ae3] underline'
    >
      {children}
    </a>
  )
}
