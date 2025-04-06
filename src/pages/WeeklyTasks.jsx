import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WeeklyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        description: "",
        time: "",
        destination: "",
        members: "",
        teamId: ""
    });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("weeklyTasks")) || [];
        setTasks(storedTasks);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTasks = [...tasks, { ...formData, status: "Pending" }];
        setTasks(updatedTasks);
        localStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
        setFormData({ name: "", date: "", description: "", time: "", destination: "", members: "", teamId: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/weekly-in-center" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                    📅 Weekly In Center
                </Link>
                <Link to="/" className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition">
                    🏠 Home
                </Link>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">📝 Weekly Tasks</h1>

            {/* Task Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">➕ Add a New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Task Name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <textarea name="description" placeholder="Task Description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required></textarea>
                    <input type="text" name="time" placeholder="Time Duration" value={formData.time} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="members" placeholder="Team Members" value={formData.members} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="teamId" placeholder="Team ID" value={formData.teamId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                    <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition">
                        ✅ Add Task
                    </button>
                </form>
            </div>

            {/* Task List */}
            <div className="mt-10 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Added Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center">No tasks added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task, index) => (
                            <li key={index} className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                                    <p className="text-gray-500">{task.description}</p>
                                    <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${task.status === "Pending" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                                        {task.status}
                                    </span>
                                </div>
                                <p className="text-gray-600">📅 {task.date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WeeklyTasks;
