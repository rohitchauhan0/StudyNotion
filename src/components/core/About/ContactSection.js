import React from 'react'
import ContactUs from '../../common/ContactUs'

const ContactSection = () => {
  return (
    <div className=' mx-auto mb-7' >
    <h1 className=' text-center text-4xl font-semibold'>
        Get in Touch
    </h1>
    <p className='text-center text-richblack-300 mt-3'>We'd love to here for you, Please fill out this form.</p>
    <ContactUs/>

    </div>
  )
}

export default ContactSection