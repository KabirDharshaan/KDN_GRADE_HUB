import React from "react";
import GradeI from "../calculate/GradeI";
import GradeII from "../calculate/GradeII"
import GradeIII from "../calculate/GradeIII"
export default function Calculate() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen">

      {/* Page Title */}
      <section className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">Grade Calculation</h2>
          <p className="mt-2">Select the grade range and enter marks to calculate grades and percentage.</p>
        </div>
      </section>

      {/* Grade 6 & 7 — replaced with GradeI component */}
      <section id="grade-6-7" className="container mx-auto px-4 py-10">
        <GradeI />
      </section>

      <section id="grade-8-9-10" className="container mx-auto px-4 py-10">
        <GradeII />
      </section>


       <section id="grade-11-12" className="container mx-auto px-4 py-10">
        <GradeIII />
       </section>

    </div>
  );
}
