import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    return (
        <div className=' text-white flex flex-row justify-between flex-wrap'>
            <div className=' w-full lg:w-[55%]'>
                <h1 className=' text-3xl font-semibold mb-4'>Add Course</h1>
                <div>
                    <RenderSteps />
                </div>
            </div>


            <div className=' flex flex-col gap-4 border border-richblack-700 h-fit p-5 rounded-md'>
                <p className='text-xl font-semibold mb-4'>Code upload tips</p>
                <ul className=' flex flex-col gap-3 list-disc dis'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse