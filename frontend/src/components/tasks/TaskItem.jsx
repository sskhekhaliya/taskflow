import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => (
  <li className="group border-b last:border-0 p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
    <button
      onClick={() => onToggle(task.id, task.completed)}
      className={`flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'}`}
    >
      {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
    </button>

    <div className="flex-1">
      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      <p className="text-xs text-gray-400">
        {new Date(task.createdAt || Date.now()).toLocaleDateString()}
      </p>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
      <button onClick={() => onDelete(task.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  </li>
);

export default TaskItem;
