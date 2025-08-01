import express from 'express'
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js'

const usertRouter = express.Router()

usertRouter.get('/data', getUserData)
usertRouter.get('/enrolled-courses', userEnrolledCourses)
usertRouter.post('/purchase', purchaseCourse)
usertRouter.post('/update-course-progress', updateUserCourseProgress)
usertRouter.post('/get-course-progress', getUserCourseProgress)
usertRouter.post('/add-rating', addUserRating)

export default usertRouter