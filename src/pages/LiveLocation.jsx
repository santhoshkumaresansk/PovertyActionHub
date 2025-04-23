import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaDonate, FaMapMarkedAlt, FaSatellite, FaTimes, FaCheck, FaSpinner } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Custom Icons
const createCustomIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const userIcon = createCustomIcon("green");
const centerIcon = createCustomIcon("blue");
const selectedCenterIcon = createCustomIcon("red");

// Mock API
const mockApi = {
  getDonationCenters: async (lat, lng) => {
    return [
      {
        id: "1",
        name: "Community Hope Center",
        address: "123 Main St, Anytown",
        location: [lat + 0.01, lng + 0.01],
        accepting: ["Clothes", "Books", "Food"]
      },
      {
        id: "2",
        name: "Shelter Alliance",
        address: "456 Oak Ave, Somewhere",
        location: [lat - 0.01, lng - 0.01],
        accepting: ["Clothes", "Toys", "Furniture"]
      },
      {
        id: "3",
        name: "Food & Care Network",
        address: "789 Pine Rd, Elsewhere",
        location: [lat + 0.02, lng - 0.02],
        accepting: ["Food", "Medical Supplies"]
      }
    ];
  },
  submitDonation: async (data) => {
    console.log("Donation submitted:", data);
    return { success: true };
  }
};

// Map Updater Component
const MapUpdater = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo(location, 15, { duration: 1.5 });
  }, [location, map]);
  return null;
};

// Donation Form Component
const DonationForm = ({
  selectedCenter,
  donationItems,
  availableItems,
  formData,
  onSubmit,
  onItemToggle,
  onFormChange,
  submitting,
  onCancel,
}) => {
  const filteredAvailableItems = availableItems.filter(item => 
    selectedCenter?.accepting?.includes(item)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Donation Details</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>
      
      {selectedCenter && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 flex items-center gap-2">
            <MdLocationOn /> Selected Center:
          </h4>
          <p className="font-medium text-gray-800 mt-1">{selectedCenter.name}</p>
          <p className="text-gray-600 text-sm">{selectedCenter.address}</p>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Accepts:</span> {selectedCenter.accepting.join(", ")}
          </p>
        </div>
      )}

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Select Items to Donate:</h4>
        <div className="flex flex-wrap gap-2">
          {filteredAvailableItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                donationItems.includes(item)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onItemToggle(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={onFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedCenter || submitting}
            className={`flex-1 py-3 px-4 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
              !selectedCenter || submitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <FaCheck /> Submit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Component
const DonationDelivery = () => {
  const [mapType, setMapType] = useState("normal");
  const [location, setLocation] = useState([51.505, -0.09]);
  const [donationCenters, setDonationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [donationItems, setDonationItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  const availableItems = [
    "Clothes", "Books", "Food", "Toys", 
    "Medical Supplies", "Furniture", "Electronics"
  ];

  // Fetch donation centers when component mounts
  useEffect(() => {
    const fetchCenters = async () => {
      const centers = await mockApi.getDonationCenters(location[0], location[1]);
      setDonationCenters(centers);
    };
    fetchCenters();
  }, [location]);

  const handleItemToggle = (item) => {
    setDonationItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const donationData = {
      ...formData,
      centerId: selectedCenter.id,
      items: donationItems,
      location,
    };

    await mockApi.submitDonation(donationData);
    
    alert(
      `Thank you for your donation!\n\n${selectedCenter.name} will contact you at ${formData.phone} to arrange delivery.`
    );
    
    // Reset form
    setShowForm(false);
    setDonationItems([]);
    setFormData({ name: "", phone: "", notes: "" });
    setSubmitting(false);
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
    if (showForm) {
      setDonationItems((prev) =>
        prev.filter((item) => center.accepting.includes(item))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <FaDonate className="text-blue-600" /> Donation Delivery System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find nearby donation centers and schedule your item deliveries easily
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setMapType(mapType === "normal" ? "satellite" : "normal")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          {mapType === "normal" ? (
            <>
              <FaSatellite /> Satellite View
            </>
          ) : (
            <>
              <FaMapMarkedAlt /> Map View
            </>
          )}
        </button>

        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setDonationItems([]);
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${
            showForm
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {showForm ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaDonate /> Start Donation
            </>
          )}
        </button>
      </div>

      {showForm && (
        <DonationForm
          selectedCenter={selectedCenter}
          donationItems={donationItems}
          availableItems={availableItems}
          formData={formData}
          onSubmit={handleSubmit}
          onItemToggle={handleItemToggle}
          onFormChange={handleFormChange}
          submitting={submitting}
          onCancel={() => {
            setShowForm(false);
            setDonationItems([]);
          }}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <MapContainer 
            center={location} 
            zoom={15} 
            className="h-full w-full"
            style={{ position: 'relative' }} // Fix for framer-motion warning
          >
            <MapUpdater location={location} />
            
            <TileLayer
              url={
                mapType === "normal"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              }
              attribution={
                mapType === "normal"
                  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  : '&copy; <a href="https://www.esri.com/">Esri</a>'
              }
            />

            <Marker position={location} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">📍 Your Location</p>
                  <p className="text-xs text-gray-500">
                    {location[0].toFixed(4)}, {location[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            {donationCenters.map((center) => (
              <Marker
                key={center.id}
                position={center.location}
                icon={selectedCenter?.id === center.id ? selectedCenterIcon : centerIcon}
                eventHandlers={{
                  click: () => handleCenterSelect(center),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h4 className="font-semibold text-gray-800">{center.name}</h4>
                    <p className="text-sm text-gray-600">{center.address}</p>
                    <p className="text-xs mt-1">
                      <span className="font-medium">Accepts:</span> {center.accepting.join(", ")}
                    </p>
                    <button
                      onClick={() => handleCenterSelect(center)}
                      className="mt-2 w-full py-1 px-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      Select This Center
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {selectedCenter && !showForm && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedCenter.name}</h3>
                <p className="text-gray-600 mt-1">{selectedCenter.address}</p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Accepts:</span> {selectedCenter.accepting.join(", ")}
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaDonate /> Donate Here
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDelivery;