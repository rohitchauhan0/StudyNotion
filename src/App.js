import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VeriflyEmail from "./pages/VeriflyEmail";
import Error from "./pages/Error";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import MyProfile from "./components/core/Dashboard.js/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Index from "./components/core/Dashboard.js/Settings/Index";
import EnrolledCourses from "./components/core/Dashboard.js/EnrolledCourses";
import Cart from "./components/core/Dashboard.js/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard.js/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard.js/MyCourses";
import EditCourse from "./components/core/Dashboard.js/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDeatils from "./pages/CourseDeatils";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDeatils />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>  
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VeriflyEmail />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contactus />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/settings"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={
                  <PrivateRoute>
                    <EnrolledCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="dashboard/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="dashboard/add-course"
                element={
                  <PrivateRoute>
                    <AddCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="dashboard/my-courses"
                element={
                  <PrivateRoute>
                    <MyCourses />
                  </PrivateRoute>
                }
                
              />
              <Route
                path="dashboard/edit-course/:courseId"
                element={
                  <PrivateRoute>
                    <EditCourse />
                  </PrivateRoute>
                }
                
              />
            </>
          )}
        </Route>


        <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }
        >
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          )
        }

        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
