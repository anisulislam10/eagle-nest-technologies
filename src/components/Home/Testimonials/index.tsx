import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import { testimonialinfo } from '@/app/api/data'

const Testimonials = () => {
  return (
    <section id='testimonials' className='scroll-mt-24 bg-white dark:bg-darkmode'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div
          className='flex gap-2 items-center justify-center'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <span className='w-3 h-3 rounded-full bg-success'></span>
          <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
            testimonials
          </span>
        </div>
        <h2
          className='sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          What our clients say about working with us
        </h2>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7'>
          {testimonialinfo.map((item, index) => (
            <figure
              key={item.name}
              data-aos='fade-up'
              data-aos-delay={`${index * 200}`}
              data-aos-duration='1000'
              data-aos-offset='300'
              className='flex h-full flex-col gap-5 rounded-md border border-border bg-section p-8 shadow-service dark:border-dark_border dark:bg-darklight'>
              <div className='flex gap-1' aria-label={`Rated ${item.rating} out of 5`}>
                {Array.from({ length: item.rating }).map((_, star) => (
                  <Image
                    key={star}
                    src={getImgPath('/images/counter/star.svg')}
                    alt=''
                    width={16}
                    height={16}
                    className='h-4 w-4'
                  />
                ))}
              </div>
              <blockquote className='text-base leading-relaxed text-grey dark:text-white/70'>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className='mt-auto flex items-center gap-4 pt-2'>
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={56}
                  height={56}
                  className='h-14 w-14 rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold text-midnight_text dark:text-white'>{item.name}</p>
                  <p className='text-sm text-secondary dark:text-white/50'>{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
