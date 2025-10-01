

import React, { useState } from "react";

export default function GradeFunction() {
  const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);

  const subjects = ["தமிழ்", "ஆங்கிலம்", "கணிதம்", "அறிவியல்", "சமூகவியல்"];
  const exams = ["பருவம் 1", "பருவம் 2", "பருவம் 3"];

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
            examAcc[exam] = { fa: "", sa: "", total: "" };
            return examAcc;
          }, {});
          return acc;
        }, {}),
        total: "",
        percentage: "",
      });
    }
    setStudents(newStudents);
  };

  const handleInputChange = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  const handleMarkChange = (index, subject, exam, field, value) => {
    const newStudents = [...students];
    newStudents[index].marks[subject][exam][field] = value;

    const fa = parseFloat(newStudents[index].marks[subject][exam].fa) || 0;
    const sa = parseFloat(newStudents[index].marks[subject][exam].sa) || 0;
    newStudents[index].marks[subject][exam].total = fa + sa;

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
          <table className="table-auto border-collapse w-full text-center text-sm">
            <thead>
              {/* Header Row 1 */}
              <tr className="bg-yellow-200">
                <th rowSpan="3" className="border px-4 py-2 w-32">
                  வரிசை எண்
                </th>
                <th rowSpan="3" className="border px-4 py-2 w-48">
                  மாணவர் பெயர்
                </th>

                {subjects.map((subject) => (
                  <th
                    key={subject}
                    colSpan={exams.length * 3}
                    className="border px-4 py-2"
                  >
                    {subject}
                  </th>
                ))}

                <th rowSpan="3" className="border px-4 py-2 w-20">
                  மொத்தம்
                </th>
                <th rowSpan="3" className="border px-4 py-2 w-24">
                  சதவீதம் (%)
                </th>
              </tr>

              {/* Header Row 2 */}
              <tr className="bg-yellow-100">
                {subjects.map((subject) =>
                  exams.map((exam) => (
                    <th
                      key={`${subject}-${exam}`}
                      colSpan="3"
                      className="border px-2 py-1"
                    >
                      {exam}
                    </th>
                  ))
                )}
              </tr>

              {/* Header Row 3 */}
              <tr className="bg-yellow-50">
                {subjects.map((subject) =>
                  exams.map((exam) => (
                    <React.Fragment key={`${subject}-${exam}-fa`}>
                      <th className="border px-2 py-1">FA (40)</th>
                      <th className="border px-2 py-1">SA (60)</th>
                      <th className="border px-2 py-1">மொத்தம்</th>
                    </React.Fragment>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-yellow-50">
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-16 p-1 border rounded text-center"
                      placeholder="எண்"
                      value={student.roll}
                      onChange={(e) =>
                        handleInputChange(index, "roll", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      placeholder="மாணவர் பெயர்"
                      value={student.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </td>

                  {subjects.map((subject) =>
                    exams.map((exam) => (
                      <React.Fragment key={`${subject}-${exam}`}>
                        <td className="border px-1 py-1">
                          <input
                            type="number"
                            max="40"
                            className="w-12 p-1 border rounded text-sm"
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
                        <td className="border px-1 py-1">
                          <input
                            type="number"
                            max="60"
                            className="w-12 p-1 border rounded text-sm"
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
                        <td className="border px-1 py-1 bg-gray-50">
                          {student.marks[subject][exam].total}
                        </td>
                      </React.Fragment>
                    ))
                  )}

                  <td className="border px-2 py-1 bg-gray-100">
                    {student.total || ""}
                  </td>
                  <td className="border px-2 py-1 bg-gray-100">
                    {student.percentage || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
