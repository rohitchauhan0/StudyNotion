import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Thead, Tr, Th } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../utils/constants";
import Modal from "../../common/Modal"
import { deleteCourse, fetchInstructorCourses } from "../../../services/operations/courseDetailAPI";
import { setCourse } from "../../../slices/courseSlice";
import { useEffect } from "react";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const CoursesTable = ({ setcourses, courses }) => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [confirmationModal, setconfirmationModal] = useState(null);
  console.log(courses);

  const HandleCourseDelete = async(courseId) => {
    setloading(true)
    await deleteCourse({courseId:courseId}, token)
    const result = await fetchInstructorCourses(token)
    if(result){
        // setcourses(result)
        setcourses(result)
    }
    setconfirmationModal(null)
    setloading(false)
  };
  useEffect(() => {
    HandleCourseDelete()
  }, [])
  
  

  return (
    <div>
      <Table>
        {/* <Thead>
          <Tr className="flex flex-row   w-full justify-between ">
            <Th>Courses</Th>
            <Th     >Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead> */}
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td>No Courses found</Td>
            </Tr>
          ) : (
            courses?.map((course) => {
              return (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-richblack-800 p-8 justify-between"
                >
                  <Td className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      className="h-[150px] w-[220px] rounded-lg object-cover"
                    />
                    <div className=" flex flex-col justify-between">
                      <p className=" uppercase text-lg font-bold">{course.courseName}</p>
                      <p className=" text-richblack-400">{course.courseDescription}</p>
                      <p>Created:</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className=" text-pink-500">DRAFTED</p>
                      ) : (
                        <p className=" text-yellow-200">PUBLISHED</p>
                      )}
                    </div>
                  </Td>
                  <Td >2 hr 30min</Td>
                  <Td><span className=" text-pink-400">Rs/-</span> {course.price}</Td>
                  <Td className=" flex gap-5">
                    <button
                      disabled={loading}
                      className=" p-1 bg-yellow-50   px-3 font-bold text-richblack-900 rounded-md border-yellow-5 h-fit "
                      onClick={()=>{
                            navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      disabled={loading}
                      className=" p-1 bg-yellow-50   px-3 font-bold text-richblack-900 rounded-md border-yellow-5 h-fit "

                      onClick={() => {
                        setconfirmationModal({
                          text1: "Do you Want to delete this course",
                          text2:
                            "All the data realted to this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                        btn1Handler:()=> {
                            HandleCourseDelete(course._id)
                        },
                          btn2Handler: () => {
                            setconfirmationModal(null);
                          },
                        });
                      }}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
      {
        confirmationModal && <Modal modalData={confirmationModal}/>
      }
    </div>
  );
};

export default CoursesTable;
