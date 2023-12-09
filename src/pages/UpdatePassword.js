import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { IoMdArrowRoundBack } from "react-icons/io"

const UpdatePassword = () => {
    const { loading} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const { password, confirmPassword } = formData

    function handleOnChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))

    }

    return (
        <div className=' w-[100vw] h-[90vh] flex justify-center items-center'>
            {
                loading ? (<div className=' text-richblack-5 font-bold text-4xl'>Loading...</div>) : (
                    <div className=' flex flex-col gap-4 w-[37%] mx-auto' >
                        <h2 className=' text-3xl font-bold text-richblack-5'>Choose New password</h2>
                        <p className=' text-xl text-richblack-200 leading-[1.6rem]'>Almost done. Enter your new password</p>
                        <form onSubmit={handleOnSubmit} className=' flex flex-col gap-4' >
                            <label className='relative'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New password*</p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="Enter Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span
                                    onClick={() => setshowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>

                            </label>
                            <label className=' relative' >
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm password*</p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span
                                    onClick={() => setshowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>
                            <button className="mt-6 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 w-full" type='submit'>
                                Submit
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
    )
}

export default UpdatePassword