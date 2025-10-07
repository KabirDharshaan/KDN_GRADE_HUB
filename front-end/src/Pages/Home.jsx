import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 via-yellow-100 to-white font-sans min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-800 via-yellow-900 to-yellow-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        <div className="container mx-auto text-center px-6 relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Smart Grade & Percentage Calculator
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-yellow-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Designed to help government school teachers save time and eliminate
            calculation errors. Instantly calculate grades and percentages with precision.
          </motion.p>
          <motion.a
            href="/calculate"
            className="inline-block bg-white text-yellow-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-100 hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Start Calculating
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h3
            className="text-4xl font-bold text-center mb-14 text-yellow-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-yellow-700">TN GradeHub?</span>
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "🖋️ Easy Input",
                desc: "Enter student marks easily in a clean, guided interface.",
              },
              {
                title: "⚙️ Automatic Calculation",
                desc: "Instant grade and percentage calculation with zero errors.",
              },
              {
                title: "🧾 Save & Print",
                desc: "Store and print records directly for school documentation.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-yellow-200"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-2xl font-semibold mb-3 text-yellow-900">
                  {item.title}
                </h4>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-900 text-white py-20 text-center">
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Simplify Your Work, Empower Every Student
          </h3>
          <p className="text-lg mb-8 text-yellow-100 max-w-2xl mx-auto">
            Join hundreds of teachers already using KDN GradeHub to calculate
            grades effortlessly and accurately.
          </p>
          <a
            href="/calculate"
            className="bg-white text-yellow-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-100 transition-all duration-300"
          >
            Try It Now
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-950 text-yellow-100 py-8 text-center">
        <div className="container mx-auto">
          <p className="text-sm mb-2">&copy; 2025 KDN GradeHub. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#features" className="hover:text-yellow-400 transition">Features</a>
            <a href="/calculate" className="hover:text-yellow-400 transition">Calculator</a>
            <a href="#" className="hover:text-yellow-400 transition">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
