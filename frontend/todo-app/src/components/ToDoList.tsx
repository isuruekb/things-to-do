import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import AddToDo from './AddToDo';

interface ToDoTask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

const ToDoList: React.FC = () => {
    const [tasks, setTasks] = useState<ToDoTask[]>([]);

    // Fetch tasks from the backend API
    useEffect(() => {
        axios.get('https://localhost:7000/api/TodoTasks/GetToDoTasks')
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`https://localhost:7000/api/TodoTasks/RemoveToDoTask/${id}`)
            .then(() => {
                // Remove deleted task from state
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>
            <AddToDo setTasks={setTasks} />
            <ul className="space-y-4">
                {tasks.map(task => (
                    <ToDoItem key={task.id} task={task} handleDelete={handleDelete} />
                ))}
            </ul>
        </div>

    );
};

export default ToDoList;
