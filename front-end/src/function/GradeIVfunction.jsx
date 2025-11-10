
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Grade calculation logic for Grade 4 & 5 (same as GradeIfunction)
const getFAGrade = (m) => {
  m = Number(m);
  if (m >= 37) return "A1";
  if (m >= 33) return "A2";
  if (m >= 29) return "B1";
  if (m >= 25) return "B2";
  if (m >= 21) return "C1";
  if (m >= 17) return "C2";
  if (m >= 13) return "D";
  if (m >= 9) return "E1";
  if (m >= 1) return "E2";
  return "";
};

const getSAGrade = (m) => {
  m = Number(m);
  if (m >= 55) return "A1";
  if (m >= 49) return "A2";
  if (m >= 43) return "B1";
  if (m >= 37) return "B2";
  if (m >= 31) return "C1";
  if (m >= 25) return "C2";
  if (m >= 19) return "D";
  if (m >= 13) return "E1";
  if (m >= 1) return "E2";
  return "";
};

const getTotalGrade = (m) => {
  m = Number(m);
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

export default function GradeIVFunction() {
  const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSaved, setDataSaved] = useState(false);

  // Subjects and exams for Grade 4 & 5
  const subjects = ["Tamil", "English", "Maths", "Science", "Social Science"];
  const exams = ["Term 1", "Term 2", "Term 3"];

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
          acc[subject].average = 0;
          acc[subject].averageGrade = "";
          return acc;
        }, {}),
        total: "",
        percentage: "",
      });
    }
    setStudents(newStudents);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleMarkChange = (studentIndex, subject, exam, field, value) => {
    const updated = [...students];
    // Initialize subject if missing
    if (!updated[studentIndex].marks[subject]) {
      updated[studentIndex].marks[subject] = {};
    }
    // Initialize exam if missing
    if (!updated[studentIndex].marks[subject][exam]) {
      updated[studentIndex].marks[subject][exam] = {
        fa: "",
        sa: "",
        total: "",
        faGrade: "",
        saGrade: "",
        totalGrade: "",
      };
    }
    updated[studentIndex].marks[subject][exam][field] = value;
    const fa = parseFloat(updated[studentIndex].marks[subject][exam].fa) || 0;
    const sa = parseFloat(updated[studentIndex].marks[subject][exam].sa) || 0;
    const total = fa + sa;
    updated[studentIndex].marks[subject][exam].total = total;
    updated[studentIndex].marks[subject][exam].faGrade = getFAGrade(fa);
    updated[studentIndex].marks[subject][exam].saGrade = getSAGrade(sa);
    updated[studentIndex].marks[subject][exam].totalGrade = getTotalGrade(total);
    // Ensure overall fields exist
    if (!updated[studentIndex].marks[subject].hasOwnProperty('overallTotal')) {
      updated[studentIndex].marks[subject].overallTotal = 0;
    }
    if (!updated[studentIndex].marks[subject].hasOwnProperty('average')) {
      updated[studentIndex].marks[subject].average = 0;
    }
    if (!updated[studentIndex].marks[subject].hasOwnProperty('averageGrade')) {
      updated[studentIndex].marks[subject].averageGrade = "";
    }
    const totalAll = exams.reduce(
      (sum, ex) => sum + (parseFloat((updated[studentIndex].marks[subject][ex] && updated[studentIndex].marks[subject][ex].total) || 0)),
      0
    );
    updated[studentIndex].marks[subject].overallTotal = totalAll;
    const avg = (totalAll / exams.length).toFixed(2);
    updated[studentIndex].marks[subject].average = avg;
    updated[studentIndex].marks[subject].averageGrade = getTotalGrade(avg);
    const overallTotal = subjects.reduce(
      (sum, sub) => sum + ((updated[studentIndex].marks[sub] && updated[studentIndex].marks[sub].overallTotal) || 0),
      0
    );
    updated[studentIndex].total = overallTotal;
    updated[studentIndex].percentage = ((overallTotal / (subjects.length * 300)) * 100).toFixed(2);
    setStudents(updated);
  };

  const fetchGrades = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/grades", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      if (data.length) {
        setStudents(data);
        setNumStudents(data.length);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/grades",
        { data: students },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataSaved(true);
      alert("Marks saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save marks.");
    }
  };

  // Download Excel
  const downloadExcel = () => {
    const data = [];
    students.forEach((s) => {
      subjects.forEach((sub) => {
        const row = { Roll: s.roll, Name: s.name, Subject: sub };
        exams.forEach((ex) => {
          const m = s.marks[sub]?.[ex] || {};
          row[`${ex} FA(40)`] = m.fa || 0;
          row[`${ex} FA(G)`] = m.faGrade || "";
          row[`${ex} SA(60)`] = m.sa || 0;
          row[`${ex} SA(G)`] = m.saGrade || "";
          row[`${ex} Total`] = m.total || 0;
          row[`${ex} Grade`] = m.totalGrade || "";
        });
        row["Subject Total"] = s.marks[sub]?.overallTotal || 0;
        row["Subject Avg"] = s.marks[sub]?.average || 0;
        row["Subject Grade"] = s.marks[sub]?.averageGrade || "";
        data.push(row);
      });
      data.push({
        Roll: s.roll,
        Name: s.name,
        Subject: "TOTAL",
        "Subject Total": s.total || 0,
        "Subject Avg": ((s.total / (subjects.length * 100)) * 100).toFixed(2),
        "Subject Grade": getTotalGrade(s.total / subjects.length)
      });
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Marks");
    XLSX.writeFile(wb, "StudentMarks_Full.xlsx");
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF("l", "pt", "a4"); // landscape
    doc.setFont("helvetica");
    doc.setFontSize(10);
    students.forEach((s, index) => {
      let y = 40;
      doc.text(`Student: ${s.name} | Roll: ${s.roll}`, 40, 30);
      const headers = [
        ["Subject", "Term", "FA(40)", "FA(G)", "SA(60)", "SA(G)", "Total", "Grade", "Subject Total", "Avg", "Subject Grade"]
      ];
      const rows = [];
      subjects.forEach((sub) => {
        exams.forEach((ex) => {
          const m = s.marks[sub]?.[ex] || {};
          rows.push([
            sub,
            ex,
            m.fa || 0,
            m.faGrade || "",
            m.sa || 0,
            m.saGrade || "",
            m.total || 0,
            m.totalGrade || "",
            ex === exams[exams.length-1] ? s.marks[sub]?.overallTotal || 0 : "",
            ex === exams[exams.length-1] ? s.marks[sub]?.average || 0 : "",
            ex === exams[exams.length-1] ? s.marks[sub]?.averageGrade || "" : ""
          ]);
        });
      });
      autoTable(doc, {
        head: headers,
        body: rows,
        startY: y,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [255, 206, 84] },
        theme: "grid",
      });
      y = doc.lastAutoTable.finalY + 10;
      doc.text(`Total Marks: ${s.total} | Overall %: ${s.percentage}%`, 40, y);
      if (index < students.length - 1) doc.addPage();
    });
    doc.save("StudentMarks_Full.pdf");
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 text-xs leading-tight relative">
      {dataSaved && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={downloadPDF}
            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
          >
            Download PDF
          </button>
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
          >
            Download Excel
          </button>
        </div>
      )}
      <h2 className="text-xl font-bold text-center mb-2 text-yellow-900">
        Grade 4 & 5 Student Marks Details
      </h2>
      <div className="mb-3 flex items-center gap-2">
        <label className="font-semibold text-sm">Number of Students:</label>
        <input
          type="number"
          className="w-20 p-1 border rounded text-center text-sm"
          min="0"
          value={numStudents}
          onChange={handleNumStudentsChange}
        />
      </div>
      {numStudents > 0 && (
        <form onSubmit={handleSubmit}>
          {students.map((student, sIndex) => (
            <div
              key={sIndex}
              className="mb-4 border border-yellow-300 rounded-lg p-2 shadow-sm bg-white"
            >
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Roll No."
                  className="border p-1 rounded w-20 text-xs"
                  value={student.roll}
                  onChange={(e) => handleInputChange(sIndex, "roll", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Student Name"
                  className="border p-1 rounded flex-1 text-xs"
                  value={student.name}
                  onChange={(e) => handleInputChange(sIndex, "name", e.target.value)}
                />
              </div>
              {subjects.map((subject) => (
                <div key={subject} className="mb-3">
                  <h3 className="font-bold text-yellow-800 text-sm mb-1">{subject}</h3>
                  <table className="w-full border-collapse text-center text-[11px]">
                    <thead>
                      <tr className="bg-yellow-100">
                        <th className="border p-1 w-16">Term</th>
                        <th className="border p-1">FA (40)</th>
                        <th className="border p-1">FA G</th>
                        <th className="border p-1">SA (60)</th>
                        <th className="border p-1">SA G</th>
                        <th className="border p-1">Total</th>
                        <th className="border p-1">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam) => {
                        const marksForSubject = student.marks[subject] || {};
                        const marksForExam = marksForSubject[exam] || {};
                        return (
                          <tr key={exam}>
                            <td className="border p-1">{exam}</td>
                            <td className="border p-1">
                              <input
                                type="number"
                                max="40"
                                className="w-12 p-0.5 border rounded text-center text-[10px]"
                                value={marksForExam.fa || ""}
                                onChange={(e) =>
                                  handleMarkChange(sIndex, subject, exam, "fa", e.target.value)
                                }
                              />
                            </td>
                            <td className="border p-1 bg-gray-50">
                              {marksForExam.faGrade || ""}
                            </td>
                            <td className="border p-1">
                              <input
                                type="number"
                                max="60"
                                className="w-12 p-0.5 border rounded text-center text-[10px]"
                                value={marksForExam.sa || ""}
                                onChange={(e) =>
                                  handleMarkChange(sIndex, subject, exam, "sa", e.target.value)
                                }
                              />
                            </td>
                            <td className="border p-1 bg-gray-50">
                              {marksForExam.saGrade || ""}
                            </td>
                            <td className="border p-1 bg-gray-50">
                              {marksForExam.total || ""}
                            </td>
                            <td className="border p-1 bg-gray-50">
                              {marksForExam.totalGrade || ""}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-yellow-50 font-semibold">
                        <td className="border p-1">Total</td>
                        <td colSpan="2" className="border p-1 text-left">
                          Total: {(student.marks[subject] && student.marks[subject].overallTotal) || 0}
                        </td>
                        <td colSpan="2" className="border p-1 text-left">
                          Average: {(student.marks[subject] && student.marks[subject].average) || 0}
                        </td>
                        <td colSpan="2" className="border p-1 text-left">
                          Grade: {(student.marks[subject] && student.marks[subject].averageGrade) || ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              <div className="font-semibold text-right text-xs text-yellow-900 mt-1">
                Grand Total: {student.total} | Percentage: {student.percentage}%
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-2 bg-yellow-700 text-white px-4 py-1 text-sm rounded hover:bg-yellow-800"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}