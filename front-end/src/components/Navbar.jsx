import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/TN_G.jpeg";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-yellow-800 via-yellow-900 to-yellow-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 px-6">
        
        
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold tracking-wide flex items-center gap-2"
        >

          <img src={logo} alt="Logo" className="h-12 w-12  object-cover" />

          <span className="bg-white text-yellow-900 px-2 py-1 rounded-md shadow-md">
            TN 
          </span>
          <span className="hidden sm:inline">GradeHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Calculate", path: "/calculate" },
            { name: "Login", path: "/login" },
            { name: "About", path: "#about" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.path.startsWith("#") ? (
                <a href={item.path} className="hover:text-yellow-300 transition">
                  {item.name}
                </a>
              ) : (
                <Link to={item.path} className="hover:text-yellow-300 transition">
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="md:hidden bg-yellow-950 bg-opacity-95 text-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-4 py-6 text-lg font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Calculate", path: "/calculate" },
                { name: "Login", path: "/login" },
                { name: "About", path: "#about" },
              ].map((item, i) => (
                <li key={i}>
                  {item.path.startsWith("#") ? (
                    <a
                      href={item.path}
                      className="hover:text-yellow-300 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="hover:text-yellow-300 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
