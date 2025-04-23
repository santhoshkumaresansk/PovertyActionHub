import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationList = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // Fetch donations from the backend
        const fetchDonations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/donations');
                setDonations(response.data);
            } catch (error) {
                console.error("There was an error fetching the donations:", error);
            }
        };

        fetchDonations();
    }, []);

    return (
        <div>
            <h2>Donation List</h2>
            <ul>
                {donations.map((donation) => (
                    <li key={donation._id}>
                        <strong>{donation.donorName}</strong> donated {donation.type} ({donation.points} points)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationList;
