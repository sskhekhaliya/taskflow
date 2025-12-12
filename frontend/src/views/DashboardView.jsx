import React, { useContext, useEffect, useState } from "react";
import { LayoutDashboard, Search, Plus } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";
import TaskList from "../components/tasks/TaskList.jsx";

import { getTasks, createTask, updateTask, deleteTask } from "../api/index.js";

const DashboardView = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchTasks();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchTasks = async () => {
  setLoading(true);
  try {
    const res = await getTasks(); // axios -> res.data expected array
    const tasksFromServer = res.data || [];
    // normalize: ensure each task has `.id` (prefer existing id, else _id)
    const normalized = tasksFromServer.map(t => ({
      ...t,
      id: t.id || t._id || String(t._id)
    }));
    setTasks(normalized);
  } catch (err) {
    console.error("Failed to fetch tasks", err?.response?.data || err.message);
    alert("Failed to fetch tasks: " + (err?.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};

  const handleAddTask = async (e) => {
  e.preventDefault();
  const title = newTaskTitle.trim();
  if (!title) return;
  setIsAdding(true);
  try {
    const res = await createTask(title); // expects res.data as created task
    const created = res.data;
    const norm = { ...created, id: created.id || created._id || String(created._id) };
    setTasks((prev) => [...prev, norm]);
    setNewTaskTitle("");
  } catch (err) {
    console.error("Add task error:", err?.response?.data || err.message);
    alert("Error adding task: " + (err?.response?.data?.message || err.message));
  } finally {
    setIsAdding(false);
  }
};

  const toggleTask = async (id, currentStatus) => {
  try {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !currentStatus } : t)));
    await updateTask(id, !currentStatus);
  } catch (err) {
    console.error("Toggle task error:", err?.response?.data || err.message);
    // revert on error
    fetchTasks();
  }
};

const deleteTaskHandler = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await deleteTask(id);
  } catch (err) {
    console.error("Delete task error:", err?.response?.data || err.message);
    fetchTasks();
  }
};

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => (t.title || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <LayoutDashboard />
            <span>TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="font-medium">{user?.name}</span>
            </div>
            <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors p-2" title="Logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold text-blue-600">{tasks.filter((t) => !t.completed).length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600">{tasks.filter((t) => t.completed).length}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <form onSubmit={handleAddTask} className="w-full md:w-auto flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Add a new task."
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Button disabled={!newTaskTitle || isAdding} isLoading={isAdding}>
              <Plus size={18} /> <span className="hidden sm:inline">Add</span>
            </Button>
          </form>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-100"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Done</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          <TaskList tasks={filteredTasks} loading={loading} onToggle={toggleTask} onDelete={deleteTaskHandler} />
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
