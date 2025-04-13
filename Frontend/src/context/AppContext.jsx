import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])

    const [isMentor, setIsMentor] = useState(true)

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    {/* Function to calculate average rating */ }
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        })
        return totalRating / course.courseRatings.length;
    }

    const calculateChapterTimings = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    const calculateCourseDuration = (course) => {
        let time = 0;

        course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    const CalculateNoOfLectures = (course) => {
        let cnt = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                cnt += chapter.chapterContent.length
            }
        })
        return cnt;
    }

    //fetching user enrolled courses

    const userCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        userCourses()
    },[])

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isMentor,
        setIsMentor,
        calculateChapterTimings,
        calculateCourseDuration,
        CalculateNoOfLectures,
        enrolledCourses,
        userCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

