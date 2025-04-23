import Donation from '../models/Donation.js';

// Add a donation
export const addDonation = async (req, res) => {
    try {
        const { type, quantity, description, imageUrl, donorName, teamId } = req.body;

        const newDonation = new Donation({
            type,
            quantity,
            description,
            imageUrl,
            donorName,
            teamId,
            userId: req.userId  // Get userId from the decoded token
        });

        await newDonation.save();

        res.status(201).json({ message: "Donation submitted successfully!", donation: newDonation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add donation" });
    }
};

// Get all donations (Public route)
export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find();  // Retrieve all donations
        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch donations" });
    }
};
