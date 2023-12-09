import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailAPI";
import Upload from "./Upload";
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconButton from "../../../../common/IconButton";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {

      if (isFormUpdated()) {
        const currentValues = getValues()
        console.log(currentValues.courseCategory)
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        } 
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory.toString() !== course.category.toString()) {
          formData.append("category", JSON.stringify(data.courseCategory))
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    console.log(formData)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
    console.log(formData)
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" rounded-md border-richblack-700 bg-richblack-800 space-y-8 p-4 w-full"
    >
      <div className=" flex flex-col gap-2">
        <label htmlFor="courseTitle">
          Course Title
          <sup className=" text-pink-300 text-[16px] font-bold"> *</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className=" w-full p-3 rounded-md text-white bg-richblack-700"
        />
        {errors.courseTitle && <span>Course title is required**</span>}
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="courseShortDesc">
          Course Short Description
          <sup className=" text-pink-300 text-[16px] font-bold"> *</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Course Description"
          {...register("courseShortDesc", { required: true })}
          className=" w-full p-3 rounded-md text-white bg-richblack-700 min-h[140px] no-scrollbar"
        />
        {errors.courseShortDesc && (
          <span>Course Description is required**</span>
        )}
      </div>
      <div className="relative flex flex-col gap-2">
        <label htmlFor="courseTitle">
          Course Price
          <sup className=" text-pink-300 text-[16px] font-bold"> *</sup>
        </label>
        <input
          type="text"
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className=" w-full p-3 rounded-md  text-white bg-richblack-700 pl-10"
        />
        {/* <HiOutlineCurrencyRupee className=' absolute bottom-[15px] left-2 text-xl text-richblack-400' /> */}
        {errors.coursePrice && <span>Course Price is required**</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="courseCategory">
          Course Category
          <sup className=" text-pink-300 text-[16px] font-bold"> *</sup>
        </label>
        <select
          name="courseCategory"
          id="courseCategory"
          defaultValue={""}
          {...register("courseCategory", { required: false })}
          className=" w-full p-3 rounded-md  text-white bg-richblack-700"
        >
          <option
            value={""}
            disabled
            className=" w-full p-3 rounded-md  text-white bg-richblack-700"
          >
            Choose a category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id} >
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span>Category is required**</span>}
      </div>

      {/* custom component for tag */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className=" flex flex-col gap-2">
        <label htmlFor="courseBenefits">
          Course Benefits
          <sup className=" text-pink-300 text-[16px] font-bold"> *</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Course Benefits"
          {...register("courseBenefits", { required: true })}
          className=" w-full p-3 rounded-md text-white bg-richblack-700 min-h[140px] no-scrollbar"
        />
        {errors.courseBenefits && <span>Course Benefits are required**</span>}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirement/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div className=" flex flex-row justify-between">
        {editCourse && (
          <button
              disabled={loading}
            onClick={() => {
              setStep(2);
            }}
            className=" w-fit cursor-pointer rounded-md bg-richblack-700 py-[8px] px-[20px] font-semibold text-richblack-300 border border-yellow-100"
          >
            Continue without saving
          </button>
        )}
        <IconButton disabled={loading}  text={!editCourse ? "Next" : "Save changes"} />
      </div>
    </form>
  );
};

export default CourseInformationForm;
