import express from 'express'
import { addCourse, getEnrolledStudentsData, getMentorCourses, mentorDashboardData, updateRoleToMentor } from '../controllers/mentorController.js'
import upload from '../config/multer.js'
import { protectMentor } from '../middlewares/authMiddleware.js'

const mentorRouter = express.Router()

mentorRouter.get('/update-role', updateRoleToMentor)
mentorRouter.post('/add-course', upload.single('image'), protectMentor, addCourse)
mentorRouter.get('/courses', protectMentor, getMentorCourses)
mentorRouter.get('/dashboard', protectMentor, mentorDashboardData)
mentorRouter.get('/enrolled-students', protectMentor, getEnrolledStudentsData)

export default mentorRouter

