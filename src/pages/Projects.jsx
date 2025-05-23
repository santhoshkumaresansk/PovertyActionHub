import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaDonate, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaBoxOpen, 
  FaCheck, 
  FaTimes,
  FaUser,
  FaCamera,
  FaSearch,
  FaFilter,
  FaTrash,
  FaEdit,
  FaTrophy
} from 'react-icons/fa';
import { MdLocationOn, MdDescription, MdWavingHand } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';

// Custom Icons
const createCustomIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const userIcon = createCustomIcon("blue");
const donationIcon = createCustomIcon("green");
const teamIcon = createCustomIcon("red");

// Points calculation function
const calculateDonationPoints = (items) => {
  const itemPoints = {
    'Clothes': 10,
    'Books': 15,
    'Furniture': 25,
    'Electronics': 30,
    'Toys': 10,
    'Medical Supplies': 40,
    'Food': 20,
    'Utensils': 10,
    'Stationery': 5,
    'Blankets': 15,
    'Shoes': 10,
    'Other': 5
  };
  
  return items.reduce((total, item) => total + (itemPoints[item] || 0), 0);
};

// Badge system
const getBadge = (points) => {
  if (points >= 901) return { name: "Diamond", color: "from-blue-200 to-blue-400 text-blue-800", icon: "💎" };
  if (points >= 601) return { name: "Platinum", color: "from-gray-200 to-gray-400 text-gray-800", icon: "🏆" };
  if (points >= 301) return { name: "Gold", color: "from-yellow-200 to-yellow-500 text-yellow-800", icon: "🥇" };
  if (points >= 101) return { name: "Silver", color: "from-gray-200 to-gray-300 text-gray-800", icon: "🥈" };
  return { name: "Bronze", color: "from-amber-700 to-amber-900 text-white", icon: "🥉" };
};

