
// import React, { useState } from "react";

// export default function GradeFunction() {
//   const [numStudents, setNumStudents] = useState(0);
//   const [students, setStudents] = useState([]);

//   const subjects = ["தமிழ்", "ஆங்கிலம்", "கணிதம்", "அறிவியல்", "சமூகவியல்"];
//   const exams = ["பருவம் 1", "பருவம் 2", "பருவம் 3"];

//   // 🔹 Grade calculation for FA (out of 40)
//   const getFAGrade = (m) => {
//     m = Number(m);
//     if (m >= 37) return "A1";
//     if (m >= 33) return "A2";
//     if (m >= 29) return "B1";
//     if (m >= 25) return "B2";
//     if (m >= 21) return "C1";
//     if (m >= 17) return "C2";
//     if (m >= 13) return "D";
//     if (m >= 9) return "E1";
//     if (m >= 1) return "E2";
//     return "";
//   };

//   // 🔹 Grade calculation for SA (out of 60)
//   const getSAGrade = (m) => {
//     m = Number(m);
//     if (m >= 55) return "A1";
//     if (m >= 49) return "A2";
//     if (m >= 43) return "B1";
//     if (m >= 37) return "B2";
//     if (m >= 31) return "C1";
//     if (m >= 25) return "C2";
//     if (m >= 19) return "D";
//     if (m >= 13) return "E1";
//     if (m >= 1) return "E2";
//     return "";
//   };

//   const getTotalGrade = (m) => {
//     m = Number(m);
//     if (m >= 91) return "A1";
//     if (m >= 81) return "A2";
//     if (m >= 71) return "B1";
//     if (m >= 61) return "B2";
//     if (m >= 51) return "C1";
//     if (m >= 41) return "C2";
//     if (m >= 33) return "D";
//     if (m >= 21) return "E1";
//     if (m >= 1) return "E2";
//     return "";
//   };

//   // 🔹 Initialize Students
//   const handleNumStudentsChange = (e) => {
//     const value = parseInt(e.target.value) || 0;
//     setNumStudents(value);

//     const newStudents = [];
//     for (let i = 0; i < value; i++) {
//       newStudents.push({
//         name: "",
//         roll: "",
//         marks: subjects.reduce((acc, subject) => {
//           acc[subject] = exams.reduce((examAcc, exam) => {
//             examAcc[exam] = {
//               fa: "",
//               sa: "",
//               total: "",
//               faGrade: "",
//               saGrade: "",
//               totalGrade: "",
//             };
//             return examAcc;
//           }, {});
//           acc[subject].overallTotal = 0;
//           acc[subject].average = 0;
//           return acc;
//         }, {}),
//         total: "",
//         percentage: "",
//       });
//     }
//     setStudents(newStudents);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updated = [...students];
//     updated[index][field] = value;
//     setStudents(updated);
//   };

//   const handleMarkChange = (studentIndex, subject, exam, field, value) => {
//     const updated = [...students];
//     updated[studentIndex].marks[subject][exam][field] = value;

//     const fa = parseFloat(updated[studentIndex].marks[subject][exam].fa) || 0;
//     const sa = parseFloat(updated[studentIndex].marks[subject][exam].sa) || 0;
//     const total = fa + sa;

//     updated[studentIndex].marks[subject][exam].total = total;
//     updated[studentIndex].marks[subject][exam].faGrade = getFAGrade(fa);
//     updated[studentIndex].marks[subject][exam].saGrade = getSAGrade(sa);
//     updated[studentIndex].marks[subject][exam].totalGrade = getTotalGrade(total);

//     // Calculate subject totals
//     const totalAll = exams.reduce(
//       (sum, ex) => sum + (parseFloat(updated[studentIndex].marks[subject][ex].total) || 0),
//       0
//     );
//     updated[studentIndex].marks[subject].overallTotal = totalAll;
//     updated[studentIndex].marks[subject].average = (totalAll / exams.length).toFixed(2);

//     // Calculate overall
//     const overallTotal = subjects.reduce(
//       (sum, sub) => sum + (updated[studentIndex].marks[sub].overallTotal || 0),
//       0
//     );
//     updated[studentIndex].total = overallTotal;
//     updated[studentIndex].percentage = ((overallTotal / (subjects.length * 300)) * 100).toFixed(2);

//     setStudents(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Saved Data:", students);
//     alert("Marks saved successfully!");
//   };

//   return (
//     <div className="p-4 text-xs leading-tight">
//       <h2 className="text-xl font-bold text-center mb-2 text-yellow-900">
//         மாணவர்களின் மதிப்பெண் விவரம்
//       </h2>

