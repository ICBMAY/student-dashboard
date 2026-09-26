import { useMemo } from "react";
import { COURSES } from "../data/constants.js";

function Courses({ students }) {
  const counts = useMemo(() => {
    const map = {};
    COURSES.forEach((c) => (map[c] = 0));
    students.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + 1;
    });
    return map;
  }, [students]);

  return (
    <div className="panel">
      <h2>Courses</h2>
      <div className="course-grid">
        {COURSES.map((c) => (
          <div className="course-card" key={c}>
            <div className="cname">{c}</div>
            <div className="ccount">
              {counts[c]} student{counts[c] === 1 ? "" : "s"} enrolled
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
