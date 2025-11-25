import { useState, useEffect } from "react";

function TaskForm({ setShowForm, tasks, setTasks, editTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required");
      return;
    }

    if (editTask) {
      const updated = tasks.map((t) =>
        t.id === editTask.id
          ? { ...t, title, priority, dueDate, description }
          : t
      );
      setTasks(updated);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title,
          priority,
          dueDate,
          description,
          completed: false,
        },
      ]);
    }

    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="border w-full p-2 mb-3 rounded"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="border w-full p-2 mb-3 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            className="border w-full p-2 mb-3 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <textarea
            className="border w-full p-2 mb-3 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button className="bg-blue-600 w-full text-white p-2 rounded">
            Save
          </button>
        </form>

        <button
          className="mt-3 w-full bg-gray-400 p-2 rounded"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
