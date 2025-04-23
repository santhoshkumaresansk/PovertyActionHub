import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend URL
});

export const submitDonation = async (data) => {
  return API.post('/donations', data);
};

export const getDonations = async () => {
  return API.get('/donations');
};

export default API;
