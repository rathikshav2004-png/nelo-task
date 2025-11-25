import TaskItem from "./TaskItem";

function TaskList({ tasks, setTasks, filter, search, setShowForm, setEditTask }) {
  // Filter tasks by completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all tasks
  });

  // Filter tasks by search keyword
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="grid gap-4 mt-4">
      {searchedTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        searchedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            setShowForm={setShowForm}
            setEditTask={setEditTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
