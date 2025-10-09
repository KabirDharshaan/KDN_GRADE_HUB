import React from "react";
import GradeI from "../calculate/GradeI";
import GradeII from "../calculate/GradeII";
import GradeIII from "../calculate/GradeIII";
import GradeIV from "../calculate/GradeIV";

export default function Calculate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 text-gray-800 font-sans">
      {/* ===== HEADER / HERO SECTION ===== */}
      <header className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto py-10 px-6 text-center">
          <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
            📘 Grade Calculation Portal
          </h1>
          <p className="mt-3 text-lg text-yellow-100">
            Select your grade range below and calculate marks, percentage, and grade effortlessly.
          </p>
        </div>
      </header>

      {/* ===== MAIN CONTENT SECTIONS ===== */}
      <main className="max-w-6xl mx-auto py-12 px-6 space-y-16">
        {/* Grade 4–5 Section */}
        <section
          id="grade-4-5"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-8 border-yellow-900 p-8"
        >
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">
            📕 Grade 4 & 5
          </h2>
          <p className="text-gray-600 mb-6">
            Enter marks for all three terms — Quarterly (Q), Half-Yearly (H), and Annual (A).
          </p>
          <GradeIV />
        </section>

        {/* Grade 6–7 Section */}
        <section
          id="grade-6-7"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-8 border-yellow-800 p-8"
        >
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">
            📗 Grade 6 & 7
          </h2>
          <p className="text-gray-600 mb-6">
            Enter marks for all three terms — Quarterly (Q), Half-Yearly (H), and Annual (A).
          </p>
          <GradeI/>
        </section>

        {/* Grade 8–10 Section */}
        <section
          id="grade-8-9-10"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-8 border-yellow-700 p-8"
        >
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            📙 Grade 8, 9 & 10
          </h2>
          <p className="text-gray-600 mb-6">
            Record and calculate grades for higher classes with more detailed performance tracking.
          </p>
          <GradeII />
        </section>

        {/* Grade 11–12 Section */}
        <section
          id="grade-11-12"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-8 border-yellow-600 p-8"
        >
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            📒 Grade 11 & 12
          </h2>
          <p className="text-gray-600 mb-6">
            Manage and compute senior-grade subject marks with automatic percentage and grading.
          </p>
          <GradeIII />
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-yellow-900 text-yellow-100 py-6 text-center mt-16 shadow-inner">
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()} Tamil Nadu School Marks Portal · Designed with ❤️ for Education
        </p>
      </footer>
    </div>
  );
}
