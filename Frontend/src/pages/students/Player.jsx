import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Youtube from 'react-youtube'
import Footer from '../../components/students/Footer'
import Rating from '../../components/students/Rating'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/students/Loading'

function Player() {
  const {enrolledCourses, calculateChapterTimings, backendUrl, getToken, userData, fetchAllCourses} = useContext(AppContext)

  const {courseId} = useParams()
  const [data, setData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerdata, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [inititalRating, setInitialRating] = useState(0)

  const getCourseData = () => {
  enrolledCourses.forEach((course) => {
    if (course._id === courseId) {
      setData(course);
      if (userData && course.courseRating) {
        course.courseRating.forEach((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    }
  });
};

  const toggleSetion = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }

  useEffect(() => {
    if(enrolledCourses.length > 0){
      getCourseData()
    }
  },[enrolledCourses])

  const markLectureAsCompleted = async (lectureId) => {
  if (progressData?.lectureCompleted?.includes(lectureId)) {
    toast.info("Lecture already marked as completed.");
    return;
  }

  try {
    const token = await getToken();
    const { data } = await axios.post(
      `${backendUrl}/api/user/update-course-progress`,
      { courseId, lectureId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message || "Lecture marked complete!");
      getCourseProgress();
    } else {
      toast.error(data.message || "Failed to mark complete.");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};


  const getCourseProgress = async () => {
  if (!courseId) return; // guard
  try {
    const token = await getToken();
    const { data } = await axios.post(
      backendUrl + '/api/user/get-course-progress',
      { courseId }, // ensure this is defined
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      setProgressData(data.progressData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

  const handleRate = async (rating) => {
    try {
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/add-rating', {
        courseId, rating
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data.success){
        toast.success(data.message)
        fetchAllCourses()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  console.log(progressData)

  useEffect(() =>{
    getCourseProgress()
  },[courseId])

  return data ?  (
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
                        <img className='h-4 w-4 mt-1' src={
    progressData?.lectureCompleted?.includes(lecture?.lectureId)
      ? assets.blue_tick_icon
      : assets.play_icon
  } alt="play-icon" />
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
            <Rating initialRating={inititalRating} onRate={handleRate} />
          </div>
        </div>

        

        <div className='md:mt-10'>
          {playerdata ? (
              <div>
                <Youtube videoId={playerdata.lectureUrl.split('/').pop()} opts={{playerVars: { autoplay : 1}}} iframeClassName='w-full aspect-video' /> 
                <div className='flex justify-between items-center mt-1'>
                  <p>{playerdata.chapter}.{playerdata.lecture} {playerdata.lectureTitle} </p>
                  <button onClick={() =>markLectureAsCompleted(playerdata.lectureId)} className='text-green-700'>{progressData?.lectureCompleted?.includes(playerdata?.lectureId) ? 'Completed' : 'Mark Complete'}</button>
                </div>
              </div>
          ):<img src={data ? data.courseThumbnail : ''} alt="" />}   
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Player