import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()

    const {getToken} = useAuth()
    
    const {user, isLoaded} = useUser()

    const [allCourses, setAllCourses] = useState([])

    const [isMentor, setIsMentor] = useState(false)

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const[userData, setUserData] = useState(null)

    

    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/course/all')
            if(data.success){

                setAllCourses(data.courses)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
    if (!user) {
        return;
    }

    if (user.publicMetadata.role === 'mentor') {
        setIsMentor(true);
    }

    try {
        const token = await getToken();
        console.log(token)
        const resp = await axios.get(backendUrl + '/api/user/data',
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (resp.data.success) {
            setUserData(resp.data.user);
        } else {
            toast.error(resp.data.message);
        }

    } catch (error) {
        toast.error(error.message)
    }
};


    

    {/* Function to calculate average rating */ }
    const calculateRating = (course) => {
        if (course.courseRating.length === 0) return 0;
        let totalRating = 0;
        course.courseRating.forEach(rating => {
            totalRating += rating.rating;
        })
        return Math.floor(totalRating / course.courseRating.length)
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
        try {
            const token = await getToken()
            const {data} =  await axios.get(backendUrl + '/api/user/enrolled-courses',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(data.success){
                setEnrolledCourses(data.enrolledCourses.reverse())
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(() => {
    if(user && isLoaded){
        console.log("user changed, calling fetchUserData and userCourses...");
        fetchUserData();
        userCourses();
    } else {
        console.log("No user -- not fetching user data.");
        // Optionally clear user-specific state here
    }
},[user,isLoaded]);

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
        userCourses,
        backendUrl,
        userData,
        setUserData,
        getToken,
        fetchAllCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

