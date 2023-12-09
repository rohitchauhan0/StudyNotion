import React from 'react'
import ContactUsForm from '../components/common/ContactUs'
import Footer from '../components/common/Footer'

const Contactus = () => {
    return (
        <div>
            <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-[10%]'>
                <div className='lg:w-[40%] '>
                    <div className='flex flex-col gap-7 p-[40px] text-sm text-richblack-200 bg-richblack-800 rounded-lg'>
                        <div className='flex flex-col items-start gap-1'>
                            <h2 className='text-lg font-semibold text-richblack-5'>Chat on us</h2>
                            <p className='font-medium'>Our friendly team is here to help.</p>
                            <p className='font-semibold'>info@studynotion.com</p>
                        </div>
                        <div className='flex flex-col items-start gap-1'>
                            <h2 className='text-lg font-semibold text-richblack-5'>Visit us</h2>
                            <p className='font-medium'>Come and say hello at our office HQ.</p>
                            <p className='font-semibold'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                        </div>
                        <div className='flex flex-col items-start gap-1'>
                            <h2 className='text-lg font-semibold text-richblack-5'>Call us</h2>
                            <p className='font-medium'>Mon - Fri From 8am to 5pm</p>
                            <p className='font-semibold'>+123 456 7869</p>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[60%]'>
                    <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                        <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>Got a Idea? We've got the skills. Let's team up</h1>
                        <p>Tell us more about yourself and what you're got in mind.</p>
                        <div className=' mt-7'>
                            <ContactUsForm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contactus