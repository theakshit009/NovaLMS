import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

function Testimonials() {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives.</p>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 mt-14'>
        {dummyTestimonial.map((item, ind) => (
          <div className='text-sm text-left border borer-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden' key={ind}>
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img className='h-12 w-12 rounded-full' src={item.image} alt={item.name} />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{item.name}</h1>
                <p className='text-gray-800/80'>{ item.role}</p>
              </div>
            </div>
            <div className='p-5 pb-7'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <img className='h-5' key={i} src={Math.floor(item.rating) ? assets.star : assets.star_blank} alt='star' />
                  ))}
                </div>
                <p className='text-gray-500 mt-5'>{item.feedback}</p>
            </div>
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Testimonials