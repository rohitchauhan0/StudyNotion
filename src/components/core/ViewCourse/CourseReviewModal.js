import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import IconButton from '../../common/IconButton'
import { createRating } from '../../../services/operations/courseDetailAPI'

const CourseReviewModal = ({setreviewModal}) => {

    const {user}= useSelector((state)=> state.profile)
    const {token}= useSelector((state)=> state.auth)
    const {register, handleSubmit, setValue, formState:{errors} , getValues} = useForm()
    const {courseEntireData}= useSelector((state)=> state.viewCourse)

    useEffect(() => {
      setValue("courseExperience", "")
      setValue("courseRating", 0)
    }, [])
    
    const onSubmit = async(data)=>{
        await createRating({
            courseID:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        }, token
        )
        setreviewModal(false)

    }
    const ratingChanged = (newRating)=>{
            setValue("courseRating", newRating)
    }

  return (
    <div >
        <div>
            {/* modal header  */}
            <p>Add Review</p>
            <button
                onClick={()=>
                setreviewModal(false)
                }
            >Close</button>
        </div>
        {/* modal body  */}
        <div>
            <div>
                <img src={user?.image} alt="User" className=' aspect-square w-[50px] h-[50px] rounded-full object-cover' />
                <div>
                <p>{user?.firstName} {user?.lastName}</p>
                <p>Posting publicly</p>
                </div>
            </div>
            <form
            onSubmit={()=> handleSubmit(onSubmit)}
            className=' mt-6 flex flex-col items-center'
             >
             <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
             />
             <div>
             <label htmlFor="courseExperience">Add your Experience</label>
                <textarea name="courseExperience" id="courseExperience" cols="30" rows="10" placeholder='Add your experience here'
                    {...register("courseExperience", {required:true})}
                    className=' min-h-[130px] w-full'
                />
                {
                    errors.courseExperience && (
                        <span>Please add your experience</span>
                    )
                }
             </div>

             <div>
             <button
             onClick={()=> setreviewModal(false)}
             >Cancel</button>
                <IconButton text={"Save"}/>
             </div>

            </form>
        </div>
    </div>
  )
}

export default CourseReviewModal