import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function CourseDetails() {
  const { id } = useParams()
  
  const [data, setData] = useState(null)

  const { allCourses } = useContext(AppContext)
  
  const fetchData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setData(findCourse)
  }

  useEffect(() => {
    fetchData()
  },[])
  return (
    <div>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-32 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-screen z-[-1] bg-gradient-to-b from-emerald-100/70'></div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default CourseDetails