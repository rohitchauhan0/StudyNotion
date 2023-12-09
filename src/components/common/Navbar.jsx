import React, { useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import{PiDotsThreeOutlineDuotone} from "react-icons/pi"
import Spinner from "./Spinner";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const [NavActive, setNavActive] = useState(false)

  const [subLinks, setsubLinks] = useState([]);

  const fetchSublinks = async () => {
    setloading(true);
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      setsubLinks(res.data.data);

      console.log(subLinks);
    } catch (error) {
      console.log("Could not fetch Categories.", error);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const navbBarFunction = ()=>{
    NavActive?(setNavActive(false)):(setNavActive(true))
    console.log("kjjbzdhc")
  }

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${NavActive? "h-[100vh] items-center  transition-all duration-200 relative": "h-14 transition-all duration-200"}`}>
      <div className={`flex w-11/12 max-w-maxContent items-center justify-between ${NavActive ? "flex flex-col gap-10 transition-all duration-500":" flex flex-row transition-all duration-500"}`}>
        {/* Image */}
        <Link to="/" >
          <img src={logo} className=" lg:w-[70%] w-[90%]" height={42} loading="lazy" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className={`lg:flex gap-x-6 text-richblack-25 visible ${NavActive?"visible flex flex-col gap-10 ":"lg:visible invisible"}`}>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group z-30">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div
                      className="invisible absolute left-[50%]
                                    translate-x-[-50%]
                                 top-[100%] translate-y-
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition duration-300 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>
                      {!loading ? (
                        subLinks.length > 0 ? (
                          <>
                            {
                            subLinks.map((subLink, i) => {
                               return <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                            })}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative text-richblack-200 text-2xl"
            >
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className={`border border-richblack-700 bg-richblack-800 w-fit lg:px-[12px] lg:py-[8px] py-[5px] px-[3px] lg:text-[16px] text-[14px] text-richblack-100 rounded-md ${NavActive?"visible":"lg:block hidden"} `}>
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className={`border border-richblack-700 w-fit bg-richblack-800 lg:px-[12px] lg:py-[8px] lg:text-[16px] text-[14px] py-[5px] px-[3px] text-richblack-100 rounded-md ${NavActive?"visible transition-all duration-500":"lg:block hidden transition-all duration-500"}`}>
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
      <div className=" visible lg:invisible ml-4 mr-2">
        <button
        onClick={()=>{
            navbBarFunction()
        }}
        >
        <PiDotsThreeOutlineDuotone className=" text-white text-xl absolute top-4 right-3"/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
