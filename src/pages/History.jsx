import { useState, useEffect } from "react";
import { 
  FiHome, FiCalendar, FiDollarSign, FiBook, 
  FiGift, FiFilter, FiChevronDown, FiChevronUp,
  FiAward, FiUsers, FiTrendingUp
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const History = () => {
    const [donationHistory, setDonationHistory] = useState([]);
    const [filter, setFilter] = useState("all");
    const [expandedItems, setExpandedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPoints: 0,
        impact: { peopleHelped: 0, itemsDonated: 0 }
    });

    useEffect(() => {
        // Simulate loading with mock data
        setTimeout(() => {
            const mockHistory = [
                {
                    id: '1',
                    type: 'money',
                    amount: 50,
                    date: '2023-10-15T09:30:00Z',
                    points: 50,
                    notes: 'Monthly contribution',
                    verified: true
                },
                {
                    id: '2',
                    type: 'books',
                    quantity: 12,
                    date: '2023-09-22T14:15:00Z',
                    points: 60,
                    description: 'Children\'s books',
                    verified: true
                },
                {
                    id: '3',
                    type: 'clothes',
                    quantity: 5,
                    date: '2023-08-05T11:20:00Z',
                    points: 15,
                    description: 'Winter jackets',
                    verified: true
                }
            ];
            
            const storedHistory = JSON.parse(localStorage.getItem("donationHistory")) || mockHistory;
            setDonationHistory(storedHistory);
            
            // Calculate stats
            const totalPoints = storedHistory.reduce((sum, item) => sum + (item.points || 0), 0);
            const peopleHelped = storedHistory.reduce((sum, item) => {
                return sum + (item.type === 'money' ? Math.floor(item.amount / 5) : 
                          item.type === 'books' ? item.quantity : 1);
            }, 0);
            
            setStats({
                totalPoints,
                impact: {
                    peopleHelped,
                    itemsDonated: storedHistory.filter(d => d.type !== 'money').length
                }
            });
            
            setLoading(false);
        }, 800);
    }, []);

    const toggleExpandItem = (id) => {
        setExpandedItems(prev => 
            prev.includes(id) 
                ? prev.filter(itemId => itemId !== id) 
                : [...prev, id]
        );
    };

    const filteredHistory = donationHistory.filter(item => {
        if (filter === "all") return true;
        return item.type === filter;
    });

    const getTypeIcon = (type) => {
        const icons = {
            money: <FiDollarSign className="text-green-600" />,
            books: <FiBook className="text-blue-600" />,
            clothes: <FiGift className="text-purple-600" />,
            food: <FiGift className="text-amber-600" />,
            other: <FiGift className="text-gray-600" />
        };
        return icons[type] || icons.other;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Enhanced Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center justify-center bg-white p-4 rounded-2xl shadow-lg mb-6"
                    >
                        <FiCalendar className="text-indigo-600 text-3xl" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Donation History
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your generosity in action - track every contribution and its community impact
                    </p>
                </motion.div>

                {/* Impact Dashboard */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                                <FiTrendingUp className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Points</h3>
                                <p className="text-3xl font-bold text-gray-800">
                                    {stats.totalPoints}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                <FiUsers className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">People Helped</h3>
                                <p className="text-3xl font-bold text-gray-800">
                                    {stats.impact.peopleHelped}+
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                <FiAward className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Items Donated</h3>
                                <p className="text-3xl font-bold text-gray-800">
                                    {stats.impact.itemsDonated}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filter Controls */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-5 rounded-2xl shadow-sm mb-8 sticky top-2 z-10 backdrop-blur-sm bg-opacity-90"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <FiFilter className="text-gray-500 text-xl" />
                            <span className="text-md font-medium text-gray-700">Filter donations:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'money', 'books', 'clothes', 'food', 'other'].map((type) => (
                                <motion.button
                                    key={type}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFilter(type)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all ${
                                        filter === type 
                                            ? type === 'money' ? 'bg-green-100 text-green-800' :
                                              type === 'books' ? 'bg-blue-100 text-blue-800' :
                                              type === 'clothes' ? 'bg-purple-100 text-purple-800' :
                                              type === 'food' ? 'bg-amber-100 text-amber-800' :
                                              type === 'other' ? 'bg-gray-100 text-gray-800' :
                                              'bg-indigo-100 text-indigo-800'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {getTypeIcon(type)}
                                    <span>
                                        {type === 'all' ? 'All' : 
                                         type === 'money' ? 'Money' :
                                         type === 'books' ? 'Books' :
                                         type === 'clothes' ? 'Clothes' :
                                         type === 'food' ? 'Food' : 'Other'}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* History List */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                    {loading ? (
                        <div className="p-8 text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent mb-4"
                            />
                            <p className="text-gray-600">Loading your generous history...</p>
                        </div>
                    ) : filteredHistory.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {filteredHistory.map((item) => (
                                    <motion.li 
                                        key={item.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <button
                                            onClick={() => toggleExpandItem(item.id)}
                                            className="w-full text-left p-5 flex justify-between items-center group"
                                        >
                                            <div className="flex items-center space-x-5">
                                                <motion.div 
                                                    whileHover={{ rotate: 5 }}
                                                    className={`p-3 rounded-xl ${item.type === "money" ? 'bg-green-50' : item.type === "books" ? 'bg-blue-50' : 'bg-purple-50'}`}
                                                >
                                                    {getTypeIcon(item.type)}
                                                </motion.div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                        {item.type === "money" ? `$${item.amount} Donated` : 
                                                         item.type === "books" ? `${item.quantity} Books Donated` : 
                                                         item.description || `${item.quantity} Items Donated`}
                                                    </h3>
                                                    <div className="flex items-center space-x-3 mt-1">
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(item.date)}
                                                        </span>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${item.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {item.verified ? 'Verified' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    +{item.points || 10} pts
                                                </div>
                                                {expandedItems.includes(item.id) ? (
                                                    <FiChevronUp className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
                                                ) : (
                                                    <FiChevronDown className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
                                                )}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedItems.includes(item.id) && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="px-5 pb-5 ml-16 overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Donation Details</h4>
                                                            <div className="space-y-2">
                                                                <p className="text-gray-800">
                                                                    <span className="font-medium">Type:</span> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                                </p>
                                                                {item.type === "money" ? (
                                                                    <p className="text-gray-800">
                                                                        <span className="font-medium">Amount:</span> ${item.amount}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-gray-800">
                                                                        <span className="font-medium">Quantity:</span> {item.quantity}
                                                                    </p>
                                                                )}
                                                                {item.notes && (
                                                                    <p className="text-gray-800">
                                                                        <span className="font-medium">Notes:</span> {item.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Impact</h4>
                                                            <div className="space-y-3">
                                                                <p className="text-gray-800">
                                                                    {item.type === "money" ? (
                                                                        `This donation helps approximately ${Math.floor(item.amount / 5)} people access basic necessities.`
                                                                    ) : item.type === "books" ? (
                                                                        `These ${item.quantity} books will be distributed to underprivileged children.`
                                                                    ) : (
                                                                        "Your donated items will be used where they're needed most in the community."
                                                                    )}
                                                                </p>
                                                                <div className="flex items-center space-x-2 text-indigo-600 font-medium">
                                                                    <FiAward />
                                                                    <span>Earned {item.points || 10} credit points</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-10 text-center"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="text-gray-400 mb-4">
                                    <FiGift className="inline-block text-5xl" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">
                                    {filter === "all" 
                                        ? "No donations recorded yet" 
                                        : `No ${filter} donations found`}
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {filter === "all" 
                                        ? "Your generous donations will appear here once made." 
                                        : `Try changing the filter or make your first ${filter} donation.`}
                                </p>
                                <Link 
                                    to="/donation" 
                                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md"
                                >
                                    <FiDollarSign className="mr-2" />
                                    Make a Donation
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Enhanced Navigation */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link 
                        to="/" 
                        className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition border border-gray-200 shadow-sm"
                    >
                        <FiHome />
                        <span>Return Home</span>
                    </Link>
                    <Link 
                        to="/leaderboard" 
                        className="flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-lg hover:bg-indigo-100 transition border border-indigo-100 shadow-sm"
                    >
                        <FiTrendingUp />
                        <span>View Leaderboard</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default History;