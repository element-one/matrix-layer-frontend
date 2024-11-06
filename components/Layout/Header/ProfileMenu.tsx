export type MenuItem = {
  label: string
  href: string
  key: string
}

export const MenuList: MenuItem[] = [
  {
    label: 'Home',
    href: '/',
    key: 'home'
  },
  {
    label: 'Presale',
    href: '/presale',
    key: 'presale'
  },
  {
    label: 'Stake',
    href: '/stake',
    key: 'stake'
  }
]
