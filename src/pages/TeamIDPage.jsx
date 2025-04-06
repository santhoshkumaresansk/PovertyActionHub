import { useState } from "react";

const TeamIDPage = () => {
    const [teamID, setTeamID] = useState(localStorage.getItem("teamID") || "");

    const handleSave = () => {
        if (teamID.trim() !== "") {
            localStorage.setItem("teamID", teamID);
            alert("Team ID saved successfully!");
        } else {
            alert("Please enter a valid Team ID.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Team ID Management</h1>
            <input 
                type="text" 
                value={teamID} 
                onChange={(e) => setTeamID(e.target.value)} 
                placeholder="Enter your Team ID" 
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button 
                onClick={handleSave} 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Save Team ID
            </button>
        </div>
    );
};

export default TeamIDPage;