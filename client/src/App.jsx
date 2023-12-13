import "./App.css";

import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
    </Routes>
  );
}

export default App;
