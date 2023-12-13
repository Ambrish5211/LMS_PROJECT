import "./App.css";

import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/about" element={<AboutUs />} ></Route>
    </Routes>
  );
}

export default App;
