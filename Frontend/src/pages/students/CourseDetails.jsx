import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/students/Footer'
import Youtube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'

function CourseDetails() {
  const { id } = useParams()
  
  const [courseData, setCourseData] = useState(null)

  const [openSection, setOpenSection] = useState({})

  const [isEnrolled, setIsEnrolled] = useState(false)

  const [playerData, setPlayerData] = useState(null)

  const { calculateRating, CalculateNoOfLectures, calculateCourseDuration, calculateChapterTimings, currency, getToken, backendUrl, userData} = useContext(AppContext)

  
  
  const fetchData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/course/' + id)
      if(data.success){
        setCourseData(data.courseData)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const enrolledCourse = async () => {
    try {
      if(!userData){
        toast.warn('Login to Enroll')
      }
      if(isEnrolled){
        return toast.warn('Already Enrolled in this course')
      }
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/purchase', {
        courseId: courseData._id
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data.success){
        const {session_url} = data
        window.location.replace(session_url)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(userData && courseData){
      setIsEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  },[userData, courseData])
  
  const toggleSetion = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }
  return courseData ?  ( <>
    
      <div className='flex md:flex-row flex-col-reverse gap-[6rem] relative items-start justify-between md:px-25 px-8 md:pt-32 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-[32rem] bg-gradient-to-b from-emerald-100/70 via-emerald-100/40 to-white'></div>
      
      <div className='max-w-xl -mt-15 z-10 text-gray-500'>
        <h1 className='md:text-[3rem] text-[2.5rem] font-semibold text-gray-800 '>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p>{ calculateRating(courseData)}</p>
          <div className='flex '>
            {[...Array(5)].map((_, i) => ( <img className='w-3.4 h-3.5' key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} />))}
          </div>
          <p className='text-gray-500'>({courseData.courseRating.length} {courseData.courseRating.length > 1 ? 'Ratings' : 'Rating'}) </p>
          <p className='text-green-700'>{courseData.enrolledStudents.length} { courseData.enrolledStudents.length > 1 ? 'Students' : 'Student'}</p>
        </div>
        <p className='text-sm'>Course by <span className='text-green-700 underline'>{courseData.mentor.name} </span></p>
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter, ind) => (
              <div key={ind} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSetion(ind)}>
                  <div className='flex items-center gap-2'>
                    <img className={`transform transition-transform ${openSection[ind] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="arrow_icon" />
                    <p className='text-sm md:text-base font-medium'>{ chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTimings(chapter)}</p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openSection[ind] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, ind) => (
                      <li className='flex items-start gap-2 py-1' key={ind}>
                        <img className='h-4 w-4 mt-1' src={assets.play_icon} alt="play-icon" />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2 px-4'>
                            {lecture.isPreviewFree && <p onClick={() => setPlayerData({videoId : lecture.lectureUrl.split('/').pop()})} className='text-green-700 cursor-pointer'>Preview</p>}
                            <p>{ humanizeDuration(lecture.lectureDuration * 60 * 1000, {units : ["h", "m"]})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='py-20 text-smmd:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
          <p className='pt-3 rich-text ' dangerouslySetInnerHTML={{ __html: courseData.courseDescription}}></p>
        </div>
      </div>
      <div className='max-w-[27rem] z-10 shadow-xl -mt-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] '> 
        {
          playerData ? <Youtube videoId={playerData.videoId} opts={{playerVars: { autoplay : 1}}} iframeClassName='w-full aspect-video' />  : <img src={courseData.courseThumbnail} alt="" />
        }
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt="" />
            <p className='text-red-500'><span className='font-medium'>5 Days</span> Left at this price</p>
          </div>
          <div className='flex gap-3 items-center pt-2'>
             <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>
              {currency} {(courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100)).toFixed(2)} 
            </p>
            <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice}</p>
            <p className='md:text-lg text-gray-500'>{ courseData.discount}% OFF</p>
          </div>
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 '>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt="" />
              <p>{calculateRating(courseData) }</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="" />
              <p>{calculateCourseDuration(courseData) }</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.lesson_icon} alt="" />
              <p>{CalculateNoOfLectures(courseData)} lessons </p>
            </div>enrolledCourse
          </div>
          <button onClick={enrolledCourse} className='md:mt-6 mt-4 cursor-pointer w-full py-3 rounded bg-blue-600 text-white font-medium'>{isEnrolled ? 'Already Enrolled' : 'Enroll Now'} </button>
          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800'>What's ihe course ?</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>🔓 Lifetime access with all future updates — totally free!</li>
              <li>🛠️ Hands-on, step-by-step project guidance from start to finish.</li>
              <li>📁 Downloadable resources & full source code included.</li>
              <li>🧠 Fun quizzes to test and sharpen your knowledge.</li>
              <li>📜 Certificate of Completion to boost your portfolio.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails