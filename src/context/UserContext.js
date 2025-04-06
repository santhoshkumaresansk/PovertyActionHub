import { createContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock AI verification service
const mockAIVerification = {
  analyzeImage: (imageFile) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock analysis - in real app this would call your AI API
        const itemTypes = ['Books', 'Clothes', 'Food', 'Money', 'Other'];
        const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        const randomQty = Math.floor(Math.random() * 10) + 1;
        
        resolve({
          success: true,
          itemType: randomType,
          quantity: randomQty,
          confidence: (Math.random() * 0.5 + 0.5).toFixed(2) // 50-100% confidence
        });
      }, 2000); // Simulate processing delay
    });
  }
};

// Points calculation system
const calculatePoints = (itemType, quantity) => {
  const pointValues = {
    'Books': 5,
    'Clothes': 3,
    'Food': 4,
    'Money': 1, // 1 point per dollar
    'Other': 2
  };
  return quantity * (pointValues[itemType] || 1);
};

// Badge earning logic
const checkBadges = (points) => {
  const badges = [];
  if (points >= 100) badges.push('Gold Donor');
  if (points >= 50) badges.push('Silver Donor');
  if (points >= 10) badges.push('Bronze Donor');
  return badges;
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('povertyAwarenessUser');
    return saved ? JSON.parse(saved) : {
      name: '',
      points: 0,
      badges: [],
      donations: [],
      leaderboardPosition: 0,
      verificationPhotos: []
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('povertyAwarenessUser', JSON.stringify(user));
  }, [user]);

  // Mock AI verification flow
  const verifyDonation = async (imageFile, manualItemType, manualQuantity) => {
    setUser(prev => ({
      ...prev,
      verificationPhotos: [...prev.verificationPhotos, {
        image: URL.createObjectURL(imageFile),
        status: 'processing',
        itemType: manualItemType,
        quantity: manualQuantity
      }]
    }));

    try {
      const analysis = await mockAIVerification.analyzeImage(imageFile);
      
      const pointsEarned = calculatePoints(
        manualItemType || analysis.itemType,
        manualQuantity || analysis.quantity
      );

      const newBadges = checkBadges(user.points + pointsEarned)
        .filter(b => !user.badges.includes(b));

      setUser(prev => ({
        ...prev,
        points: prev.points + pointsEarned,
        badges: [...prev.badges, ...newBadges],
        donations: [...prev.donations, {
          date: new Date().toISOString(),
          itemType: manualItemType || analysis.itemType,
          quantity: manualQuantity || analysis.quantity,
          points: pointsEarned,
          verified: true,
          image: URL.createObjectURL(imageFile)
        }],
        verificationPhotos: prev.verificationPhotos.map(photo => 
          photo.image === URL.createObjectURL(imageFile) 
            ? { ...photo, status: 'verified' } 
            : photo
        )
      }));

      return { success: true, pointsEarned, newBadges };
    } catch (error) {
      setUser(prev => ({
        ...prev,
        verificationPhotos: prev.verificationPhotos.map(photo => 
          photo.image === URL.createObjectURL(imageFile) 
            ? { ...photo, status: 'failed' } 
            : photo
        )
      }));
      return { success: false, error: 'Verification failed' };
    }
  };

  // Animation variants for UI
  const animationVariants = {
    pointsIncrease: {
      scale: [1, 1.2, 1],
      color: ['#fff', '#4ade80', '#fff'],
      transition: { duration: 0.5 }
    },
    newBadge: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.7 }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, verifyDonation, animationVariants }}>
      {children}
    </UserContext.Provider>
  );
};