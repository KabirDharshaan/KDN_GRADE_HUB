
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signin", {
        username,
        email,
        password,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#4a2c18] to-[#2c1b10]">
      <div className="text-center mb-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9e/TamilNadu_Emblem.png"
          alt="Tamil Nadu Emblem"
          className="w-20 mx-auto mb-3"
        />
        <h1 className="text-3xl font-bold text-yellow-200 tracking-wide">
          தமிழ்நாடு அரசு
        </h1>
        <h2 className="text-lg text-yellow-100">Government of Tamil Nadu</h2>
      </div>

      <div className="bg-[#f5ede2] shadow-xl rounded-2xl p-8 w-[90%] max-w-md border-t-4 border-[#7b4b2a]">
        <h3 className="text-2xl font-semibold text-center text-[#4a2c18] mb-6">
          Sign In to Your Account
        </h3>

        <form onSubmit={handleSignin} className="space-y-5">
          <div>
            <label className="block text-[#4a2c18] font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg border border-[#b08b60] focus:outline-none focus:ring-2 focus:ring-[#7b4b2a]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a2c18] font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-[#b08b60] focus:outline-none focus:ring-2 focus:ring-[#7b4b2a]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a2c18] font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-[#b08b60] focus:outline-none focus:ring-2 focus:ring-[#7b4b2a]"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-[#4a2c18]">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-[#7b4b2a] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7b4b2a] hover:bg-[#5c361f] text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#4a2c18]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7b4b2a] hover:underline">Login</Link>
        </p>
      </div>

      <footer className="mt-8 text-center text-sm text-yellow-100">
        © 2025 KDN INDUSTRIES. All rights reserved.
      </footer>
    </div>
  );
}
