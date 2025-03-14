import React from 'react'
import { Link } from 'react-router-dom'

function CourseSection() {
  return (
    <div className='py-16 px-8 md:px-4'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 my-3 mb-5'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

      <Link to={'/course-list'} onClick={() => scrollTo(0,0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded mt-3'>Show all sourses</Link>
    </div>
  )
}

export default CourseSection