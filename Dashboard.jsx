import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => {
          setEditTask(null);
          setShowForm(true);
        }}
        className="px-4 py-2 bg-green-600 text-white rounded-lg mb-4"
      >
        Add Task
      </button>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          setShowForm={setShowForm}
          tasks={tasks}
          setTasks={setTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        search={search}
        setShowForm={setShowForm}
        setEditTask={setEditTask}
      />
    </div>
  );
}

export default Dashboard;


