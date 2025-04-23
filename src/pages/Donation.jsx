import React, { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
    const [donorName, setDonorName] = useState('');
    const [donationType, setDonationType] = useState('books');
    const [description, setDescription] = useState('');
    const [teamId, setTeamId] = useState('');
    const [points, setPoints] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newDonation = {
            type: donationType,
            quantity: Number(points),
            description,
            imageUrl: "", // optional for now
            donorName,
            teamId
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/api/donations',
                newDonation,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);
            alert("Donation submitted successfully!");

            // Reset form
            setDonorName('');
            setDonationType('books');
            setDescription('');
            setTeamId('');
            setPoints(0);
        } catch (error) {
            console.error("There was an error submitting the donation:", error);
            alert("Error submitting donation.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Make a Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Donor Name</label>
                    <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Donation Type</label>
                    <select
                        value={donationType}
                        onChange={(e) => setDonationType(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="books">Books</option>
                        <option value="clothes">Clothes</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Team ID</label>
                    <input
                        type="text"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Points</label>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                    >
                        Submit Donation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationForm;
