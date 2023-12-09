import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"

const CourseDeatilsCard = ({
  course,
  setconfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor, You can't add course to cart");
    }
    if (user && user.accountType === ACCOUNT_TYPE.STUDENT) {
      dispatch(addToCart(course));
      return;
    }
    if (!token) {
      setconfirmationModal({
        text1: "You are not Logged in",
        text2: "Please login to add to cart",
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
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
    >
      <img
        src={course.thumbnail}
        alt="Course Thumbnail"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />
      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {course.price}
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="  bg-yellow-50 p-3 mt-10 w-fit rounded-xl text-richblack-900"
            onClick={
              user && course?.studentsEnrolled?.includes(user?._id)
                ? () => {
                    navigate("/dashboard/enrolled-courses");
                  }
                : () => {
                    handleBuyCourse();
                  }
            }
          >
            {user && course?.studentsEnrolled?.includes(user?._id)
              ? "Go to course"
              : "Buy Now"}
          </button>
          {!course.studentsEnrolled.includes(user?._id) && (
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className=" bg-richblack-300 w-fit text-richblack-900 p-3 rounded-xl"
            >
              Add to Cart
            </button>
          )}
        </div>
        <div>
          <p p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>
          <p className={`my-2 text-xl font-semibold `}>This course include: </p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course.instructions.map((data, index) => {
              return (
                <p className={`flex gap-2`} key={index}>
                <BsFillCaretRightFill />
                  <span>{data}</span>
                </p>
              );
            })}
          </div>
        </div>
        <div c className="text-center">
          <button
            onClick={() => {
              handleShare();
            }}
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
          >
            share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDeatilsCard;
