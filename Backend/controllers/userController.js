import Stripe from "stripe"
import Course from "../models/course.js"
import { Purchase } from "../models/purchase.js"
import User from "../models/user.js"
import { CourseProgress } from "../models/courseProgress.js"

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.find({userId})
        if(!user){
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
        res.json({
            success: true,
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')
        res.json({
            success: true,
            enrolledCourses: userData.enrolledCourses
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//purchase COurse

export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)
        if(!userData || !courseData){
            res.json({
                success: false,
                message: 'Data not found'
            })
        }
        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }
        const newPurchase = await Purchase.create(purchaseData)
        //payment
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()
        const line_items = [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: courseData.courseTitle
                    },
                    unit_amount: Math.floor(newPurchase.amount) * 100
                },
                quantity: 1
            }
        ]
        const session = await stripeInstance.checkout.sessions.create({
            success_url:  `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })
        res.json({
            success: true,
            session_url: session.url
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })        
    }
}

export const updateUserCourseProgress = async(req, res) => {
    try {
        const userId = req.auth.userId
        const {courseId, lectureId} = req.body
        const progressData = await CourseProgress.findOne({
            userId,
            courseId
        })
        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                res.json({
                    success: true,
                    message: 'Lecture already completed'
                })
            }
            progressData.lectureCompleted.push(lectureId)
            progressData.save()
        }
        else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
            res.json({
                success: true,
                message: 'Progress Updated'
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const {courseId} = req.body
        const progressData = await CourseProgress.findOne({
            userId,
            courseId
        })
        res.json({
            success: true,
            progressData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addUserRating = async (req, res) => {
    const userId = req.auth.userId
    const {courseId, rating} = req.body
    if(!courseId || !userId || !rating || rating > 5 || rating < 1){
        res.json({
            success: false,
            message: 'Invalid Data'
        })
    }
    try {
        const course = await Course.findById(courseId)
        if(!course){
            res.json({
                success: false,
                message: 'Course not found.'
            })
        }
        const user = await User.findById(userId)
        if(!user || !user.enrolledCourses.includes(courseId)){
            res.json({
                success: false,
                message: 'User has not purchased this course'
            })
        }
        const existingRatingIndex = course.courseRating.findIndex(r => r.userId === userId)
        if(existingRatingIndex > -1){
            course.courseRating[existingRatingIndex].rating = rating
        }else{
            course.courseRating.push({userId, rating})
        }
        await course.save()
        res.json({
            success: true,
            message: 'rating added'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}