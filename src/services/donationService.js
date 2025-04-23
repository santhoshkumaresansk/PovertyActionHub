// src/services/donationService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/donations';

// Add donation
export const addDonation = async (donationData) => {
  try {
    const response = await axios.post(API_URL, donationData);
    return response.data;
  } catch (error) {
    console.error('Error adding donation:', error);
    throw error;
  }
};

// Get all donations
export const getDonations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};
