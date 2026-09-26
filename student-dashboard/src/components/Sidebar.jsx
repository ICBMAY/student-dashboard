import Navbar from "./Navbar.jsx";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "students", label: "Students" },
  { id: "courses", label: "Courses" },
];

function Sidebar({ page, setPage }) {
  return (
    <div className="sidebar">
      <Navbar />
      <div className="nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? "active" : ""}
            onClick={() => setPage(item.id)}
          >
            <span className="dot"></span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="sidebar-foot">
        Student
        <br />
        LMS
      </div>
    </div>
  );
}

export default Sidebar;
