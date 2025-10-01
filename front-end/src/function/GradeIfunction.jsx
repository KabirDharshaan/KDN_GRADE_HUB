


import React, { useState } from "react";

export default function GradeFunction() {
  const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);

  const subjects = ["தமிழ்", "ஆங்கிலம்", "கணிதம்", "அறிவியல்", "சமூகவியல்"];
  const exams = ["பருவம் 1", "பருவம் 2", "பருவம் 3"];

  // 🔹 Grade calculation for FA (out of 40)
  const getFAGrade = (mark) => {
    const m = Number(mark);
    if (m >= 37 && m <= 40) return "A1";
    if (m >= 33 && m <= 36) return "A2";
    if (m >= 29 && m <= 32) return "B1";
    if (m >= 25 && m <= 28) return "B2";
    if (m >= 21 && m <= 24) return "C1";
    if (m >= 17 && m <= 20) return "C2";
    if (m >= 13 && m <= 16) return "D";
    if (m >= 9 && m <= 12) return "E1";
    if (m >= 1 && m <= 8) return "E2";
    return "";
  };

  // 🔹 Grade calculation for SA (out of 60)
  const getSAGrade = (mark) => {
    const m = Number(mark);
    if (m >= 55 && m <= 60) return "A1";
    if (m >= 49 && m <= 54) return "A2";
    if (m >= 43 && m <= 48) return "B1";
    if (m >= 37 && m <= 42) return "B2";
    if (m >= 31 && m <= 36) return "C1";
    if (m >= 25 && m <= 30) return "C2";
    if (m >= 19 && m <= 24) return "D";
    if (m >= 13 && m <= 18) return "E1";
    if (m >= 1 && m <= 12) return "E2";
    return "";
  };

  // 🔹 Grade calculation for TOTAL (FA + SA out of 100)
  const getTotalGrade = (mark) => {
    const m = Number(mark);
    if (m >= 91 && m <= 100) return "A1";
    if (m >= 81 && m <= 90) return "A2";
    if (m >= 71 && m <= 80) return "B1";
    if (m >= 61 && m <= 70) return "B2";
    if (m >= 51 && m <= 60) return "C1";
    if (m >= 41 && m <= 50) return "C2";
    if (m >= 33 && m <= 40) return "D";
    if (m >= 21 && m <= 32) return "E1";
    if (m >= 1 && m <= 20) return "E2";
    return "";
  };

  // 🔹 Initialize Students
  const handleNumStudentsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumStudents(value);

    const newStudents = [];
    for (let i = 0; i < value; i++) {
      newStudents.push({
        name: "",
        roll: "",
        marks: subjects.reduce((acc, subject) => {
          acc[subject] = exams.reduce((examAcc, exam) => {
            examAcc[exam] = {
              fa: "",
              sa: "",
              total: "",
              faGrade: "",
              saGrade: "",
              totalGrade: "",
            };
            return examAcc;
          }, {});
          acc[subject].overallTotal = 0;
          acc[subject].overallAverage = 0;
          return acc;
        }, {}),
        total: "",
        percentage: "",
      });
    }
    setStudents(newStudents);
  };

  // 🔹 Handle Input
  const handleInputChange = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  // 🔹 Handle Mark Change + Recalculate
  const handleMarkChange = (index, subject, exam, field, value) => {
    const newStudents = [...students];
    newStudents[index].marks[subject][exam][field] = value;

    const fa = parseFloat(newStudents[index].marks[subject][exam].fa) || 0;
    const sa = parseFloat(newStudents[index].marks[subject][exam].sa) || 0;
    const total = fa + sa;

    newStudents[index].marks[subject][exam].total = total;
    newStudents[index].marks[subject][exam].faGrade = getFAGrade(fa);
    newStudents[index].marks[subject][exam].saGrade = getSAGrade(sa);
    newStudents[index].marks[subject][exam].totalGrade = getTotalGrade(total);

    // 🔹 Calculate overall total & average for subject
    const totalAllParuvam = exams.reduce(
      (sum, ex) => sum + (parseFloat(newStudents[index].marks[subject][ex].total) || 0),
      0
    );
    const avgAllParuvam = (totalAllParuvam / exams.length).toFixed(2);

    newStudents[index].marks[subject].overallTotal = totalAllParuvam;
    newStudents[index].marks[subject].overallAverage = avgAllParuvam;

    // 🔹 Calculate overall student total and percentage
    const overallStudentTotal = subjects.reduce(
      (sum, sub) => sum + (newStudents[index].marks[sub].overallTotal || 0),
      0
    );

    const overallPercentage = (overallStudentTotal / (subjects.length * 300)) * 100;

    newStudents[index].total = overallStudentTotal;
    newStudents[index].percentage = overallPercentage.toFixed(2);

    setStudents(newStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Students Data:", students);
    alert("Marks saved successfully!");
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-900">
        மாணவர்களின் மதிப்பெண் விவரம்
      </h2>

      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold">மாணவர்களின் எண்ணிக்கை:</label>
        <input
          type="number"
          className="w-32 p-2 border rounded"
          value={numStudents}
          onChange={handleNumStudentsChange}
          min="0"
        />
      </div>

      {numStudents > 0 && (
        <form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div
              key={index}
              className="mb-10 border border-yellow-300 rounded-lg p-4 bg-yellow-50"
            >
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  className="w-20 p-2 border rounded text-center"
                  placeholder="வரிசை எண்"
                  value={student.roll}
                  onChange={(e) => handleInputChange(index, "roll", e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 p-2 border rounded"
                  placeholder="மாணவர் பெயர்"
                  value={student.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                />
              </div>

              {/* Each subject in its own section */}
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="mb-6 border rounded-lg p-3 bg-white shadow-sm"
                >
                  <h3 className="font-bold text-lg text-yellow-800 mb-2">{subject}</h3>

                  <table className="table-auto border-collapse w-full text-center text-sm">
                    <thead>
                      <tr className="bg-yellow-100">
                        <th className="border px-2 py-1">பருவம்</th>
                        <th className="border px-2 py-1">FA (40)</th>
                        <th className="border px-2 py-1">FA Grade</th>
                        <th className="border px-2 py-1">SA (60)</th>
                        <th className="border px-2 py-1">SA Grade</th>
                        <th className="border px-2 py-1">மொத்தம் (100)</th>
                        <th className="border px-2 py-1">மொத்தம் Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam) => (
                        <tr
                          key={`${subject}-${exam}`}
                          className="hover:bg-yellow-50"
                        >
                          <td className="border px-2 py-1">{exam}</td>

                          <td className="border px-2 py-1">
                            <input
                              type="number"
                              max="40"
                              className="w-16 p-1 border rounded text-center"
                              value={student.marks[subject][exam].fa}
                              onChange={(e) =>
                                handleMarkChange(
                                  index,
                                  subject,
                                  exam,
                                  "fa",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border px-2 py-1 bg-gray-50">
                            {student.marks[subject][exam].faGrade}
                          </td>

                          <td className="border px-2 py-1">
                            <input
                              type="number"
                              max="60"
                              className="w-16 p-1 border rounded text-center"
                              value={student.marks[subject][exam].sa}
                              onChange={(e) =>
                                handleMarkChange(
                                  index,
                                  subject,
                                  exam,
                                  "sa",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border px-2 py-1 bg-gray-50">
                            {student.marks[subject][exam].saGrade}
                          </td>

                          <td className="border px-2 py-1 bg-gray-100">
                            {student.marks[subject][exam].total}
                          </td>
                          <td className="border px-2 py-1 bg-gray-100">
                            {student.marks[subject][exam].totalGrade}
                          </td>
                        </tr>
                      ))}

                      {/* Subject total row */}
                      <tr className="bg-yellow-50 font-semibold">
                        <td className="border px-2 py-1">மொத்தம்</td>
                        <td colSpan="3" className="border px-2 py-1 text-right">
                          மொத்தம்:
                        </td>
                        <td className="border px-2 py-1">
                          {student.marks[subject].overallTotal}
                        </td>
                        <td className="border px-2 py-1">சராசரி:</td>
                        <td className="border px-2 py-1">
                          {student.marks[subject].overallAverage}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}

              {/* Student total & percentage */}
              <div className="text-right font-bold text-yellow-900">
                <p>மொத்த மதிப்பெண்: {student.total}</p>
                <p>சதவீதம்: {student.percentage}%</p>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 bg-yellow-800 text-white px-6 py-2 rounded hover:bg-yellow-700"
          >
            சேமிக்க
          </button>
        </form>
      )}
    </div>
  );
}
