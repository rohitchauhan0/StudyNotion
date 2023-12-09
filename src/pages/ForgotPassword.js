import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {
    const [emailSend, setemailSend] = useState(false)
    const [email, setemail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    function handleOnSubmit(e){
            e.preventDefault()
            dispatch(getPasswordResetToken(email, setemailSend))

    }

    return (
        <div className=' w-[100vw] h-[90vh] flex justify-center items-center'>
            <div className=' text-richblack-5'>
                {
                    loading ? (<h1 className=' text-4xl' >Loading...</h1>) : (<div className=' flex flex-col gap-4 w-[37%] mx-auto'>

                        <h1 className=' text-3xl font-bold text-richblack-5'>
                            {
                                !emailSend ? "Reset Your Passord" : "Check Your Email"
                            }
                        </h1>

                        <p className=' text-xl text-richblack-200 leading-[1.6rem]'>
                            {
                                !emailSend ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit} className=' flex flex-col  items-start'>
                            {
                                !emailSend && (
                                    <label className=' w-full flex flex-col gap-2'>
                                        <p className=' text-md'>Email Address <span className=' text-richblack-25'>*</span></p>
                                        <input style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                            className=" w-full rounded-[0.5rem] bg-richblack-800  p-[12px] pr-12 text-richblack-5" type="email" required name='email' value={email} onChange={(e) => {
                                                setemail(e.target.value)
                                            }} placeholder='Enter your Email Address    ' />
                                    </label>
                                )
                            }

                            <button className="mt-6 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 w-full" >
                                {
                                    !emailSend ? "Reset password" : "Resend email"
                                }
                            </button>
                        </form>
                        <div>
                            <Link to={"/login"}>
                                <div className=' flex gap-3 items-center'>
                                    <IoMdArrowRoundBack />
                                    <p>Back to login</p>
                                </div>

                            </Link>
                        </div>

                    </div>)
                }
            </div>
        </div>
    )
}

export default ForgotPassword