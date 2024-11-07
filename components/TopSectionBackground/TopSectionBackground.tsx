import { ImagesField } from '@components/Home/Container'

export const TopSectionBackground = () => {
  return (
    <ImagesField>
      <img
        className='w-screen absolute top-0 left-0'
        src='/images/product/product-top.png'
        alt='product-top'
      />
      <img
        className='hidden sm:inline-block rotate-[276deg] absolute top-[140px] -right-[28px]
          w-[156px] h-[156px] blur-[4.6px]'
        src='/images/product/product-dot.png'
        alt='product-dot'
      />
      <img
        className='hidden sm:inline-block absolute rotate-[45deg] top-[160px] lg:top-[250px]
          -left-[73px] w-[245px] h-[245px]'
        src='/images/product/product-dot.png'
        alt='product-dot'
      />
    </ImagesField>
  )
}
