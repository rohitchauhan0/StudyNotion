import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton'
import {AiOutlinePlusCircle} from "react-icons/ai"
import {MdOutlineNavigateNext} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailAPI'
import NestedView from './NestedView'

const CourseBuilderForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors}
    } = useForm()
    const [editSection, seteditSection] = useState(false)
    const {course}= useSelector((state)=> state.course)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    const {token} = useSelector((state)=> state.auth)
   
    

    const cancelEdit = ()=>{
        seteditSection(false)
        setValue("sectionName", "")
    }

    const goToBack = ()=>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    const goToNext= () => {
        if(course?.courseContent?.length === 0) {
          toast.error("Please add atleast one Section");
          return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)) {
          toast.error("Please add atleast one lecture in each section");
          return;
        }
        //if everything is good
        dispatch(setStep(3));
      }
    const onsubmit = async(data)=>{
        setloading(true)
        let result;
        if(editSection){
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSection,
                courseId: course._id
            }, token
            )
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId: course._id
            }, token)
        }

        //updateValue
        if(result){
            dispatch(setCourse(result))
            dispatch(setEditCourse(false))
            setValue("sectionName", "")
        }
        setloading(false)

    }

    const handleChangeEditSectionName = (sectionId, sectionName)=>{
        if(editSection === sectionId){
            cancelEdit()
            return
        }
            seteditSection(sectionId)
            setValue("sectionName", sectionName)
    }




  return (
    <div className=' text-white flex flex-col gap-4'>
        <p className=' font-bold text-2xl'>Course Builder</p>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onsubmit)} >
            <div  className=' flex flex-col gap-2'>
            <label htmlFor="">Section name <sup className=' text-pink-300 text-[16px] font-bold'> *</sup></label>
            <input type="text" id='sectionName' placeholder='Add a section to build your Course' className=' w-full p-3 rounded-md text-white bg-richblack-700' {...register("sectionName",{required:true})} />
            {
                errors.sectionName && (
                    <span>Section name is required**</span>
                )
            }
            </div>
            <div className=' flex flex-row gap-4'>
                <IconButton
                type="Submit"
                text={editSection?"Edit Section Name":`Create section`}
                outline={true}
                >
                    <AiOutlinePlusCircle className=' text-yellow-50'/>
                </IconButton>
                {
                    editSection && (
                        <button className=' text-richblack-300 underline' type='button' onClick={cancelEdit}>Cancel edit</button>
                    )
                }
            </div>
        </form>
                {
                    course?.courseContent?.length > 0 && (
                        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                    )
                }
                <div className=' flex flex-row justify-between'>
                    <button
                        className=' p-2 px-4 rounded-md border border-richblack-300 text-richblack-300 cursor-pointer flex items-center'
                        onClick={goToBack}
                    >Back
                    </button>
                    <div>
                    <IconButton outline={false} text={"Next"} onclick={goToNext} />

                    </div>
                </div>

    </div>
  )
}

export default CourseBuilderForm