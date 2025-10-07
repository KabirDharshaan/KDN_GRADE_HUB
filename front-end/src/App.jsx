import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Calculate from "./Pages/Calculate";
import GradeFunction from "./function/GradeIfunction";
import GradeIfunctionII from "./function/GradelfunctionII";
import Login from "./Pages/login";
import Signin from "./Pages/signin"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/grade-function" element={<GradeFunction />} />
        <Route path="/grade-function-ii" element={<GradeIfunctionII />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} /> 
      </Routes>
    </Router>
  );
}

export default App;
