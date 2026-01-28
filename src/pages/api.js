// src/api.js
const API_BASE_URL = "https://povertyactionhub.onrender.com";

export const api = {
  // Get nearby donation centers
  getDonationCenters: async (lat, lng) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/centers?lat=${lat}&lng=${lng}`
      );
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch donation centers");
    }
  },

  // Submit a donation request
  submitDonation: async (donationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });
      return await response.json();
    } catch (error) {
      throw new Error("Failed to submit donation");
    }
  },
};
