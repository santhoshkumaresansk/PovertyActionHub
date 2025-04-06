import React, { useState } from "react";
import { FiInfo, FiGift, FiBook, FiDollarSign, FiCheckCircle } from "react-icons/fi";
import { FaHandHoldingHeart, FaCoins } from "react-icons/fa";

const Donation = () => {
  const [donationType, setDonationType] = useState("");
  const [amount, setAmount] = useState("");
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    condition: "good",
    quantity: 1
  });
  const [otherDetails, setOtherDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("donate");

  const teamId = "TEAM-2023-0451";
  const creditPoints = 150;
  const donationImpact = [
    { amount: "$5", impact: "Feeds a child for 1 day" },
    { amount: "$20", impact: "Provides school supplies for 1 child" },
    { amount: "$50", impact: "Supports a family's basic needs for 1 week" }
  ];

  const handleDonate = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      resetForm();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const resetForm = () => {
    setDonationType("");
    setAmount("");
    setBookDetails({
      title: "",
      author: "",
      condition: "good",
      quantity: 1
    });
    setOtherDetails("");
  };

  const handleBookDetailChange = (e) => {
    const { name, value } = e.target;
    setBookDetails(prev => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <FaHandHoldingHeart className="text-4xl text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Make a Difference</h2>
        <p className="text-gray-600">
          Your contribution helps us create positive change. Choose how you'd like to support our cause.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'donate' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('donate')}
        >
          Donate Now
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'impact' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('impact')}
        >
          Your Impact
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}
        >
          Donation History
        </button>
      </div>

      {activeTab === 'donate' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          {/* User Info */}
          <div className="bg-indigo-50 p-4 rounded-lg mb-6 flex items-start">
            <FiInfo className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-indigo-800">Team ID: <span className="font-bold">{teamId}</span></p>
              <p className="text-sm text-indigo-700">You've earned <span className="font-bold">{creditPoints} credit points</span> from previous donations</p>
            </div>
          </div>

          {/* Donation Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setDonationType("money")}
              className={`p-4 border rounded-lg transition-all ${donationType === "money" ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
            >
              <div className="flex flex-col items-center">
                <FiDollarSign className={`text-2xl mb-2 ${donationType === "money" ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className={`font-medium ${donationType === "money" ? 'text-indigo-700' : 'text-gray-700'}`}>Monetary</span>
              </div>
            </button>
            <button
              onClick={() => setDonationType("books")}
              className={`p-4 border rounded-lg transition-all ${donationType === "books" ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
            >
              <div className="flex flex-col items-center">
                <FiBook className={`text-2xl mb-2 ${donationType === "books" ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className={`font-medium ${donationType === "books" ? 'text-indigo-700' : 'text-gray-700'}`}>Books</span>
              </div>
            </button>
            <button
              onClick={() => setDonationType("other")}
              className={`p-4 border rounded-lg transition-all ${donationType === "other" ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
            >
              <div className="flex flex-col items-center">
                <FiGift className={`text-2xl mb-2 ${donationType === "other" ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className={`font-medium ${donationType === "other" ? 'text-indigo-700' : 'text-gray-700'}`}>Other Items</span>
              </div>
            </button>
          </div>

          {/* Donation Form */}
          {donationType === "money" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                    min="5"
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum donation: $5.00</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <FaCoins className="mr-2" /> Suggested Donations
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 25, 50].map((value) => (
                    <button
                      key={value}
                      onClick={() => setAmount(value.toString())}
                      className={`py-2 px-3 rounded-md text-sm ${amount === value.toString() ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200'}`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {donationType === "books" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input
                  type="text"
                  name="title"
                  value={bookDetails.title}
                  onChange={handleBookDetailChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter book title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={bookDetails.author}
                  onChange={handleBookDetailChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter author name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    name="condition"
                    value={bookDetails.condition}
                    onChange={handleBookDetailChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={bookDetails.quantity}
                    onChange={handleBookDetailChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}

          {donationType === "other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
              <textarea
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Describe what you're donating (clothes, food, etc.)"
              />
              <p className="text-xs text-gray-500 mt-1">Please be as specific as possible about the items and their condition.</p>
            </div>
          )}

          {/* Submit Button */}
          {donationType && (
            <div className="mt-6">
              <button
                onClick={handleDonate}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all flex items-center justify-center ${isSubmitting ? 'opacity-75' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaHandHoldingHeart className="mr-2" />
                    Complete Donation
                  </>
                )}
              </button>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Thank you for your donation!</p>
                <p className="text-sm">You've earned 10 credit points. A confirmation has been sent to your email.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How Your Donation Helps</h3>
          
          <div className="space-y-4">
            {donationImpact.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <FiDollarSign className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.amount}</h4>
                    <p className="text-gray-600">{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Your Donation History Impact</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">3</p>
                <p className="text-sm text-blue-600">Children supported</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">12</p>
                <p className="text-sm text-blue-600">Meals provided</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">5</p>
                <p className="text-sm text-blue-600">Books donated</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Donation History</h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">Monetary Donation</h4>
                      <p className="text-sm text-gray-500">June {15 + item}, 2023</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Completed</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-bold text-indigo-600">${20 * item}.00</span>
                    <span className="text-sm text-gray-600">+{10 * item} credit points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;