//       <div className="mb-3 flex items-center gap-2">
//         <label className="font-semibold text-sm">மாணவர்களின் எண்ணிக்கை:</label>
//         <input
//           type="number"
//           className="w-20 p-1 border rounded text-center text-sm"
//           min="0"
//           value={numStudents}
//           onChange={handleNumStudentsChange}
//         />
//       </div>

//       {numStudents > 0 && (
//         <form onSubmit={handleSubmit}>
//           {students.map((student, sIndex) => (
//             <div
//               key={sIndex}
//               className="mb-4 border border-yellow-300 rounded-lg p-2 shadow-sm bg-white"
//             >
//               <div className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="வரிசை எண்"
//                   className="border p-1 rounded w-20 text-xs"
//                   value={student.roll}
//                   onChange={(e) => handleInputChange(sIndex, "roll", e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="மாணவர் பெயர்"
//                   className="border p-1 rounded flex-1 text-xs"
//                   value={student.name}
//                   onChange={(e) => handleInputChange(sIndex, "name", e.target.value)}
//                 />
//               </div>

//               {/* SUBJECT TABLES */}
//               {subjects.map((subject) => (
//                 <div key={subject} className="mb-3">
//                   <h3 className="font-bold text-yellow-800 text-sm mb-1">{subject}</h3>
//                   <table className="w-full border-collapse text-center text-[11px]">
//                     <thead>
//                       <tr className="bg-yellow-100">
//                         <th className="border p-1 w-16">பருவம்</th>
//                         <th className="border p-1">FA (40)</th>
//                         <th className="border p-1">FA G</th>
//                         <th className="border p-1">SA (60)</th>
//                         <th className="border p-1">SA G</th>
//                         <th className="border p-1">மொத்தம்</th>
//                         <th className="border p-1">Grade</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {exams.map((exam) => (
//                         <tr key={exam}>
//                           <td className="border p-1">{exam}</td>
//                           <td className="border p-1">
//                             <input
//                               type="number"
//                               max="40"
//                               className="w-12 p-0.5 border rounded text-center text-[10px]"
//                               value={student.marks[subject][exam].fa}
//                               onChange={(e) =>
//                                 handleMarkChange(sIndex, subject, exam, "fa", e.target.value)
//                               }
//                             />
//                           </td>
//                           <td className="border p-1 bg-gray-50">
//                             {student.marks[subject][exam].faGrade}
//                           </td>
//                           <td className="border p-1">
//                             <input
//                               type="number"
//                               max="60"
//                               className="w-12 p-0.5 border rounded text-center text-[10px]"
//                               value={student.marks[subject][exam].sa}
//                               onChange={(e) =>
//                                 handleMarkChange(sIndex, subject, exam, "sa", e.target.value)
//                               }
//                             />
//                           </td>
//                           <td className="border p-1 bg-gray-50">
//                             {student.marks[subject][exam].saGrade}
//                           </td>
//                           <td className="border p-1 bg-gray-50">
//                             {student.marks[subject][exam].total}
//                           </td>
//                           <td className="border p-1 bg-gray-50">
//                             {student.marks[subject][exam].totalGrade}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-yellow-50 font-semibold">
//                         <td className="border p-1">மொத்தம்</td>
//                         <td colSpan="3" className="border p-1 text-left">
//                           மொத்தம்: {student.marks[subject].overallTotal}
//                         </td>
//                         <td colSpan="3" className="border p-1 text-left">
//                           சராசரி: {student.marks[subject].average}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               ))}

//               <div className="font-semibold text-right text-xs text-yellow-900 mt-1">
//                 மொத்த மதிப்பெண்: {student.total} | சதவீதம்: {student.percentage}%
//               </div>
//             </div>
//           ))}

//           <button
//             type="submit"
//             className="mt-2 bg-yellow-700 text-white px-4 py-1 text-sm rounded hover:bg-yellow-800"
//           >
//             சேமிக்க
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }





















import React, { useState } from "react";

