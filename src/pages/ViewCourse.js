import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailAPI";
import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/videoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"

const ViewCourse = () => {
  const [reviewModal, setreviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setcourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData?.courseDetails?.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(lectures));
    };
    setcourseSpecificDetails();
  }, []);

  return (
    <div>
      <VideoDetailsSidebar setreviewModal={setreviewModal} />
      <div>
        <Outlet />
      </div>
      {reviewModal && <CourseReviewModal setreviewModal={setreviewModal} />}
    </div>
  );
};

export default ViewCourse;
