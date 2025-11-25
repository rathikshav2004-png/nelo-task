function TaskItem({ task, deleteTask, toggleComplete, setShowForm, setEditTask }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-start">
      
      <div>
        <h2 className={`text-xl font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm mt-1">
          <span className={`px-2 py-1 rounded text-white ${
            task.completed ? "bg-green-600" : "bg-yellow-600"
          }`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setEditTask(task);
            setShowForm(true);
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded shadow"
        >
          Edit
        </button>

        <button
          onClick={() => toggleComplete(task.id)}
          className="px-3 py-1 bg-green-600 text-white rounded shadow"
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 bg-red-600 text-white rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
