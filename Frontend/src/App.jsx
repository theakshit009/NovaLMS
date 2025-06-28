import React from 'react'
import { Route, Routes, useMatch, Navigate } from 'react-router-dom'
import Home from './pages/students/Home'
import CourseList from "./pages/students/CoursesList"
import CourseDetails from "./pages/students/CourseDetails"
import MyEnrollments from "./pages/students/MyEnrollments"
import Player from "./pages/students/Player"
import Loading from "./components/students/Loading"
import Dashboard from "./pages/mentors/Dashboard"
import AddCourse from "./pages/mentors/AddCourse"
import MyCourses from "./pages/mentors/MyCourses"
import StudentsEnrolled from "./pages/mentors/StudentsEnrolled"
import Navbar from './components/students/Navbar'
import Mentor from './pages/mentors/Mentor'
import "quill/dist/quill.snow.css";

function App() {

  const isMentorRoute = useMatch('/mentor/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isMentorRoute && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/mentor' element={<Mentor />}>
          <Route index element={<Navigate to="mentor-dash" replace />} />
          <Route path='mentor-dash' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-course' element={<MyCourses />} />
          <Route path='students-enrolled' element={<StudentsEnrolled />} /> 
        </Route>
      </Routes>
    </div>
  )
}

export default App