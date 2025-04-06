import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TeamIDPrompt from "./components/TeamIDPrompt";

// Importing Pages
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

const isAuthenticated = localStorage.getItem("user");  // Check if user is logged in

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />  
                {/* Team ID Prompt */}
                <TeamIDPrompt />
                {/* Main Content */}
                <main className="flex-grow pt-16">
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<HomeLogin />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/donation" element={<Donation />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/weekly-tasks" element={<WeeklyTasks />} />
                        <Route path="/weekly-in-center" element={<WeeklyInCenter />} />
                        <Route path="/live-location" element={<LiveLocation />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/team-id" element={<TeamIDPage />} />
                    </Routes>
                </main>
                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
