import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiUsers, FiClipboard, FiCheckCircle } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme"; // Custom theme hook

const TaskPage = () => {
    const [formData, setFormData] = useState({
        name: "", 
        date: "", 
        description: "", 
        members: "", 
        status: "Pending",
        priority: "Medium"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme(); // Custom theme hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const tasks = JSON.parse(localStorage.getItem("weeklyTasks")) || [];
            const newTask = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            tasks.push(newTask);
            localStorage.setItem("weeklyTasks", JSON.stringify(tasks));
            
            setIsSubmitting(false);
            setSubmitSuccess(true);
            
            // Reset form after submission
            setTimeout(() => {
                setSubmitSuccess(false);
                navigate("/weekly-tasks");
            }, 1500);
        }, 1200);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800'} p-4 md:p-8`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div 
                    className="flex justify-between items-center mb-8"
                    variants={itemVariants}
                >
                    <Link 
                        to="/weekly-tasks" 
                        className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} p-3 rounded-lg shadow-sm transition-colors`}
                    >
                        <FiArrowLeft />
                        <span>Back to Tasks</span>
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm transition-colors`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </motion.div>

                {/* Page Title */}
                <motion.div 
                    className="text-center mb-10"
                    variants={itemVariants}
                >
                    <motion.div 
                        className={`inline-flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-full shadow-md mb-4`}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring" }}
                    >
                        <FiClipboard className="text-2xl text-blue-500" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Task</h1>
                    <p className="text-lg">Plan your team's weekly activities and track progress</p>
                </motion.div>

                {/* Task Form */}
                <motion.form 
                    onSubmit={handleSubmit}
                    className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}
                    variants={containerVariants}
                >
                    {/* Task Name */}
                    <motion.div className="mb-6" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-2">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition`}
                            placeholder="Enter task name"
                            required
                        />
                    </motion.div>

                    {/* Date and Priority */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
                        <div>
                            <label className="block text-sm font-medium mb-2">Due Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCalendar className="text-gray-500" />
                                </div>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={`w-full pl-10 p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition`}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition`}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div className="mb-6" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition`}
                            placeholder="Describe the task in detail..."
                            required
                        ></textarea>
                    </motion.div>

                    {/* Members */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-2">Team Members</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUsers className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                name="members"
                                value={formData.members}
                                onChange={handleChange}
                                className={`w-full pl-10 p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition`}
                                placeholder="Enter team members (comma separated)"
                                required
                            />
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition ${isSubmitting 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-md`}
                            variants={buttonVariants}
                            whileHover={!isSubmitting ? "hover" : {}}
                            whileTap={!isSubmitting ? "tap" : {}}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Task...
                                </span>
                            ) : (
                                "Create Task"
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {submitSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className={`mt-6 p-4 rounded-lg flex items-center ${theme === 'dark' ? 'bg-green-900' : 'bg-green-50'} text-green-700`}
                            >
                                <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                                <div>
                                    <p className="font-medium">Task created successfully!</p>
                                    <p className="text-sm">Redirecting to tasks list...</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default TaskPage;