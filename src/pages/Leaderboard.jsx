import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiAward, FiHome, FiCalendar, FiRefreshCw, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [history, setHistory] = useState([]);
    const [expandedMonth, setExpandedMonth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: "points", direction: "desc" });

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            fetchLeaderboard();
            fetchHistory();
            setIsLoading(false);
        }, 800);
    }, []);

    const fetchLeaderboard = () => {
        const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        setUsers(data);
    };

    const fetchHistory = () => {
        const storedHistory = JSON.parse(localStorage.getItem("leaderboardHistory") || "[]");
        setHistory(storedHistory);
    };

    const getBadge = (points) => {
        if (points >= 601) return { name: "Platinum", color: "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800" };
        if (points >= 301) return { name: "Gold", color: "bg-gradient-to-r from-yellow-200 to-yellow-500 text-yellow-800" };
        if (points >= 101) return { name: "Silver", color: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800" };
        return { name: "Bronze", color: "bg-gradient-to-r from-amber-700 to-amber-900 text-white" };
    };

    const requestSort = (key) => {
        let direction = "desc";
        if (sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const resetLeaderboard = () => {
        if (users.length === 0) {
            alert("Leaderboard is already empty!");
            return;
        }

        if (!window.confirm("Are you sure you want to reset the leaderboard? This action cannot be undone.")) {
            return;
        }

        const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });
        const date = new Date().toLocaleDateString();

        // Save current rankings in history (sorted by points)
        const updatedHistory = [
            { 
                month, 
                date,
                topUsers: [...users]
                    .sort((a, b) => b.points - a.points)
                    .slice(0, 5) // Only store top 5
            },
            ...history
        ];
        
        setHistory(updatedHistory);
        localStorage.setItem("leaderboardHistory", JSON.stringify(updatedHistory));

        // Reset leaderboard
        setUsers([]);
        localStorage.setItem("leaderboard", JSON.stringify([]));

        alert(`Leaderboard has been reset for ${month}!`);
    };

    const toggleExpandMonth = (index) => {
        setExpandedMonth(expandedMonth === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-md mb-4">
                        <FiAward className="text-yellow-500 text-3xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Leaderboard</h1>
                    <p className="text-lg text-gray-600">Top contributors making a difference in our community</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                        <h3 className="text-gray-500 font-medium mb-2">Total Participants</h3>
                        <p className="text-3xl font-bold text-gray-800">{users.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
                        <h3 className="text-gray-500 font-medium mb-2">Top Score</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {users.length > 0 ? Math.max(...users.map(u => u.points)) : 0}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
                        <h3 className="text-gray-500 font-medium mb-2">Total Points</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {users.reduce((sum, user) => sum + user.points, 0)}
                        </p>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Current Rankings</h2>
                        <button 
                            onClick={resetLeaderboard}
                            className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                        >
                            <FiRefreshCw />
                            <span>Reset Monthly</span>
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                            <p>Loading leaderboard...</p>
                        </div>
                    ) : users.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600">
                                        <th 
                                            className="p-4 text-left cursor-pointer hover:bg-gray-200"
                                            onClick={() => requestSort("rank")}
                                        >
                                            <div className="flex items-center">
                                                Rank
                                                {sortConfig.key === "rank" && (
                                                    sortConfig.direction === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="p-4 text-left">Name</th>
                                        <th className="p-4 text-left">Team</th>
                                        <th 
                                            className="p-4 text-left cursor-pointer hover:bg-gray-200"
                                            onClick={() => requestSort("points")}
                                        >
                                            <div className="flex items-center">
                                                Points
                                                {sortConfig.key === "points" && (
                                                    sortConfig.direction === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="p-4 text-left">Badge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedUsers.map((user, index) => {
                                        const badge = getBadge(user.points);
                                        return (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="p-4 font-medium">{index + 1}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        {user.name}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-600">{user.teamID}</td>
                                                <td className="p-4 font-semibold">{user.points}</td>
                                                <td className="p-4">
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge.color}`}>
                                                        {badge.name}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No participants yet. Be the first to join the leaderboard!
                        </div>
                    )}
                </div>

                {/* Leaderboard History */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Past Winners</h2>
                    </div>

                    {history.length > 0 ? (
                        <div className="divide-y">
                            {history.map((month, index) => (
                                <div key={index} className="p-4">
                                    <button 
                                        onClick={() => toggleExpandMonth(index)}
                                        className="flex justify-between items-center w-full text-left"
                                    >
                                        <div className="flex items-center">
                                            <FiCalendar className="mr-3 text-gray-500" />
                                            <span className="font-medium">{month.month}</span>
                                            <span className="text-sm text-gray-500 ml-2">{month.date}</span>
                                        </div>
                                        {expandedMonth === index ? <FiChevronUp /> : <FiChevronDown />}
                                    </button>

                                    {expandedMonth === index && (
                                        <div className="mt-3 pl-9">
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                                {month.topUsers.map((user, idx) => {
                                                    const badge = getBadge(user.points);
                                                    return (
                                                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                                            <div className="flex items-center mb-2">
                                                                <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                                                    {user.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-medium">{user.name}</h4>
                                                                    <p className="text-xs text-gray-500">{user.teamID}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-bold text-blue-600">{user.points} pts</span>
                                                                <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
                                                                    {badge.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No past leaderboard data available
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        <FiHome className="mr-2" />
                        Home
                    </Link>
                    <Link 
                        to="/weekly-tasks" 
                        className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Weekly Tasks
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;