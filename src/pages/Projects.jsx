import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiUsers, FiMapPin, FiAward, FiTrash2, FiPlus, FiHome, FiArrowLeft } from "react-icons/fi";

const ProjectPage = () => {
    const [tasks, setTasks] = useState([]);
    const [points, setPoints] = useState({});
    const [formData, setFormData] = useState({
        projectName: "",
        date: "",
        problem: "",
        timeEstimation: "",
        destination: "",
        members: "",
        teamId: ""
    });
    const [activeTab, setActiveTab] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Load data from localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const storedPoints = JSON.parse(localStorage.getItem("points")) || {};
        setTasks(storedTasks);
        setPoints(storedPoints);
    }, []);

    // Save data to localStorage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("points", JSON.stringify(points));
    }, [tasks, points]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.teamId.trim()) return;

        const newTask = {
            ...formData,
            id: Date.now(),
            status: "pending"
        };

        setTasks([...tasks, newTask]);
        setPoints(prev => ({ ...prev, [formData.teamId]: (prev[formData.teamId] || 0) + 50 }));

        setFormData({
            projectName: "",
            date: "",
            problem: "",
            timeEstimation: "",
            destination: "",
            members: "",
            teamId: ""
        });
        setIsFormOpen(false);
    };

    const handleDelete = (id, teamId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);

            setPoints(prev => {
                const updatedPoints = { ...prev };
                updatedPoints[teamId] = Math.max(0, (updatedPoints[teamId] || 50) - 50);
                return updatedPoints;
            });
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

    const getBadge = (points) => {
        if (points >= 500) return { text: "Platinum", color: "bg-gradient-to-r from-gray-200 to-gray-400", icon: "🏆" };
        if (points >= 300) return { text: "Gold", color: "bg-gradient-to-r from-yellow-200 to-yellow-500", icon: "🥇" };
        if (points >= 150) return { text: "Silver", color: "bg-gradient-to-r from-gray-200 to-gray-300", icon: "🥈" };
        return { text: "Bronze", color: "bg-gradient-to-r from-amber-700 to-amber-900 text-white", icon: "🥉" };
    };

    const filteredTasks = tasks.filter(task => {
        if (activeTab === "all") return true;
        return task.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <FiHome className="text-blue-600" />
                        <span className="font-medium">Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <FiArrowLeft className="text-blue-600" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Project Management</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track your team's projects, tasks, and earned points in one place
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                        <h3 className="text-gray-500 font-medium mb-2">Total Tasks</h3>
                        <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                        <h3 className="text-gray-500 font-medium mb-2">Completed</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {tasks.filter(t => t.status === "completed").length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                        <h3 className="text-gray-500 font-medium mb-2">Total Points</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {Object.values(points).reduce((a, b) => a + b, 0)}
                        </p>
                    </div>
                </div>

                {/* Add Task Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition-all"
                    >
                        <FiPlus />
                        <span>Add New Task</span>
                    </button>
                </div>

                {/* Task Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Add New Project Task</h2>
                                    <button
                                        onClick={() => setIsFormOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                        <input
                                            type="text"
                                            name="projectName"
                                            value={formData.projectName}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter project name"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FiCalendar className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Estimation</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FiClock className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="timeEstimation"
                                                    value={formData.timeEstimation}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., 2 weeks"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem to Resolve</label>
                                        <textarea
                                            name="problem"
                                            value={formData.problem}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows="3"
                                            placeholder="Describe the problem..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FiMapPin className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="destination"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Location or address"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FiUsers className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="members"
                                                    value={formData.members}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Team members"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Team/NGO ID</label>
                                        <input
                                            type="text"
                                            name="teamId"
                                            value={formData.teamId}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your team or NGO ID"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsFormOpen(false)}
                                            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === "all" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Tasks
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === "pending" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === "in-progress" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab("in-progress")}
                    >
                        In Progress
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${activeTab === "completed" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed
                    </button>
                </div>

                {/* Tasks List */}
                {filteredTasks.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredTasks.map((task) => {
                            const badge = getBadge(points[task.teamId] || 50);
                            return (
                                <div
                                    key={task.id}
                                    className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${task.status === "completed" ? "border-green-500" :
                                            task.status === "in-progress" ? "border-yellow-500" : "border-blue-500"
                                        } relative`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-gray-800">{task.projectName}</h2>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.status === "completed" ? "bg-green-100 text-green-800" :
                                                task.status === "in-progress" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {task.status.replace("-", " ")}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">{task.problem}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center text-gray-700">
                                            <FiCalendar className="mr-2 text-gray-500" />
                                            <span>{task.date}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <FiClock className="mr-2 text-gray-500" />
                                            <span>{task.timeEstimation}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <FiMapPin className="mr-2 text-gray-500" />
                                            <span>{task.destination}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <FiUsers className="mr-2 text-gray-500" />
                                            <span>{task.members}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <span className="text-sm text-gray-500">Team ID:</span>
                                            <span className="ml-2 font-medium">{task.teamId}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <FiAward className="mr-2 text-yellow-500" />
                                                <span className="font-medium">{points[task.teamId] || 50} pts</span>
                                            </div>
                                            <div className={`px-2 py-1 text-xs font-bold rounded-full ${badge.color}`}>
                                                {badge.icon} {badge.text}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(task.id, task.teamId)}
                                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                                            title="Delete task"
                                            aria-label="Delete task"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;