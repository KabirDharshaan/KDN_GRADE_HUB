import React from "react";
import { useNavigate } from "react-router-dom";
export default function GradeII({ grades = ["8", "9", "10"] }) {
  const navigate = useNavigate();
  const handleCalculateClick = () => {
    navigate("/grade-function-ii"); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Grades</h2>

      <div className="flex gap-4 justify-center flex-wrap">
        {grades.map((g) => (
          <div
            key={g}
            className="flex-1 py-6 px-4 min-w-[120px] rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-200 border border-yellow-300 shadow-sm text-center"
            role="group"
            aria-label={`Grade ${g}`}
          >
            <div className="text-sm text-gray-600 mb-1">Class</div>
            <div className="text-3xl font-extrabold">{`Grade ${g}`}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        You can pass different grade values via the <code>grades</code> prop.
      </p>

      <button
        onClick={handleCalculateClick}
        className="w-full bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800"
      >
        Calculate
      </button>
    </div>
  );
}
