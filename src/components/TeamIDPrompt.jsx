import { useState, useEffect } from "react";

const TeamIDPrompt = () => {
    const [teamID, setTeamID] = useState("");
    
    useEffect(() => {
        const storedTeamID = localStorage.getItem("teamID");
        if (!storedTeamID) {
            const newTeamID = prompt("Please enter your Team ID:");
            if (newTeamID) {
                localStorage.setItem("teamID", newTeamID);
                setTeamID(newTeamID);
            }
        } else {
            setTeamID(storedTeamID);
        }
    }, []);

    return (
        <div className="bg-gray-200 text-center py-2">
            {teamID ? <p>Current Team ID: <strong>{teamID}</strong></p> : <p>No Team ID set</p>}
        </div>
    );
};

export default TeamIDPrompt;