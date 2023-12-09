import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/StudentFeatures";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailAPI";
import avgRatings from "../utils/avgRatings";
import Error from "./Error";
import Modal from "../components/common/Modal";
import RatingStar from "../components/common/RatingStar";
import CourseDeatilsCard from "../components/core/CourseDetails/CourseDeatilsCard";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import Footer from "../components/common/Footer"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const CourseDeatils = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [courseData, setcourseData] = useState(null);
  const [avgreviewCount, setavgreviewCount] = useState(0);
  const [totalNumberOfLectures, settotalNumberOfLectures] = useState(0);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const [confirmationModal, setconfirmationModal] = useState(null);
  const [isActive, setisActive] = useState([]);

  const handleBuyCourse = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy course");
    }

    if (token) {
      buyCourse(token, [courseId], navigate, dispatch, user);
    }
    if (!token) {
      setconfirmationModal({
        text1: "You are not Logged in",
        text2: "Please login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => {
          navigate("/login");
        },
        btn2Handler: () => {
          setconfirmationModal(null);
        },
      });
    }
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        // console.log("Course found....", result)
        setcourseData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseDetails();
  }, [courseId]);

  //rating and review count
  useEffect(() => {
    const count = avgRatings(courseData?.data[0]?.ratingAndReviews);
    setavgreviewCount(count);
  }, [courseData]);

  //lecture count
  useEffect(() => {
    let lectures = 0;
    courseData?.data[0]?.courseContent?.forEach((sec) => {
      lectures = sec?.subSection.length || 0;
    });
    settotalNumberOfLectures(lectures);
  }, [courseData]);

  if (loading || !courseData) {
    return <div className=" text-white">Loading......</div>;
  }

  if (!courseData?.success) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data[0];

  const handleActive = (id) => {
    setisActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e != id)
    );
  };

  return (
    <div >
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgreviewCount}</span>
                <RatingStar Review_Count={avgreviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDeatilsCard
              course={courseData?.data[0]}
              setconfirmationModal={setconfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
                        {whatYouWillLearn}
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNumberOfLectures} {`lecture(s)`}
                  </span>
                  <span>
                    {
                      courseData?.data[0]?.courseContent[0]?.subSection[0]
                        ?.timeDuration
                    }{" "}
                    total length
                  </span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setisActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <Modal modalData={confirmationModal} />}
     <div className=" mt-[20%]">
     <Footer />
     </div>
    </div>
   
  );
};

export default CourseDeatils;
