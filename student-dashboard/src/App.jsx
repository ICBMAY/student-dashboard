import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Courses from "./pages/Courses.jsx";
import { initialStudents } from "./data/constants.js";

const TITLES = {
  dashboard: ["Dashboard", "An overview of your cohort"],
  students: ["Students", "Add, search, and manage student records"],
  courses: ["Courses", "Enrollment by course"],
};

function App() {
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState(initialStudents);

  const [title, subtitle] = TITLES[page];

  return (
    <div className="shell">
      <Sidebar page={page} setPage={setPage} />
      <div className="main">
        <div className="topline">
          <h1>{title}</h1>
          <span className="meta">{subtitle}</span>
        </div>

        {page === "dashboard" && <Dashboard students={students} setPage={setPage} />}
        {page === "students" && <Students students={students} setStudents={setStudents} />}
        {page === "courses" && <Courses students={students} />}
      </div>
    </div>
  );
}

export default App;
