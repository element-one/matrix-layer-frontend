export const statusClass = (status: number) => {
  switch (status) {
    case 0:
      return 'text-co-red-2 bg-co-red-1/20 border-co-red-1'
    case 1:
      return 'text-co-green-5 bg-co-green-4/20 border-co-green-3'
    default:
      return ''
  }
}
