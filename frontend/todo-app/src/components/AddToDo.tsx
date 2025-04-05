import React, { useState } from 'react';
import axios from 'axios';

interface ToDoTask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface AddToDoProps {
  setTasks: React.Dispatch<React.SetStateAction<ToDoTask[]>>;
}

const AddToDo: React.FC<AddToDoProps> = ({ setTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: ToDoTask = {
            title,
            description,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            id: 0
        };

        axios.post('https://localhost:7000/api/TodoTasks/CreateToDoTask', newTask)
            .then((response) => {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setTitle('');
                setDescription('');
            })
            .catch((error) => console.error('Error adding task:', error));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 space-y-4"
        >
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Add Task
            </button>
        </form>

    );
};

export default AddToDo;
