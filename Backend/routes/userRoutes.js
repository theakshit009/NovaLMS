import express from 'express'
import { getUserData, purchaseCourse, userEnrolledCourses } from '../controllers/userController.js'

const usertRouter = express.Router()

usertRouter.get('/data', getUserData)
usertRouter.get('/enrolled-courses', userEnrolledCourses)
usertRouter.post('/purchase', purchaseCourse)

export default usertRouter