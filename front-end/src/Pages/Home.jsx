import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-50 font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Smart Grade & Percentage Calculator</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Save time and remove calculation errors for government school teachers.  
            Instantly calculate grades and percentages for all grade systems.
          </p>
          <a href="#calculator" className="bg-white text-yellow-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Calculating
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-yellow-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-yellow-900">Why KDN GradeHub?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2 text-yellow-900">Easy Input</h4>
              <p>Enter student marks easily in a clean and organized interface.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2 text-yellow-900">Automatic Calculation</h4>
              <p>Grades and percentages are calculated instantly without errors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2 text-yellow-900">Save & Print</h4>
              <p>Save results and print them directly for school records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-900 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 KDN GradeHub. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
