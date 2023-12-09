import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const RequirementField = ({ label, register, errors, setValue, getvalue, name }) => {
    const [requirements, setrequirements] = useState("")
    const [requirementList, setrequirementList] = useState([])

    const addrequirements = () => {
        if (requirements) {
            setrequirementList([...requirementList, requirements])
            setrequirements("")
            console.log(requirements)
        }
    }
    const removeRquirements = (index) => {
        const updateRequirementList = [...requirementList]
        updateRequirementList.splice(index, 1)
        setrequirementList(updateRequirementList)
    }
    useEffect(() => {
      register(name,{
        require:true,
        validate:(value)=> value.length>0
      })
    }, [])
    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])

    // useEffect(()=> {
    //     setValue(name, requirementList);
    // },[requirementList])
    

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="courseRequirement">{label}<sup className=' text-pink-300 text-[16px] font-bold'>*</sup></label>
            <div className='flex flex-col gap-2'>
                <div>
                <input type="text" id='courseRequirement' value={requirements} onChange={(e) => {
                    let values = e.target.value
                    setrequirements(values)
                }} className=' w-full p-3 rounded-md  text-white bg-richblack-700 ' placeholder='Enter course Requirements' />
                </div>
                <button
                    type='button'
                    onClick={addrequirements}
                    className=" w-fit cursor-pointer rounded-md bg-yellow-800 py-[8px] px-[20px] font-semibold text-yellow-50 border border-yellow-100"

                >
                    Add
                </button>
            </div>
            <div>
            {
                requirementList.length > 0 && (
                    <ul className=' flex flex-col gap-2'>
                        {
                            requirementList.map((data, index) => {
                                return <li className=' flex flex-row justify-between'  key={index}>
                                    <span>{data}</span>
                                    <button
                                    typeof='button'
                                    className=" w-fit cursor-pointer rounded-md bg-yellow-800 py-[8px] px-[20px] font-semibold text-yellow-50 border border-yellow-100"
                                        onClick={() => {
                                            removeRquirements(index)
                                        }} >remove</button>
                                </li>
                            })
                        }
                    </ul>
                )
            }
            </div>
            {
                errors.name && (
                    <span>Course requirement is necessary</span>
                )
            }
        </div>
    )
}

export default RequirementField