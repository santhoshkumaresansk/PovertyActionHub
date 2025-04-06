import { useState, useRef } from 'react';
import { FiUpload, FiCheckCircle, FiXCircle, FiImage, FiBook, FiHome, FiAward } from 'react-icons/fi';
import axios from 'axios';

const Verification = () => {
    const [verificationType, setVerificationType] = useState('venue');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const verificationTypes = [
        { id: 'venue', name: 'Venue Proof', icon: <FiHome className="mr-2" /> },
        { id: 'books', name: 'Books Donation', icon: <FiBook className="mr-2" /> },
        { id: 'achievement', name: 'Achievement Proof', icon: <FiAward className="mr-2" /> }
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            setError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError('');
        setVerificationResult(null);
    };

    const handleVerification = async () => {
        if (!image) {
            setError('Please select an image first');
            return;
        }

        setIsProcessing(true);
        setError('');
        setVerificationResult(null);

        try {
            // Simulate API call to AI verification service
            const formData = new FormData();
            formData.append('image', image);
            formData.append('type', verificationType);

            // In a real app, you would call your backend API which interfaces with the AI service
            // const response = await axios.post('/api/verify-image', formData);
            
            // Mock response - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock verification results based on type
            const mockResults = {
                venue: {
                    valid: Math.random() > 0.3,
                    details: 'Venue matches the requirements with 92% confidence',
                    metadata: {
                        location: 'New York, NY',
                        capacity: '150 people',
                        accessibility: 'Wheelchair accessible'
                    }
                },
                books: {
                    valid: Math.random() > 0.3,
                    details: 'Verified 24 books donated on October 15, 2023',
                    metadata: {
                        count: 24,
                        condition: 'Good',
                        categories: ['Fiction', 'Educational']
                    }
                },
                achievement: {
                    valid: Math.random() > 0.3,
                    details: 'Certificate of completion verified',
                    metadata: {
                        program: 'Community Leadership',
                        date: 'October 2023',
                        issuer: 'Local Community Board'
                    }
                }
            };

            setVerificationResult(mockResults[verificationType]);
        } catch (err) {
            setError('Verification failed. Please try again.');
            console.error('Verification error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const resetVerification = () => {
        setImage(null);
        setPreview('');
        setVerificationResult(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h1 className="text-3xl font-bold text-center mb-8">AI-Powered Verification System</h1>
                
                {/* Verification Type Selector */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Select Verification Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {verificationTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setVerificationType(type.id)}
                                className={`flex items-center justify-center p-4 border rounded-lg transition-all ${
                                    verificationType === type.id 
                                        ? 'border-blue-500 bg-blue-50 text-blue-600' 
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                {type.icon}
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Upload Area */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Upload Proof Image</h2>
                    <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                            preview ? 'border-gray-300' : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                        }`}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {preview ? (
                            <div className="relative">
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="max-h-64 mx-auto rounded-lg mb-4"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetVerification();
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                >
                                    <FiXCircle />
                                </button>
                            </div>
                        ) : (
                            <>
                                <FiUpload className="text-4xl mx-auto text-blue-500 mb-4" />
                                <p className="text-lg">Click to upload or drag and drop</p>
                                <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG (Max 5MB)</p>
                            </>
                        )}
                    </div>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                </div>

                {/* Verification Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleVerification}
                        disabled={!image || isProcessing}
                        className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
                            !image || isProcessing 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            <>
                                <FiCheckCircle className="mr-2" />
                                Verify with AI
                            </>
                        )}
                    </button>
                </div>

                {/* Verification Results */}
                {verificationResult && (
                    <div className={`p-6 rounded-lg ${
                        verificationResult.valid 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                    }`}>
                        <div className="flex items-start">
                            <div className={`p-2 rounded-full mr-4 ${
                                verificationResult.valid 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-red-100 text-red-600'
                            }`}>
                                {verificationResult.valid ? (
                                    <FiCheckCircle className="text-2xl" />
                                ) : (
                                    <FiXCircle className="text-2xl" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {verificationResult.valid ? 'Verification Successful!' : 'Verification Failed'}
                                </h3>
                                <p className="mb-4">{verificationResult.details}</p>
                                
                                {verificationResult.metadata && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        {Object.entries(verificationResult.metadata).map(([key, value]) => (
                                            <div key={key} className="bg-white p-3 rounded-lg shadow-sm">
                                                <p className="text-sm font-medium text-gray-500 capitalize">{key}</p>
                                                <p className="font-medium">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Verification Type Guides */}
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">What to Verify</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center mb-3">
                                <FiHome className="text-blue-500 mr-2" />
                                <h3 className="font-medium">Venue Proof</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Upload images showing the venue location, capacity, and facilities. 
                                Include signage or documents that verify the venue details.
                            </p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center mb-3">
                                <FiBook className="text-green-500 mr-2" />
                                <h3 className="font-medium">Books Donation</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Photograph the books with visible titles and condition. 
                                Include a handwritten note with date and your name for verification.
                            </p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center mb-3">
                                <FiAward className="text-purple-500 mr-2" />
                                <h3 className="font-medium">Achievement Proof</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Upload certificates, awards, or completion documents. 
                                Ensure all relevant details (name, date, issuer) are visible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;