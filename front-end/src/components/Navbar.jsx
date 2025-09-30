import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">KDN GradeHub</Link>
        </div>

        {/* Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/calculate" className="hover:text-gray-200">Calculate</Link>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-200">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
