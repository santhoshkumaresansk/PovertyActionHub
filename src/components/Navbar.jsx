import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, HeartHandshake, Trophy, CalendarCheck, ShieldCheck, MapPin, Phone, BookText } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home", icon: <Home size={18} className="mr-2" /> },
        { path: "/donation", label: "Donation", icon: <HeartHandshake size={18} className="mr-2" /> },
        { path: "/leaderboard", label: "Leaderboard", icon: <Trophy size={18} className="mr-2" /> },
        { path: "/projects", label: "Projects", icon: <CalendarCheck size={18} className="mr-2" /> },
        { path: "/verification", label: "Verification", icon: <ShieldCheck size={18} className="mr-2" /> },
        { path: "/weekly-tasks", label: "Weekly Tasks", icon: <BookText size={18} className="mr-2" /> },
        { path: "/contact", label: "Contact", icon: <Phone size={18} className="mr-2" /> },
        { path: "/live-location", label: "Locations", icon: <MapPin size={18} className="mr-2" /> }
    ];

    return (
        <nav className="bg-gradient-to-r from-red-600 to-red-700 p-4 shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo with Home Link */}
                <Link to="/" className="flex items-center space-x-2">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white p-2 rounded-full shadow-md"
                    >
                        <Home className="text-red-600" size={20} />
                    </motion.div>
                    <motion.h1 
                        className="text-2xl font-bold text-white"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Action Hub
                    </motion.h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-1 relative">
                    <div
                        className="relative group"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <motion.button
                            className="flex items-center px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all z-40"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Menu</span>
                            <motion.span
                                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-1"
                            >
                                ▼
                            </motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.ul
                                    className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg overflow-hidden w-56 py-1"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ type: "spring", damping: 20 }}
                                >
                                    {navItems.map(({ path, label, icon }) => (
                                        <motion.li
                                            key={path}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={path}
                                                className={`flex items-center px-4 py-3 ${location.pathname === path ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                {icon}
                                                {label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Additional CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/donation"
                            className="flex items-center px-4 py-2 bg-white text-red-600 font-medium rounded-lg shadow hover:bg-gray-100 transition-all"
                        >
                            <HeartHandshake size={18} className="mr-2" />
                            Donate Now
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle Button */}
                <motion.button
                    className="md:hidden p-2 text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="md:hidden bg-white shadow-xl absolute top-16 left-0 right-0 w-full"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="flex flex-col divide-y divide-gray-100">
                            {navItems.map(({ path, label, icon }) => (
                                <motion.li
                                    key={path}
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: "spring" }}
                                >
                                    <Link
                                        to={path}
                                        className={`flex items-center px-6 py-4 ${location.pathname === path ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ type: "spring", delay: 0.1 }}
                            >
                                <Link
                                    to="/donation"
                                    className="flex items-center justify-center px-6 py-4 bg-red-600 text-white font-medium hover:bg-red-700"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <HeartHandshake size={18} className="mr-2" />
                                    Donate Now
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;