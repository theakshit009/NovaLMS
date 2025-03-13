import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/students/Home'
import CourseList from "./pages/students/CoursesList"
import CourseDetails from "./pages/students/CourseDetails"
import MyEnrollments from "./pages/students/MyEnrollments"
import Player from "./pages/students/Player"
import Loading from "./components/students/Loading"
import Educator from "./pages/mentors/Educator"
import Dashboard from "./pages/mentors/Dashboard"
import AddCourse from "./pages/mentors/AddCourse"
import MyCourses from "./pages/mentors/MyCourses"
import StudentsEnrolled from "./pages/mentors/StudentsEnrolled"
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/mentor' element={<Educator />}>
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