const CommunityDonationSystem = () => {
  const [activeTab, setActiveTab] = useState('donate');
  const [donationType, setDonationType] = useState('direct');
  const [items, setItems] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    items: [],
    description: '',
    witnessName: '',
    witnessContact: '',
    photoProof: null,
    teamId: ''
  });
  const [location, setLocation] = useState([12.9716, 77.5946]);
  const [mapType, setMapType] = useState('street');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [teamPoints, setTeamPoints] = useState({});

  const itemCategories = [
    'Clothes', 'Books', 'Furniture', 'Electronics',
    'Toys', 'Medical Supplies', 'Food', 'Utensils',
    'Stationery', 'Blankets', 'Shoes', 'Other'
  ];

  useEffect(() => {
    const mockDonations = [
      {
        id: 1,
        donorName: 'Rahul Sharma',
        phone: '9876543210',
        address: '123 MG Road, Bangalore, Karnataka',
        items: ['Books', 'Clothes'],
        description: 'Good condition items',
        location: [12.9756, 77.5926],
        status: 'available',
        date: '2023-05-15',
        points: 25,
        teamId: 'Green Earth'
      },
      {
        id: 2,
        donorName: 'Sneha Patel',
        phone: '9123456780',
        address: '45 Ring Road, Ahmedabad, Gujarat',
        items: ['Toys', 'Shoes'],
        description: 'Clean and gently used',
        location: [23.0225, 72.5714],
        status: 'available',
        date: '2023-06-20',
        points: 20,
        teamId: 'Hope Foundation'
      },
      {
        id: 3,
        donorName: 'Arjun Mehta',
        phone: '9012345678',
        address: '56 CP, Connaught Place, New Delhi',
        items: ['Clothes'],
        description: 'Kids clothes, good quality',
        location: [28.6315, 77.2167],
        status: 'available',
        date: '2023-07-01',
        points: 10,
        teamId: 'Education First'
      }
    ];
    
    setAvailableDonations(mockDonations);
    
    // Initialize team points from localStorage
    const storedPoints = JSON.parse(localStorage.getItem('teamPoints')) || {};
    setTeamPoints(storedPoints);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemToggle = (item) => {
    setItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, photoProof: e.target.files[0] });
  };

  const updateLeaderboard = (teamId, points, donorName) => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const teamIndex = leaderboard.findIndex(item => item.teamId === teamId);
    
    if (teamIndex >= 0) {
      leaderboard[teamIndex].points += points;
      leaderboard[teamIndex].donations += 1;
    } else {
      leaderboard.push({
        id: Date.now(),
        name: donorName,
        teamId: teamId,
        points: points,
        donations: 1,
        volunteerHours: 0,
        rank: leaderboard.length + 1
      });
    }
    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    // Update team points
    const updatedPoints = { ...teamPoints, [teamId]: (teamPoints[teamId] || 0) + points };
    setTeamPoints(updatedPoints);
    localStorage.setItem('teamPoints', JSON.stringify(updatedPoints));
  };

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || 
        !formData.city || !formData.state || items.length === 0 || !formData.teamId) {
      alert('Please fill all required fields and select at least one item');
      return;
    }

    const points = calculateDonationPoints(items);

    const newDonation = {
      id: Date.now(),
      donorName: formData.name,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state}`,
      items: [...items],
      description: formData.description,
      location: location,
      status: 'available',
      date: new Date().toISOString().split('T')[0],
      witnessName: formData.witnessName || '',
      witnessContact: formData.witnessContact || '',
      photoProof: formData.photoProof ? URL.createObjectURL(formData.photoProof) : null,
      points: points,
      teamId: formData.teamId
    };

    setAvailableDonations(prev => [...prev, newDonation]);
    updateLeaderboard(formData.teamId, points, formData.name);
    
    alert(`Thank you for your donation! You earned ${points} points. Teams will contact you for collection.`);
    resetForm();
    setActiveTab('available');
  };

  const handleClaimDonation = (id) => {
    setAvailableDonations(avail =>
      avail.map(d => d.id === id ? { ...d, status: 'claimed' } : d)
    );
    alert('Donation claimed successfully! Please contact the donor.');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      items: [],
      description: '',
      witnessName: '',
      witnessContact: '',
      photoProof: null,
      teamId: ''
    });
    setItems([]);
  };

  const filteredDonations = availableDonations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || donation.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaDonate /> Community Donation Network
          </h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('donate')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'donate' ? 'bg-white text-blue-600' : 'bg-blue-700'}`}
            >
              Donate Items
            </button>
            <button 
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'available' ? 'bg-white text-blue-600' : 'bg-blue-700'}`}
            >
              Available Donations
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {activeTab === 'donate' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaBoxOpen /> Donation Details
              </h2>
              
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setDonationType('direct')}
                    className={`flex-1 py-2 rounded-lg ${donationType === 'direct' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Direct Donation
                  </button>
                  <button
                    onClick={() => setDonationType('available')}
                    className={`flex-1 py-2 rounded-lg ${donationType === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Make Available
                  </button>
                </div>

                <form onSubmit={handleSubmitDonation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Full Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg mb-2"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Items to Donate*
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {itemCategories.map(item => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleItemToggle(item)}
                          className={`px-3 py-2 rounded-full text-sm ${
                            items.includes(item)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <MdDescription /> Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Team/NGO ID*</label>
                    <input
                      type="text"
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Enter your team or NGO ID"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used to track your contribution points in the leaderboard
                    </p>
                  </div>

                  {donationType === 'available' && (
                    <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <RiTeamFill /> For Collection Teams
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Witness Name</label>
                          <input
                            type="text"
                            name="witnessName"
                            value={formData.witnessName}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Witness Contact</label>
                          <input
                            type="tel"
                            name="witnessContact"
                            value={formData.witnessContact}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                          <FaCamera /> Photo Proof (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <FaTrophy className="text-yellow-500" />
                    <span className="text-sm">
                      Estimated points for this donation: <strong>{calculateDonationPoints(items)} points</strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 flex items-center justify-center gap-2"
                  >
                    <FaCheck /> {donationType === 'direct' ? 'Submit Donation' : 'Make Available'}
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMapType('street')}
                    className={`px-3 py-1 rounded ${mapType === 'street' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Street
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-3 py-1 rounded ${mapType === 'satellite' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Satellite
                  </button>
                </div>
              </div>
              <div className="h-96 relative">
                <MapContainer center={location} zoom={13} className="h-full w-full">
                  <TileLayer
                    url={
                      mapType === 'street'
                        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    }
                    attribution={
                      mapType === 'street'
                        ? '&copy; OpenStreetMap contributors'
                        : '&copy; Esri'
                    }
                  />
                  <Marker position={location} icon={userIcon}>
                    <Popup>Your Location</Popup>
                  </Marker>
                  {availableDonations.map(donation => (
                    <Marker
                      key={donation.id}
                      position={donation.location}
                      icon={donationIcon}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-bold">{donation.donorName}</h3>
                          <p className="text-sm">{donation.address}</p>
                          <p className="text-xs mt-1">
                            <span className="font-medium">Items:</span> {donation.items.join(', ')}
                          </p>
                          <p className="text-xs mt-1">
                            <span className="font-medium">Points:</span> {donation.points}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MdWavingHand /> Available Donations
              </h2>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search donations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="claimed">Claimed</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map(donation => {
                      const badge = getBadge(donation.points);
                      return (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{donation.donorName}</div>
                            <div className="text-sm text-gray-500">{donation.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {donation.items.map(item => (
                                <span key={item} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-bold">{donation.points}</span>
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${badge.color}`}>
                                {badge.icon} {badge.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              donation.status === 'available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {donation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedDonation(donation)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              View
                            </button>
                            {donation.status === 'available' && (
                              <button
                                onClick={() => handleClaimDonation(donation.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Claim
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No donations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Donation Details</h3>
              <button 
                onClick={() => setSelectedDonation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Donor Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedDonation.donorName}</p>
                  <p><span className="font-medium">Phone:</span> {selectedDonation.phone}</p>
                  <p><span className="font-medium">Address:</span> {selectedDonation.address}</p>
                  <p><span className="font-medium">Team ID:</span> {selectedDonation.teamId}</p>
                </div>
                
                <h4 className="font-medium mt-4 mb-2">Items</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDonation.items.map(item => (
                    <span key={item} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Additional Information</h4>
                <p className="mb-4">{selectedDonation.description || 'No additional description'}</p>
                
                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-medium">Points Earned:</span>
                    <span className="font-bold">{selectedDonation.points} points</span>
                  </div>
                </div>

                {selectedDonation.witnessName && (
                  <>
                    <h4 className="font-medium mb-2">Witness Details</h4>
                    <p><span className="font-medium">Name:</span> {selectedDonation.witnessName}</p>
                    <p><span className="font-medium">Contact:</span> {selectedDonation.witnessContact}</p>
                  </>
                )}

                {selectedDonation.photoProof && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Photo Proof</h4>
                    <img 
                      src={selectedDonation.photoProof} 
                      alt="Donation proof" 
                      className="max-w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
                
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (selectedDonation.status === 'available') {
                        handleClaimDonation(selectedDonation.id);
                      }
                      setSelectedDonation(null);
                    }}
                    className={`w-full py-2 rounded-lg ${
                      selectedDonation.status === 'available'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    disabled={selectedDonation.status !== 'available'}
                  >
                    {selectedDonation.status === 'available' ? 'Claim This Donation' : 'Already Claimed'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityDonationSystem;