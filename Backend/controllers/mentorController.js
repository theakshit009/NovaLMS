import { clerkClient } from "@clerk/express"
import Course from "../models/course.js"
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from "../models/purchase.js"
import User from "../models/user.js"

export const updateRoleToMentor = async (req,res) => {
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'mentor'
            }
        })

        res.json({
            success: true,
            message: 'You can publish a course now'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


//Course Controller

export const addCourse = async (req,res) => {
    try {
        const {courseData} = req.body
        const imageFile = req.file
        const mentorId = req.auth.userId

        if(!imageFile){
            return res.json({
                success: false,
                message: 'Thumbnail not attached'
            })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.mentor = mentorId

        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({
            success: true,
            message: 'Course Added Successfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Mentor Courses
export const getMentorCourses = async (req, res) => {
    try {
        const mentor = req.auth.userId
        const courses = await Course.find({mentor})
        res.json({
            success: true,
            courses
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Mentor Dashboard Data
export const mentorDashboardData = async (req, res) => {
    try {
        const mentor = req.auth.userId
        const courses = await Course.find({mentor})
        const totalCourses = courses.length

        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        })

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

        const enrolledStudentsData = []
        for(const course of courses){
            const students = await User.find({
                _id: {$in: course.enrolledStudents}
            }, 'name, imageUrl')

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }
        res.json({
            success: true,
            dashboardData: {
                totalEarnings,
                enrolledStudentsData,
                totalCourses
            }
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Getting enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
    try {
        const mentor = req.auth.userId
        const courses = await Course.find({mentor})
        const courseIds = courses.map(course => course._id)
        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')
        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseData: purchase.createdAt
        }))
        res.json({
            success: true,
            enrolledStudents
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}