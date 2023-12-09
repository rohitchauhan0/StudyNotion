import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishForm from './PublishForm/PublishForm'

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course information",
        },
        {
            id: 2,
            title: "Course Builder",
        }, {
            id: 3,
            title: "Publish",
        },

    ]



    return (
        <div>
            <div className=' flex flex-row justify-between py-2'>
                {
                    steps.map((item) => {
                        return <div >
                            <div className=' text-2xl flex' >
                                <div className={`${step === item.id ? " bg-yellow-800 border-yellow-50 border text-yellow-50"
                                    : " border-richblack-700 border bg-richblue-800 text-richblack-300"} py-2  rounded-full px-4`}>
                                    {
                                        step > item.id ? (<div className=' py-[5px]'>
                                            <FaCheck className=' text-yellow-50' />
                                        </div>) : (item.id)
                                    }

                                </div>
                                <div className={`${step > item.id ? " text-yellow-50":" text-richblue-800" }`}>
                                    {
                                        item.id < 3 ? (<span>...............................</span>) : ("")
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=' flex justify-between my-[10px]'>
                {
                    steps.map((item) => {
                        return <div>
                            <p>{item.title}</p>
                        </div>
                    })
                }
            </div>

            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm/> }
            {step === 3 && <PublishForm/>}


        </div>
    )
}

export default RenderSteps