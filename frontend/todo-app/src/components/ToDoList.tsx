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
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  
    useEffect(() => {
        handleGetList();
      }, [showCompletedTasks]);
      
    const handleGetList = () => {
        const url = showCompletedTasks
        ? 'https://localhost:7000/api/TodoTasks/GetCompletedToDoTasks'
        : 'https://localhost:7000/api/TodoTasks/GetNotCompletedToDoTasks';
    
      axios
        .get(url)
        .then((response) => {
          setTasks(response.data); // Since the API already filters tasks based on completion, no need for extra filtering here
        })
        .catch((error) => console.error('Error fetching tasks:', error));
    };
  
    const handleDelete = (id: number) => {
      axios
        .delete(`https://localhost:7000/api/TodoTasks/RemoveToDoTask/${id}`)
        .then(() => {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update state to remove the task immediately
          handleGetList();
        
        })
        .catch((error) => console.error('Error deleting task:', error));

    };
  
    const handleCompletionToggle = (task: ToDoTask) => {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      axios
        .put(`https://localhost:7000/api/TodoTasks/EditToDoTask/${task.id}`, updatedTask)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
          ); // Update the task in the list after completion toggle
          handleGetList();

        })
        .catch((error) => console.error('Error updating task:', error));

    };
  
    const filteredTasks = showCompletedTasks
      ? tasks.filter((task) => task.isCompleted)
      : tasks.filter((task) => !task.isCompleted); // Filter tasks based on the current tab state
  
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-6xl p-6 gap-6">
          {/* Left Side - Add Task */}
          <div className="md:w-1/2 flex flex-col justify-between bg-gray-50 p-6 rounded-lg shadow-inner border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>
            <AddToDo setTasks={setTasks} />
          </div>
  
          {/* Right Side - Task List */}
          <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-inner border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Tasks</h2>
  
            {/* Tabs for Task Views */}
            <div className="flex mb-4 space-x-4">
              <button
                onClick={() => setShowCompletedTasks(false)} // Not Completed Tasks tab
                className={`${
                  !showCompletedTasks
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } p-2 rounded-md transition-colors`}
              >
                Not Completed Tasks
              </button>
              <button
                onClick={() => setShowCompletedTasks(true)} // Completed Tasks tab
                className={`${
                  showCompletedTasks
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } p-2 rounded-md transition-colors`}
              >
                Completed Tasks
              </button>
            </div>
  
            {/* Render Filtered Tasks */}
            <ul className="space-y-4">
              {filteredTasks.slice(0, 5).map((task) => (
                <ToDoItem
                  key={task.id}
                  task={task}
                  handleDelete={handleDelete}
                  handleCompletionToggle={handleCompletionToggle} // Pass the toggle function here
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
export default ToDoList;
