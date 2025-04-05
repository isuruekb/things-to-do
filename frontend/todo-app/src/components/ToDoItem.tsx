import React, { useState } from 'react';
import axios from 'axios';

interface ToDoTask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface ToDoItemProps {
  task: ToDoTask;
  handleDelete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, handleDelete }) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const toggleCompletion = () => {
        setIsCompleted(!isCompleted);
        axios.put(`https://localhost:7000/api/TodoTasks/EditToDoTask/${task.id}`, { 
            ...task,
            isCompleted: !isCompleted
        })
        .catch((error) => console.error('Error updating task:', error));
    };

    return (
        <li className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-all">
            <span
                className={`text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}
            >
                {task.title}
            </span>
            <div className="space-x-2">
                <button
                    onClick={toggleCompletion}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </li>

    );
};

export default ToDoItem;
