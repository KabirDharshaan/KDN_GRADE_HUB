


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Calculate from "./Pages/Calculate";
import GradeFunction from "./function/GradeIfunction"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/grade-function" element={<GradeFunction />} />
      </Routes>
    </Router>
  );
}

export default App;
