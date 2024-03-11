import BASE_URL from './config';

export const checkIn = async (checkInData) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions/check-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkInData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Check In failed'); 
    }
  } catch (error) {
    console.error(error);
    alert('Error during Check In. Please try again.'); 
  }
};

export const editCheckIn = async (updatedCheckIn) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions/check-in`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCheckIn),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Edit CheckIn failed');
    }
  } catch (error) {
    throw new Error('Error during Edit CheckIn. Please try again.');
  }
};

export const checkout = async (username, id) => {
  try {
    const apiEndpoint = `${BASE_URL}/transactions/check-out`;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, id }),
    };

    const response = await fetch(apiEndpoint, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Checkout failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error during checkout');
  }
};