export default function GradeFunction() {
  const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);

  const subjects = ["தமிழ்", "ஆங்கிலம்", "கணிதம்", "அறிவியல்", "சமூகவியல்"];
  const exams = ["பருவம் 1", "பருவம் 2", "பருவம் 3"];

  // 🔹 Grade calculation for FA (out of 40)
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

  // 🔹 Grade calculation for SA (out of 60)
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

  // 🔹 Grade calculation for Total / Average (out of 100)
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
    updated[studentIndex].marks[subject][exam][field] = value;

    const fa = parseFloat(updated[studentIndex].marks[subject][exam].fa) || 0;
    const sa = parseFloat(updated[studentIndex].marks[subject][exam].sa) || 0;
    const total = fa + sa;

    updated[studentIndex].marks[subject][exam].total = total;
    updated[studentIndex].marks[subject][exam].faGrade = getFAGrade(fa);
    updated[studentIndex].marks[subject][exam].saGrade = getSAGrade(sa);
    updated[studentIndex].marks[subject][exam].totalGrade = getTotalGrade(total);

    // Calculate subject totals
    const totalAll = exams.reduce(
      (sum, ex) => sum + (parseFloat(updated[studentIndex].marks[subject][ex].total) || 0),
      0
    );
    updated[studentIndex].marks[subject].overallTotal = totalAll;

    // Average and Average Grade
    const avg = (totalAll / exams.length).toFixed(2);
    updated[studentIndex].marks[subject].average = avg;
    updated[studentIndex].marks[subject].averageGrade = getTotalGrade(avg);

    // Calculate overall
    const overallTotal = subjects.reduce(
      (sum, sub) => sum + (updated[studentIndex].marks[sub].overallTotal || 0),
      0
    );
    updated[studentIndex].total = overallTotal;
    updated[studentIndex].percentage = ((overallTotal / (subjects.length * 300)) * 100).toFixed(2);

    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", students);
    alert("Marks saved successfully!");
  };

  return (
    <div className="p-4 text-xs leading-tight">
      <h2 className="text-xl font-bold text-center mb-2 text-yellow-900">
        மாணவர்களின் மதிப்பெண் விவரம்
      </h2>

      <div className="mb-3 flex items-center gap-2">
        <label className="font-semibold text-sm">மாணவர்களின் எண்ணிக்கை:</label>
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
                  placeholder="வரிசை எண்"
                  className="border p-1 rounded w-20 text-xs"
                  value={student.roll}
                  onChange={(e) => handleInputChange(sIndex, "roll", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="மாணவர் பெயர்"
                  className="border p-1 rounded flex-1 text-xs"
                  value={student.name}
                  onChange={(e) => handleInputChange(sIndex, "name", e.target.value)}
                />
              </div>

              {/* SUBJECT TABLES */}
              {subjects.map((subject) => (
                <div key={subject} className="mb-3">
                  <h3 className="font-bold text-yellow-800 text-sm mb-1">{subject}</h3>
                  <table className="w-full border-collapse text-center text-[11px]">
                    <thead>
                      <tr className="bg-yellow-100">
                        <th className="border p-1 w-16">பருவம்</th>
                        <th className="border p-1">FA (40)</th>
                        <th className="border p-1">FA G</th>
                        <th className="border p-1">SA (60)</th>
                        <th className="border p-1">SA G</th>
                        <th className="border p-1">மொத்தம்</th>
                        <th className="border p-1">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam) => (
                        <tr key={exam}>
                          <td className="border p-1">{exam}</td>
                          <td className="border p-1">
                            <input
                              type="number"
                              max="40"
                              className="w-12 p-0.5 border rounded text-center text-[10px]"
                              value={student.marks[subject][exam].fa}
                              onChange={(e) =>
                                handleMarkChange(sIndex, subject, exam, "fa", e.target.value)
                              }
                            />
                          </td>
                          <td className="border p-1 bg-gray-50">
                            {student.marks[subject][exam].faGrade}
                          </td>
                          <td className="border p-1">
                            <input
                              type="number"
                              max="60"
                              className="w-12 p-0.5 border rounded text-center text-[10px]"
                              value={student.marks[subject][exam].sa}
                              onChange={(e) =>
                                handleMarkChange(sIndex, subject, exam, "sa", e.target.value)
                              }
                            />
                          </td>
                          <td className="border p-1 bg-gray-50">
                            {student.marks[subject][exam].saGrade}
                          </td>
                          <td className="border p-1 bg-gray-50">
                            {student.marks[subject][exam].total}
                          </td>
                          <td className="border p-1 bg-gray-50">
                            {student.marks[subject][exam].totalGrade}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-yellow-50 font-semibold">
                        <td className="border p-1">மொத்தம்</td>
                        <td colSpan="2" className="border p-1 text-left">
                          மொத்தம்: {student.marks[subject].overallTotal}
                        </td>
                        <td colSpan="2" className="border p-1 text-left">
                          சராசரி: {student.marks[subject].average}
                        </td>
                        <td colSpan="2" className="border p-1 text-left">
                          Grade: {student.marks[subject].averageGrade}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}

              <div className="font-semibold text-right text-xs text-yellow-900 mt-1">
                மொத்த மதிப்பெண்: {student.total} | சதவீதம்: {student.percentage}%
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 bg-yellow-700 text-white px-4 py-1 text-sm rounded hover:bg-yellow-800"
          >
            சேமிக்க
          </button>
        </form>
      )}
    </div>
  );
}
