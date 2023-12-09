import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation,Autoplay, Pagination, FreeMode } from 'swiper/modules';

import Course_card from "./Course_card";

const CourseSlider = ({ Courses }) => {
  return (
    <div className="">
      {Courses?.length ? (
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        // loopedSlides={true}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          stopOnLastSlide:false,
        //   reverseDirection:true,
        }}
        navigation={true}
        className="mySwiper max-h-[30rem]"
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_card course={course} height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
</div>
  );
};

export default CourseSlider;
