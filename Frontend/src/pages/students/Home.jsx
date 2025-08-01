import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CourseSection from '../../components/students/CourseSection'
import Testimonials from '../../components/students/Testimonials'
import CalltoAction from '../../components/students/CalltoAction'
import Footer from '../../components/students/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <CalltoAction />
      <Footer />
    </div>
    )
}

export default Home