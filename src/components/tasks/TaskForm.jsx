import { useState } from "react";
import "./TaskForm.css";

// Receives `subjects` as a prop rather than reading localStorage itself —
// TasksPage already owns that data (it needs it too, for displaying
// subject badges), so we pass it down instead of reading it twice.
function TaskForm({ subjects, onAddTask }) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return;

    onAddTask({
      title: trimmedTitle,
      subjectId: subjectId || null, // "" from the empty <option> becomes null, not a dangling empty string
      dueDate: dueDate || null,
    });

    setTitle("");
    setSubjectId("");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title (e.g. Finish DSA assignment)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
        <option value="">No subject</option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;