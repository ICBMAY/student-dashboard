import { useMemo } from "react";
import { COURSES } from "../data/constants.js";

function Dashboard({ students, setPage }) {
  const totalStudents = students.length;
  const totalCourses = COURSES.length;

  const popular = useMemo(() => {
    const counts = {};
    students.forEach((s) => {
      counts[s.course] = (counts[s.course] || 0) + 1;
    });
    let best = null;
    Object.entries(counts).forEach(([course, count]) => {
      if (!best || count > best[1]) best = [course, count];
    });
    return best;
  }, [students]);

  const recent = [...students].slice(-5).reverse();

  return (
    <div>
      <div className="stat-row">
        <div className="stat">
          <div className="n">{totalStudents}</div>
          <div className="l">Total students</div>
        </div>
        <div className="stat">
          <div className="n">{totalCourses}</div>
          <div className="l">Active courses</div>
        </div>
        <div className="stat">
          <div className="n">{popular ? popular[1] : 0}</div>
          <div className="l">{popular ? popular[0] : "No enrollments yet"}</div>
        </div>
      </div>

      <div className="panel">
        <h2>Recently added</h2>
        <div className="overflow-x">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((s) => (
                <tr key={s.id}>
                  <td className="name-cell">{s.name}</td>
                  <td>
                    <span className="badge">{s.course}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-ghost btn-small" onClick={() => setPage("students")}>
            Go to all students →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
