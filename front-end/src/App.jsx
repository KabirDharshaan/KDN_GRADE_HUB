import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Calculate from "./Pages/Calculate";
import GradeFunction from "./function/GradeIfunction";
import GradeIfunctionII from "./function/GradelfunctionII";
import Login from "./Pages/login";
import Signin from "./Pages/signin";

/* -------------------- */
/* Protected Route */
/* -------------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

/* -------------------- */
/* Layout Wrapper */
/* -------------------- */
function Layout({ children }) {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

/* -------------------- */
/* App */
/* -------------------- */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route
            path="/calculate"
            element={
              <ProtectedRoute>
                <Calculate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grade-function"
            element={
              <ProtectedRoute>
                <GradeFunction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grade-function-ii"
            element={
              <ProtectedRoute>
                <GradeIfunctionII />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
