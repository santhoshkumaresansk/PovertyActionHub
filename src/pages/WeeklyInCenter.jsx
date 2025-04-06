// WeeklyInCenter.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WeeklyInCenter = () => {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState({});

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("weeklyTasks")) || [];
        setTasks(storedTasks);
        const storedProgress = JSON.parse(localStorage.getItem("taskProgress")) || {};
        setProgress(storedProgress);
    }, []);

    const updateStatus = (index, newStatus) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between mb-4">
                <Link to="/weekly-tasks" className="bg-blue-500 text-white px-4 py-2 rounded">Back to Tasks</Link>
                <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded">Home</Link>
            </div>

            <h1 className="text-3xl font-semibold text-center mb-6">Weekly Task Progress</h1>

            <div className="max-w-3xl mx-auto">
                {tasks.map((task, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow-md mb-4">
                        <h2 className="text-xl font-bold">{task.name}</h2>
                        <p><strong>Date:</strong> {task.date}</p>
                        <p><strong>Members:</strong> {task.members}</p>
                        <p><strong>Destination:</strong> {task.destination}</p>
                        <p><strong>Status:</strong> {task.status}</p>

                        <div className="mt-2">
                            <button onClick={() => updateStatus(index, "In Progress")} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">In Progress</button>
                            <button onClick={() => updateStatus(index, "Completed")} className="bg-green-500 text-white px-3 py-1 rounded">Completed</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyInCenter;
