import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'

function CourseDetails() {
  const { id } = useParams()
  
  const [data, setData] = useState(null)

  const { allCourses, calculateRating } = useContext(AppContext)
  
  const fetchData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setData(findCourse)
  }

  useEffect(() => {
    fetchData()
  },[])
  return data ?  ( <>
    
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-32 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-[32rem] bg-gradient-to-b from-emerald-100/70'></div>
      
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-[3rem] text-[2.5rem] font-semibold text-gray-800 '>{data.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: data.courseDescription.slice(0, 200) }}></p>
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p>{ calculateRating(data)}</p>
          <div className='flex '>
            {[...Array(5)].map((_, i) => ( <img className='w-3.4 h-3.5' key={i} src={i < Math.floor(calculateRating(data)) ? assets.star : assets.star_blank} />))}
          </div>
          <p className='text-gray-500'>({data.courseRatings.length} {data.courseRatings.length > 1 ? 'Ratings' : 'Rating'}) </p>
          <p className='text-green-700'>{data.enrolledStudents.length} { data.enrolledStudents.length > 1 ? 'Students' : 'Student'}</p>
        </div>
        <p className='text-sm'>Course by <span className='text-green-700 underline'>Team Nova</span></p>
      </div>
      <div></div>
    </div>
    </>
  ) : <Loading />
}

export default CourseDetails