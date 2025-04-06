// src/DonationDelivery.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "./api";

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

// Map Updater Component (Auto-centers map on location change)
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
  errors,
  onSubmit,
  onItemToggle,
  onFormChange,
}) => (
  <div className="donation-form">
    <h3>Donation Details</h3>
    
    <div className="item-selector">
      <h4>Select Items to Donate:</h4>
      <div className="item-buttons">
        {availableItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`item-button ${donationItems.includes(item) ? "selected" : ""}`}
            onClick={() => onItemToggle(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {donationItems.length > 0 && (
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Your Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={onFormChange}
          />
        </div>

        {selectedCenter && (
          <div className="selected-center-info">
            <h4>Selected Center:</h4>
            <p><strong>{selectedCenter.name}</strong></p>
            <p>{selectedCenter.address}</p>
            <p>Accepts: {selectedCenter.accepting.join(", ")}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedCenter}
          className="submit-button"
        >
          Submit Donation
        </button>
      </form>
    )}
  </div>
);

// Main Component
const DonationDelivery = () => {
  const [location, setLocation] = useState(null);
  const [donationCenters, setDonationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [donationItems, setDonationItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapType, setMapType] = useState("normal");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const availableItems = [
    "Clothes", "Books", "Food", "Toys", 
    "Medical Supplies", "Furniture", "Electronics"
  ];

  // Fetch user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported. Using approximate location.");
      fetchApproximateLocation();
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
        setError(null);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Could not get precise location. Using approximate location.");
        fetchApproximateLocation();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Fetch donation centers when location changes
  useEffect(() => {
    if (!location) return;

    const fetchCenters = async () => {
      try {
        const centers = await api.getDonationCenters(location[0], location[1]);
        setDonationCenters(centers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load donation centers. Please try again later.");
        setLoading(false);
      }
    };

    fetchCenters();
  }, [location]);

  const fetchApproximateLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setLocation([data.latitude, data.longitude]);
      setLoading(false);
    } catch (err) {
      setError("Could not determine your location.");
      setLoading(false);
    }
  };

  const handleItemToggle = (item) => {
    setDonationItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const donationData = {
        ...formData,
        centerId: selectedCenter.id,
        items: donationItems,
        location,
      };

      await api.submitDonation(donationData);
      alert(
        `Donation submitted!\n\n${selectedCenter.name} will contact you at ${formData.phone}.`
      );
      
      // Reset form
      setShowForm(false);
      setDonationItems([]);
      setFormData({ name: "", phone: "", notes: "" });
    } catch (err) {
      setError("Failed to submit donation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="donation-app">
      <header>
        <h1>🧥 Donation Delivery System</h1>
        <p>Find nearby centers and donate items easily</p>
      </header>

      <div className="controls">
        <button
          onClick={() => setMapType(mapType === "normal" ? "satellite" : "normal")}
          className="toggle-map-button"
        >
          {mapType === "normal" ? "Satellite View" : "Normal View"}
        </button>

        {location && (
          <button
            onClick={() => setShowForm(!showForm)}
            className={`donation-button ${showForm ? "cancel" : "start"}`}
          >
            {showForm ? "Cancel" : "Start Donation"}
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {showForm && (
        <DonationForm
          selectedCenter={selectedCenter}
          donationItems={donationItems}
          availableItems={availableItems}
          formData={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onItemToggle={handleItemToggle}
          onFormChange={handleFormChange}
        />
      )}

      {location && !loading && (
        <div className="map-container">
          <MapContainer center={location} zoom={15} className="map">
            <MapUpdater location={location} />
            
            <TileLayer
              url={
                mapType === "normal"
                  ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              }
              attribution={
                mapType === "normal"
                  ? '&copy; OpenStreetMap contributors'
                  : '&copy; Esri, Maxar, Earthstar Geographics'
              }
            />

            <Marker position={location} icon={userIcon}>
              <Popup>📍 Your Location</Popup>
            </Marker>

            {donationCenters.map((center) => (
              <Marker
                key={center.id}
                position={center.location}
                icon={centerIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedCenter(center);
                    if (showForm) {
                      setDonationItems((prev) =>
                        prev.filter((item) => center.accepting.includes(item))
                      );
                    }
                  },
                }}
              >
                <Popup>
                  <div className="center-popup">
                    <h4>{center.name}</h4>
                    <p>{center.address}</p>
                    <p>Accepts: {center.accepting.join(", ")}</p>
                    {showForm && (
                      <button
                        onClick={() => setSelectedCenter(center)}
                        className="select-center-button"
                      >
                        Select This Center
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {selectedCenter && !showForm && (
            <div className="selected-center-card">
              <h3>{selectedCenter.name}</h3>
              <p>{selectedCenter.address}</p>
              <p>Accepts: {selectedCenter.accepting.join(", ")}</p>
              <button
                onClick={() => setShowForm(true)}
                className="donate-here-button"
              >
                Donate Here
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationDelivery;