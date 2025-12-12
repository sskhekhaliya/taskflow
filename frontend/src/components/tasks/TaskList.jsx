import React from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, loading, onToggle, onDelete }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-blue-500">⏳</div>
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="bg-gray-50 p-4 rounded-full mb-4">✔️</div>
        <p>No tasks found.</p>
      </div>
    );
  }
  return (
    <ul>
      {tasks.map(t => (
        <TaskItem key={t.id || t._id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
