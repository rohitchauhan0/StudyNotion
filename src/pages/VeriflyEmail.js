import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp, signUp } from '../services/operations/authAPI'
import {IoMdArrowRoundBack} from "react-icons/io"

const VeriflyEmail = () => {
    const [otp, setotp] = useState("")
    const dispatch = useDispatch()
    const { signupData, loading } = useSelector((state) => state.auth)
    const navigate = useNavigate();


    
    useEffect(() => {

     if(!signupData){
        navigate("/signup")
     }

    }, [])
    

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        } = signupData;
    
        dispatch(
          signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          )
        );
      };


    return (
        <div className=' w-[100vw] h-[90vh] flex justify-center items-center'>
            {
                loading ? (<div className=' text-4xl text-richblack-5 font-bold'>Loding...</div>) : (<div className=' flex flex-col gap-4 w-[37%] mx-auto'>
                    <h1 className=' text-3xl font-bold text-richblack-5'>Verify Email</h1>
                    <p className=' text-xl text-richblack-200 leading-[1.6rem]'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className=' flex flex-col gap-4' >
                        <OTPInput
                            value={otp}
                            onChange={setotp}
                            numInputs={6}
                            renderSeparator={<span className=' w-5'>  </span>}
                            renderInput={(props) => (<input {...props} />)}
                        />
                        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 w-full">
                            Verify Email
                        </button>
                    </form>
                    <div className=' flex justify-between'>
                        <Link to={"/login"}>
                            <div className=' flex gap-3 items-center'>
                                <IoMdArrowRoundBack />
                                <p>Back to login</p>
                            </div>
                        </Link>
                        <button onClick={()=> dispatch(sendOtp(signupData.email))}>
                            Resend email
                        </button>
                    </div>
                </div>)
            }


        </div>
    )
}

export default VeriflyEmail