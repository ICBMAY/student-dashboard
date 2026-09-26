import { useState } from "react";
import { COURSES } from "../data/constants.js";

function StudentForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial ? initial.name : "");
  const [email, setEmail] = useState(initial ? initial.email : "");
  const [course, setCourse] = useState(initial ? initial.course : COURSES[0]);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Enter a name.";
    if (!email.trim()) e.email = "Enter an email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "That email doesn't look right.";
    return e;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave({ name: name.trim(), email: email.trim(), course });
    }
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>{initial ? "Edit student" : "Add student"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Abebe Kebede"
            />
            {errors.name && <div className="err">{errors.name}</div>}
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
            {errors.email && <div className="err">{errors.email}</div>}
          </div>
          <div className="field">
            <label>Course</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
