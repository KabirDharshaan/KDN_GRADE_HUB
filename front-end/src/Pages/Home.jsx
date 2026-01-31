import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 via-yellow-100 to-white font-sans min-h-screen">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative bg-gradient-to-r from-yellow-800 via-yellow-900 to-yellow-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Smart Grade & Percentage Calculator
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-yellow-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A digital assistant for Tamil Nadu Government School Teachers to
            calculate grades and percentages instantly—accurate, fast, and
            error-free.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/login"
              className="inline-block bg-white text-yellow-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-100 transition-all duration-300"
            >
              Start Calculating
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-14 text-yellow-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-yellow-700">KDN GradeHub?</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "🖊️ Simple Mark Entry",
                desc: "Clean and guided mark entry designed for teachers.",
              },
              {
                title: "⚙️ Automatic Calculation",
                desc: "Instant grade and percentage calculation with zero manual effort.",
              },
              {
                title: "🖨️ Print-Ready Records",
                desc: "Save and print reports for official school documentation.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-yellow-200"
                whileHover={{ y: -6 }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-yellow-900">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="bg-yellow-900 text-white py-20 text-center">
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Save Time. Reduce Errors. Focus on Teaching.
          </h2>

          <p className="text-lg mb-8 text-yellow-100 max-w-2xl mx-auto">
            Trusted by educators to simplify academic calculations and improve
            productivity.
          </p>

          <Link
            to="/login"
            className="bg-white text-yellow-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-100 transition-all duration-300"
          >
            Login to Continue
          </Link>
        </motion.div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-yellow-950 text-yellow-100 py-8 text-center">
        <div className="container mx-auto">
          <p className="text-sm mb-2">
            © 2025 KDN GradeHub. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#features" className="hover:text-yellow-400 transition">
              Features
            </a>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>
            <a href="#" className="hover:text-yellow-400 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
