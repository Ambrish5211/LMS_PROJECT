import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth"
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import Denied from "./Pages/Denied";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";

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
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
        <Route path="/courses/create" element={<CreateCourse />}></Route> 
      </Route>

      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="/denied" element={<Denied />} ></Route>
      <Route path="*" element={<NotFound />} ></Route>
    </Routes>
  );
}

export default App;
