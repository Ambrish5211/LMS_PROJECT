import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth.jsx"
import AboutUs from "./Pages/AboutUs.jsx";
import Contact from "./Pages/Contact.jsx";
import CourseDescription from "./Pages/Course/CourseDescription.jsx";
import CourseList from "./Pages/Course/CourseList.jsx";
import CreateCourse from "./Pages/Course/CreateCourse.jsx";
import Denied from "./Pages/Denied.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Checkout from "./Pages/Payment/Checkout.jsx";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure.jsx";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess.jsx";
import Signin from "./Pages/Signin.jsx";
import Signup from "./Pages/Signup.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Profile from "./Pages/User/Profile.jsx";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures.jsx";
import AddLecture from "./Pages/Dashboard/AddLecture.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/about" element={<AboutUs />} ></Route>
      <Route path="/signup" element={<Signup />} ></Route>
      <Route path="/signin" element={<Signin />} ></Route>
      <Route path="/courses" element={<CourseList />} ></Route>
      <Route path="/course/description" element={<CourseDescription />} ></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />} >
        <Route path="/user/profile" element={<Profile />}></Route> 
        <Route path="/user/editProfile" element={<EditProfile />}></Route> 
        <Route path="/checkout" element={<Checkout />} ></Route>
        <Route path="/checkout/success" element={<CheckoutSuccess />} ></Route>
        <Route path="/checkout/failure" element={<CheckoutFailure />} ></Route>
        <Route path="/course/displaylectures" element = {<DisplayLectures />}></Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
        <Route path="/courses/create" element={<CreateCourse />}></Route> 
        <Route path="/course/addlecture" element={<AddLecture />}></Route>
      </Route>

      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="/denied" element={<Denied />} ></Route>
      <Route path="*" element={<NotFound />} ></Route>
    </Routes>
  );
}

export default App;
