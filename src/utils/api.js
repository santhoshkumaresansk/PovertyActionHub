export const submitDonation = async (donationData) => {
    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        body: JSON.stringify(donationData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          points: data.points || 0, // Assuming your backend returns points
        };
      } else {
        return {
          success: false,
          message: data.message || 'Something went wrong!',
        };
      }
    } catch (error) {
      console.error('Error during donation submission:', error);
      return {
        success: false,
        message: error.message || 'An error occurred!',
      };
    }
  };
  