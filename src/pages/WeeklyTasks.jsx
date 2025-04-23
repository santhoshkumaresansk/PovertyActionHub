import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WeeklyTasks = () => {
    // Sample tasks data
    const sampleTasks = [
        {
            id: "1",
            name: "Food Distribution",
            date: new Date().toISOString().split('T')[0],
            description: "Distribute food packages to homeless shelters in downtown area",
            time: "3 hours",
            destination: "Downtown Shelter",
            members: "John, Sarah, Mike",
            teamId: "Team-A",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "2",
            name: "Clothing Drive",
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            description: "Collect and sort donated clothing for distribution",
            time: "4 hours",
            destination: "Community Center",
            members: "Emma, David, Lisa",
            teamId: "Team-B",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "3",
            name: "Education Workshop",
            date: new Date(Date.now() + 2*86400000).toISOString().split('T')[0],
            description: "Conduct basic literacy workshop for underprivileged children",
            time: "2 hours",
            destination: "Local School",
            members: "Robert, Sophia, James",
            teamId: "Team-C",
            status: "Completed",
            createdAt: new Date().toISOString()
        },
        {
            id: "4",
            name: "Shelter Cleanup",
            date: new Date(Date.now() + 3*86400000).toISOString().split('T')[0],
            description: "Clean and organize the homeless shelter facilities",
            time: "5 hours",
            destination: "Hope Shelter",
            members: "Olivia, Ethan, Ava",
            teamId: "Team-D",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "5",
            name: "Fundraising Event",
            date: new Date(Date.now() + 4*86400000).toISOString().split('T')[0],
            description: "Organize charity fundraiser at the community park",
            time: "6 hours",
            destination: "Central Park",
            members: "Noah, Isabella, Liam",
            teamId: "Team-E",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "6",
            name: "Medical Camp",
            date: new Date(Date.now() + 5*86400000).toISOString().split('T')[0],
            description: "Provide basic health checkups for low-income families",
            time: "4 hours",
            destination: "Health Center",
            members: "Mia, Jacob, Charlotte",
            teamId: "Team-F",
            status: "Completed",
            createdAt: new Date().toISOString()
        },
        {
            id: "7",
            name: "Senior Care",
            date: new Date(Date.now() + 6*86400000).toISOString().split('T')[0],
            description: "Visit and assist elderly residents at nursing home",
            time: "3 hours",
            destination: "Sunset Nursing Home",
            members: "Benjamin, Amelia, William",
            teamId: "Team-G",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "8",
            name: "Book Donation",
            date: new Date(Date.now() + 7*86400000).toISOString().split('T')[0],
            description: "Collect and distribute books to underfunded schools",
            time: "3 hours",
            destination: "Elementary School",
            members: "Elijah, Harper, Daniel",
            teamId: "Team-H",
            status: "Pending",
            createdAt: new Date().toISOString()
        },
        {
            id: "9",
            name: "Community Garden",
            date: new Date(Date.now() + 8*86400000).toISOString().split('T')[0],
            description: "Maintain and harvest community vegetable garden",
            time: "2 hours",
            destination: "Community Garden",
            members: "Alexander, Abigail, Michael",
            teamId: "Team-I",
            status: "Completed",
            createdAt: new Date().toISOString()
        },
        {
            id: "10",
            name: "Tutoring Session",
            date: new Date(Date.now() + 9*86400000).toISOString().split('T')[0],
            description: "Provide after-school tutoring for at-risk youth",
            time: "2 hours",
            destination: "Youth Center",
            members: "Matthew, Emily, Joseph",
            teamId: "Team-J",
            status: "Pending",
            createdAt: new Date().toISOString()
        }
    ];

    const [tasks, setTasks] = useState(sampleTasks);
    const [filter, setFilter] = useState("all");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
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
        const storedTasks = JSON.parse(localStorage.getItem("weeklyTasks"));
        if (storedTasks && storedTasks.length > 0) {
            setTasks(storedTasks);
        } else {
            localStorage.setItem("weeklyTasks", JSON.stringify(sampleTasks));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { 
            ...formData, 
            status: "Pending",
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
        setFormData({ 
            name: "", 
            date: "", 
            description: "", 
            time: "", 
            destination: "", 
            members: "", 
            teamId: "" 
        });
        setIsFormOpen(false);
    };

    const toggleTaskStatus = (taskId) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId 
                ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } 
                : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
        setTasks(updatedTasks);
        localStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
        setIsDeleteDialogOpen(false);
        setTaskToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setTaskToDelete(null);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        return task.status === filter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            {/* Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <Link 
                    to="/weekly-in-center" 
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 w-full md:w-auto justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2a1 1 0 011 1v1h3a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3V3a1 1 0 112 0v1h2V3a1 1 0 011-1zM5 7h10v2H5V7zm0 4h10v2H5v-2zm0 4h10v2H5v-2z" clipRule="evenodd" />
                    </svg>
                    Weekly In Center
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
                        📝 Weekly Tasks
                    </span>
                </h1>
                <Link 
                    to="/" 
                    className="bg-gray-600 text-white px-5 py-3 rounded-lg shadow hover:bg-gray-700 transition flex items-center gap-2 w-full md:w-auto justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </Link>
            </div>

            {/* Task List */}
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex gap-2 bg-white p-1 rounded-lg shadow-inner border border-gray-200">
                        <button 
                            onClick={() => setFilter("all")} 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setFilter("Pending")} 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${filter === "Pending" ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            Pending
                        </button>
                        <button 
                            onClick={() => setFilter("Completed")} 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${filter === "Completed" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            Completed
                        </button>
                    </div>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-green-600 transition flex items-center gap-2 font-semibold w-full md:w-auto justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Create New Task
                    </button>
                </div>

                {filteredTasks.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-8 rounded-xl shadow text-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-700">No tasks found</h3>
                        <p className="mt-1 text-gray-500">
                            {filter === "all" 
                                ? "Start by creating your first task!" 
                                : filter === "Pending" 
                                    ? "No pending tasks. Great job!" 
                                    : "No completed tasks yet."}
                        </p>
                    </motion.div>
                ) : (
                    <motion.ul className="space-y-4">
                        <AnimatePresence>
                            {filteredTasks.map((task) => (
                                <motion.li
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-md transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => toggleTaskStatus(task.id)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${task.status === "Completed" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                            >
                                                {task.status === "Completed" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                <h3 className={`text-xl font-semibold ${task.status === "Completed" ? "text-gray-500 line-through" : "text-gray-800"}`}>
                                                    {task.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                                                        {task.status}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(task.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className={`mt-2 text-gray-600 ${task.status === "Completed" ? "line-through" : ""}`}>
                                                {task.description}
                                            </p>
                                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {task.time}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {task.destination}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    {task.members.split(",").length} members
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                    </svg>
                                                    Team: {task.teamId}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => handleDeleteClick(task.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                )}
            </div>

            {/* Create Task Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create New Task
                                </h2>
                                <button 
                                    onClick={() => setIsFormOpen(false)}
                                    className="p-1 rounded-full hover:bg-gray-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="Enter task name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input 
                                            type="date" 
                                            name="date" 
                                            value={formData.date} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea 
                                        name="description" 
                                        placeholder="Task details..." 
                                        value={formData.description} 
                                        onChange={handleChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Duration</label>
                                        <input 
                                            type="text" 
                                            name="time" 
                                            placeholder="e.g., 2 hours" 
                                            value={formData.time} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                        <input 
                                            type="text" 
                                            name="destination" 
                                            placeholder="Where is this happening?" 
                                            value={formData.destination} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
                                        <input 
                                            type="text" 
                                            name="members" 
                                            placeholder="Names separated by commas" 
                                            value={formData.members} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Team ID</label>
                                        <input 
                                            type="text" 
                                            name="teamId" 
                                            placeholder="Team identifier" 
                                            value={formData.teamId} 
                                            onChange={handleChange} 
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 transition flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Dialog */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-red-100 text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default WeeklyTasks;