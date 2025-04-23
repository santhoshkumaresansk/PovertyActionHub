import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TeamIDPrompt from "./components/TeamIDPrompt";

// Import Pages
import Home from "./pages/Home";
import HomeLogin from "./pages/HomeLogin";
import SignUp from "./pages/SignUp";
import Donation from "./pages/Donation";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import Verification from "./pages/Verification";
import Projects from "./pages/Projects";
import WeeklyTasks from "./pages/WeeklyTasks";
import WeeklyInCenter from "./pages/WeeklyInCenter";
import LiveLocation from "./pages/LiveLocation";
import History from "./pages/History";
import TeamIDPage from "./pages/TeamIDPage";
import CommunityDonationSystem from "./pages/CommunityDonationSystem";
import SuccessStories from "./pages/SuccessStories"; // New import
import BlogCreator from "./pages/BlogCreator"; // New import

// Import Auth Context
import { useAuth, AuthProvider } from "./context/AuthContext";

// PrivateRoute component for protecting authenticated routes
const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    {/* Navbar */}
                    <Navbar />
                    {/* Team ID Prompt */}
                    <TeamIDPrompt />
                    {/* Main Content */}
                    <main className="flex-grow pt-16">
                        <Routes>
                            {/* Redirect root to login page or homepage */}
                            <Route path="/" element={<Navigate to="/login" />} />

                            {/* Public Routes */}
                            <Route path="/login" element={<HomeLogin />} />
                            <Route path="/signup" element={<SignUp />} />

                            {/* Private Routes */}
                            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                            <Route path="/donation" element={<PrivateRoute><Donation /></PrivateRoute>} />
                            <Route path="/community-donations" element={<PrivateRoute><CommunityDonationSystem /></PrivateRoute>} />
                            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                            <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                            <Route path="/verification" element={<PrivateRoute><Verification /></PrivateRoute>} />
                            <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
                            <Route path="/weekly-tasks" element={<PrivateRoute><WeeklyTasks /></PrivateRoute>} />
                            <Route path="/weekly-in-center" element={<PrivateRoute><WeeklyInCenter /></PrivateRoute>} />
                            <Route path="/live-location" element={<PrivateRoute><LiveLocation /></PrivateRoute>} />
                            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                            <Route path="/team-id" element={<PrivateRoute><TeamIDPage /></PrivateRoute>} />
                            <Route path="/success-stories" element={<PrivateRoute><SuccessStories /></PrivateRoute>} />
                            <Route path="/blog-creator" element={<PrivateRoute><BlogCreator /></PrivateRoute>} />
                        </Routes>
                    </main>
                    {/* Footer */}
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;