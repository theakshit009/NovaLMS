import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext.jsx"
import { Line } from 'rc-progress'
import Footer from "../../components/students/Footer.jsx";
import axios from 'axios'
import { toast } from 'react-toastify';

function MyEnrollments() {

  const {enrolledCourses, calculateCourseDuration, navigate, userData, userCourses, backendUrl, getToken, CalculateNoOfLectures } = useContext(AppContext);

  const [progress, setProgress] = useState([])

  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const courseId = course._id
        const { data } = await axios.post(
  `${backendUrl}/api/user/get-course-progress`,
  { courseId }, // request body
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)
          let totalLectures = CalculateNoOfLectures(course)
          const lectureComplted = data.progressData ? data.progressData.lectureCompleted.length : 0
          return {totalLectures, lectureComplted}
    }))
    setProgress(tempProgressArray)
  } catch (error) {
      toast.error(error.message)
    }
  }
  (progress)

  useEffect(() => {
    if(userData){
      userCourses()
    }
  },[userData])

  useEffect(() => {
    if(enrolledCourses.length > 0) {
      getCourseProgress()
    }
  },[enrolledCourses])

  return (
      <>
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr >
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
        {enrolledCourses.map((course, ind) => (
            <tr key={ind} className='border-b border-gray-500/20'>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} className='w-14 sm:w-24 md:w-28' />
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line
                        strokeWidth={2}
                        percent={(progress[ind]?.lectureComplted * 100) / (progress[ind]?.totalLectures || 1)}
                        className='bg-gray-300 rounded-full'
                      />

                </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progress[ind] && `${progress[ind].lectureComplted} / ${progress[ind].totalLectures}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={() => navigate('/player/' + course._id)} className='px-3 cursor-pointer sm:px-5 py-1.5 sm:py-2 bg-green-700 max-sm:text-xs text-white'>{progress[ind] && progress[ind].lectureComplted / progress[ind].totalLectures === 1 ? 'Completed' : 'Ongoing'}</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
        <Footer />
      </>
  )
}

export default MyEnrollments