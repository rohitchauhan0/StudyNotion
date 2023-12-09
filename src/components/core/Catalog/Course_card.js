import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars  from "../../common/RatingStar"
import { useState } from 'react'
import { useEffect } from 'react'
import  avgRatings  from "../../../utils/avgRatings"


const Course_card = ({course, height}) => {

    const [avgRating, setavgRating] = useState(0)
    useEffect(() => {
      const count = avgRatings(course.ratingAndReviews)
      setavgRating(count)
    }, [course])
    

  return (
    <div >
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg"><img src={course?.thumbnail} alt="Thumbnail" className={`${height} max-w-[400px] w-full object-cover` } /></div>
                <div  className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p  className="text-sm text-richblack-50">{course.instructor.firstName} {course.instructor.lastName}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{avgRating || 0}</span>
                        <RatingStars Review_Count={avgRating}/>
                        <span className="text-richblack-400">{course?.ratingAndReviews.length} Rating</span>
                    </div>
                    <p  className="text-xl text-richblack-5">{course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_card