import "./App.css";

import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/about" element={<AboutUs />} ></Route>
      <Route path="/signup" element={<Signup />} ></Route>
      <Route path="/signin" element={<Signin />} ></Route>
      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="*" element={<NotFound />} ></Route>
    </Routes>
  );
}

export default App;
