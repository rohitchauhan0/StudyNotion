import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailAPI'
import IconButton from "../../common/IconButton"
import { useNavigate } from 'react-router-dom'
import CoursesTable from './CoursesTable'

const MyCourses = () => {
    const {token} = useSelector((state)=> state.auth)
    const {course}= useSelector((state)=> state.course)
    const dispatch= useDispatch()
    const [courses, setcourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
     const fetchCourses = async()=>{
        const result = await fetchInstructorCourses(token)
        if(result){
            setcourses(result)
        }
     }
     fetchCourses()

    }, [])
    

  return (
    <div className=' text-white'>
        <div className=' flex flex-row justify-between mb-10'>
            <h1 className=' text-4xl font-bold'>My Courses</h1>
            <IconButton text={"Add course"} onclick={()=>{
                navigate("/dashboard/add-course")
            }}/>
        </div>
        {
            courses && <CoursesTable courses={courses} setcourses={setcourses}/>
        }
    </div>
  )
}

export default MyCourses