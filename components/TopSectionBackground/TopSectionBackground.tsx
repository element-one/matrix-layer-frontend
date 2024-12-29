import { ImagesField } from '@components/Home/Container'

export const TopSectionBackground = () => {
  return (
    <ImagesField>
      <div className='w-screen absolute top-0 left-0'>
        <img
          className='w-screen relative dark:bottom-0 sm:bottom-[400px]'
          src='/images/product/product-top.png'
          alt='product-top'
        />

        <div
          className='absolute inset-0 w-screen bg-gradient-to-b from-transparent to-white
            dark:to-black dark:bottom-0 sm:bottom-[400px]'
        ></div>
      </div>
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
