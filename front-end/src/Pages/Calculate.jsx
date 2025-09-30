import React from "react";

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

      {/* Grade 6 & 7 */}
      <section id="grade-6-7" className="container mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-4 text-yellow-900">Grade 6 & 7</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4">Enter marks for Grade 6 or 7 students.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Student Name" className="w-full p-2 border rounded"/>
            <input type="number" placeholder="Marks" className="w-full p-2 border rounded"/>
            <button type="submit" className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800">
              Calculate
            </button>
          </form>
        </div>
      </section>

      {/* Grade 8–10 */}
      <section id="grade-8-10" className="container mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-4 text-yellow-900">Grade 8, 9 & 10</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4">Enter marks for Grade 8, 9, or 10 students.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Student Name" className="w-full p-2 border rounded"/>
            <input type="number" placeholder="Marks" className="w-full p-2 border rounded"/>
            <button type="submit" className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800">
              Calculate
            </button>
          </form>
        </div>
      </section>

      {/* Grade 11–12 */}
      <section id="grade-11-12" className="container mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-4 text-yellow-900">Grade 11 & 12</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4">Enter marks for Grade 11 or 12 students.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Student Name" className="w-full p-2 border rounded"/>
            <input type="number" placeholder="Marks" className="w-full p-2 border rounded"/>
            <button type="submit" className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800">
              Calculate
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
