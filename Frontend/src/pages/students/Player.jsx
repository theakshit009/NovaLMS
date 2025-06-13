import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Youtube from 'react-youtube'
import Footer from '../../components/students/Footer'
import Rating from '../../components/students/Rating'

function Player() {
  const {enrolledCourses, calculateChapterTimings} = useContext(AppContext)
  const {courseId} = useParams()
  const [data, setData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerdata, setPlayerData] = useState(null)

  const getCourseData = () =>{
    enrolledCourses.map((course) => {
      if(course._id === courseId) setData(course)
    })
  }

  const toggleSetion = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }

  useEffect(() => {
    getCourseData()
  },[enrolledCourses])

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {data && data.courseContent.map((chapter, ind) => (
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
                    {chapter.chapterContent.map((lecture, lind) => (
                      <li className='flex items-start gap-2 py-1' key={ind}>
                        <img className='h-4 w-4 mt-1' src={false ? assets.blue_tick_icon : assets.play_icon} alt="play-icon" />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2 px-4'>
                            {lecture.lectureUrl && <p onClick={() => setPlayerData({
                              ...lecture, chapter: ind + 1, lecture : lind + 1
                            })} className='text-green-700 cursor-pointer'>Watch</p>}
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
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating />
          </div>
        </div>

        

        <div className='md:mt-10'>
          {playerdata ? (
              <div>
                <Youtube videoId={playerdata.lectureUrl.split('/').pop()} opts={{playerVars: { autoplay : 1}}} iframeClassName='w-full aspect-video' /> 
                <div className='flex justify-between items-center mt-1'>
                  <p>{playerdata.chapter}.{playerdata.lecture} {playerdata.lectureTitle} </p>
                  <button className='text-green-700'>{false ? 'Completed' : 'Mark Complete'}</button>
                </div>
              </div>
          ):<img src={data ? data.courseThumbnail : ''} alt="" />}   
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player