

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ fixed import
import * as XLSX from "xlsx";

export default function Grade6and7MarkRegister() {
  const subjects = ["Tamil", "English", "Maths", "Science", "Social"];
  const terms = ["Q", "H", "A"];

  const getGrade = (score) => {
    const m = Number(score);
    if (m >= 91) return "A1";
    if (m >= 81) return "A2";
    if (m >= 71) return "B1";
    if (m >= 61) return "B2";
    if (m >= 51) return "C1";
    if (m >= 41) return "C2";
    if (m >= 33) return "D";
    if (m >= 21) return "E1";
    if (m >= 1) return "E2";
    return "";
  };

  const createEmptyStudent = () => ({
    admissionNo: "",
    name: "",
    examNo: "",
    marks: terms.reduce((acc, term) => {
      acc[term] = subjects.reduce((subAcc, sub) => {
        subAcc[sub] = "";
        return subAcc;
      }, {});
      return acc;
    }, {}),
    totals: { Q: 0, H: 0, A: 0 },
    percentages: { Q: 0, H: 0, A: 0 },
  });

  const [studentCount, setStudentCount] = useState(1);
  const [students, setStudents] = useState([createEmptyStudent()]);

  const handleStudentCountChange = (value) => {
    const count = Math.max(1, parseInt(value) || 1);
    setStudentCount(count);
    const newStudents = [...students];
    while (newStudents.length < count) newStudents.push(createEmptyStudent());
    while (newStudents.length > count) newStudents.pop();
    setStudents(newStudents);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleMarkChange = (index, term, subject, value) => {
    const updated = [...students];
    const student = updated[index];
    const updatedMarks = { ...student.marks };
    updatedMarks[term][subject] = value;

    const total = subjects.reduce(
      (sum, sub) => sum + (parseFloat(updatedMarks[term][sub]) || 0),
      0
    );
    const percent = ((total / (subjects.length * 100)) * 100).toFixed(2);

    student.marks = updatedMarks;
    student.totals[term] = total;
    student.percentages[term] = percent;
    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("All Student Data:", students);
    alert(`${students.length} students marks saved!`);
  };

  // Excel Download
  const downloadExcel = () => {
    const data = [];

    students.forEach((s) => {
      terms.forEach((term) => {
        const row = {
          "Admission No": s.admissionNo,
          "Student Name": s.name,
          "Exam No": s.examNo,
          Term: term,
        };
        subjects.forEach((sub) => {
          row[`${sub} Marks`] = s.marks[term][sub] || 0;
        });
        row["Total"] = s.totals[term];
        row["Percentage"] = s.percentages[term];
        row["Grade"] = getGrade(s.percentages[term]);
        data.push(row);
      });
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Marks");
    XLSX.writeFile(wb, "Grade6and7Marks.xlsx");
  };

  // PDF Download - ✅ fixed
  const downloadPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.setFontSize(10);

    students.forEach((s, index) => {
      // Student Header
      doc.text(
        `Student: ${s.name} | Admission No: ${s.admissionNo} | Exam No: ${s.examNo}`,
        40,
        30
      );

      const headers = [["Term", ...subjects, "Total", "Percentage", "Grade"]];
      const rows = terms.map((term) => [
        term,
        ...subjects.map((sub) => Number(s.marks[term][sub]) || 0),
        s.totals[term],
        s.percentages[term],
        getGrade(s.percentages[term]),
      ]);

      autoTable(doc, {
        head: headers,
        body: rows,
        startY: 50,
        styles: { fontSize: 8, halign: "center" },
        headStyles: { fillColor: [255, 206, 84] },
        theme: "grid",
      });

      if (index < students.length - 1) doc.addPage();
    });

    doc.save("Grade6and7Marks.pdf");
  };

  return (
    <div className="min-h-screen w-full bg-yellow-50 p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        6 & 7 Grade - Marks Register (Q, H, A)
      </h2>

      <div className="flex justify-center items-center mb-6 gap-3">
        <label className="font-medium text-gray-700 text-lg">
          Number of Students:
        </label>
        <input
          type="number"
          min="1"
          value={studentCount}
          onChange={(e) => handleStudentCountChange(e.target.value)}
          className="border p-2 w-24 text-center rounded-md"
        />
      </div>

      <div className="flex gap-2 justify-end mb-4">
        <button
          type="button"
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Excel
        </button>
        <button
          type="button"
          onClick={downloadPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Download PDF
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {students.map((student, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Student {index + 1}
            </h3>

            <div className="flex flex-wrap gap-3 justify-between mb-4">
              <input
                type="text"
                placeholder="Admission No"
                value={student.admissionNo}
                onChange={(e) =>
                  handleInputChange(index, "admissionNo", e.target.value)
                }
                className="border p-2 w-32 text-center rounded"
              />
              <input
                type="text"
                placeholder="Student Name"
                value={student.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="border p-2 flex-1 text-center rounded"
              />
              <input
                type="text"
                placeholder="Exam No"
                value={student.examNo}
                onChange={(e) =>
                  handleInputChange(index, "examNo", e.target.value)
                }
                className="border p-2 w-32 text-center rounded"
              />
            </div>

            {terms.map((term) => (
              <div
                key={term}
                className="border rounded-md p-4 bg-gray-50 mb-4"
              >
                <h4 className="text-md font-semibold mb-3 text-gray-700">
                  {term === "Q"
                    ? "Quarterly"
                    : term === "H"
                    ? "Half-Yearly"
                    : "Annual"}
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-center text-sm">
                    <thead className="bg-yellow-100">
                      <tr>
                        {["Subject", ...subjects, "Total", "Percentage", "Grade"].map(
                          (h) => (
                            <th key={h} className="border p-2">
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">{term}</td>
                        {subjects.map((sub) => (
                          <td key={sub} className="border p-2">
                            <input
                              type="number"
                              max="100"
                              value={student.marks[term][sub]}
                              onChange={(e) =>
                                handleMarkChange(index, term, sub, e.target.value)
                              }
                              className="w-16 p-1 text-center border rounded"
                            />
                          </td>
                        ))}
                        <td className="border p-2 font-semibold">
                          {student.totals[term]}
                        </td>
                        <td className="border p-2">{student.percentages[term]}%</td>
                        <td className="border p-2">
                          {getGrade(student.percentages[term])}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-yellow-700 text-white px-8 py-3 rounded-lg hover:bg-yellow-800 text-lg"
          >
            Save Marks
          </button>
        </div>
      </form>
    </div>
  );
}
