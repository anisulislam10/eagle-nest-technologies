import Image from 'next/image'
import Link from 'next/link'
import { projectinfo } from '@/app/api/data'

const Projects = () => {
  return (
    <section id='projects' className='scroll-mt-24 bg-section dark:bg-darklight'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div
          className='flex gap-2 items-center justify-center'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <span className='w-3 h-3 rounded-full bg-success'></span>
          <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
            our projects
          </span>
        </div>
        <h2
          className='sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          Projects we have designed, built, and shipped
        </h2>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7'>
          {projectinfo.map((item, index) => (
            <article
              key={item.title}
              data-aos='fade-up'
              data-aos-delay={`${index * 200}`}
              data-aos-duration='1000'
              data-aos-offset='300'
              className='group flex flex-col overflow-hidden rounded-md bg-white shadow-service dark:bg-darkmode'>
              <div className='relative overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={345}
                  height={430}
                  className='aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <span className='absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white'>
                  {item.category}
                </span>
              </div>
              <div className='flex flex-1 flex-col gap-3 p-6'>
                <h3 className='text-xl font-bold text-midnight_text dark:text-white'>
                  {item.title}
                </h3>
                <p className='text-sm text-grey dark:text-white/50'>{item.description}</p>
                <ul className='mt-auto flex flex-wrap gap-2 pt-3'>
                  {item.technologies.map(technology => (
                    <li
                      key={technology}
                      className='rounded-full border border-border px-3 py-1 text-xs text-secondary dark:border-dark_border dark:text-white/60'>
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className='flex justify-center pt-12' data-aos='fade-up' data-aos-delay='200'>
          <Link
            href='/portfolio'
            className='rounded-md bg-primary px-8 py-3 text-white transition duration-300 hover:bg-blue-700'>
            View all projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
