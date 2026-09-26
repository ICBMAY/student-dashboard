import { useMemo, useState } from "react";
import { COURSES } from "../data/constants.js";
import StudentForm from "../components/StudentForm.jsx";

function Students({ students, setStudents }) {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery = (s.name + s.email).toLowerCase().includes(query.toLowerCase());
      const matchesCourse = courseFilter === "All" || s.course === courseFilter;
      return matchesQuery && matchesCourse;
    });
  }, [students, query, courseFilter]);

  function addStudent(data) {
    setStudents((prev) => [...prev, { id: Date.now(), ...data }]);
    setShowForm(false);
  }

  function updateStudent(data) {
    setStudents((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)));
    setEditing(null);
  }

  function deleteStudent(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="panel">
      <h2>All students ({students.length})</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="All">All courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add student
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No students match this search. Try a different name or course.</div>
      ) : (
        <div className="overflow-x">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="name-cell">{s.name}</td>
                  <td style={{ color: "var(--ink-soft)" }}>{s.email}</td>
                  <td>
                    <span className="badge">{s.course}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-ghost btn-small" onClick={() => setEditing(s)}>
                        Edit
                      </button>
                      <button className="btn-danger" onClick={() => deleteStudent(s.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && <StudentForm onCancel={() => setShowForm(false)} onSave={addStudent} />}
      {editing && (
        <StudentForm initial={editing} onCancel={() => setEditing(null)} onSave={updateStudent} />
      )}
    </div>
  );
}

export default Students;
