import React, { useState, useEffect } from 'react';
import { useTransactions } from '../../context/transactionsContext';
import { useUser } from '../../context/userContext';
import '../../css/checkInForm.css';

const CheckInForm = ({ onClose, editData }) => {
  const { updateCheckInData } = useTransactions();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    id: editData ? editData.id : null,
    username: user ? user.username : '',
    vehicleNumber: editData ? editData.vehicleNumber : '',
    deliveryChallanNumber: editData ? editData.deliveryChallanNumber : '',
    purchaseOrderNumber: editData ? editData.purchaseOrderNumber : '',
  });

  const isEditMode = !!editData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Checking if the user is logged in (username is present)
      if (!user || !user.username) {
        console.error('User is not logged in. CheckIn operation not allowed.');
        return;
      }

      const apiEndpoint = isEditMode
        ? `http://localhost:5000/transactions/check-in`
        : 'http://localhost:5000/transactions/check-in';

      const httpMethod = isEditMode ? 'PUT' : 'POST';

      const requestOptions = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(apiEndpoint, requestOptions);

      if (response.ok) {
        const data = await response.json();
        updateCheckInData(data);
        onClose(); 
      } else {
        const errorData = await response.json();

        // Checking for status 400 and displaying the error message
        if (response.status === 400) {
          alert(errorData.message || 'Check In failed');
        } else {
          console.error(errorData.message || 'Check In failed');
          alert('An error occurred. Please try again.'); // Displaying a generic error message which can arise due to network failure
        }
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during Check In. Please try again.', error.message);
      alert('An error occurred. Please try again.'); // Displaying a generic error message which can arise due to network failure
    }
  };

  useEffect(() => {
    // Seting initial form data when editData changes
    if (isEditMode) {
      setFormData({
        id: editData.id,
        username: user ? user.username : '',
        vehicleNumber: editData.vehicleNumber,
        deliveryChallanNumber: editData.deliveryChallanNumber,
        purchaseOrderNumber: editData.purchaseOrderNumber,
      });
    } else {
      // Reseting form data for new check-in
      setFormData({
        id: null,
        username: user ? user.username : '',
        vehicleNumber: '',
        deliveryChallanNumber: '',
        purchaseOrderNumber: '',
      });
    }
  }, [editData, user, isEditMode]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form>
          <label>
            Vehicle Number:
            <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} />
          </label>
          <br />
          <label>
            Delivery Challan Number:
            <input type="text" name="deliveryChallanNumber" value={formData.deliveryChallanNumber} onChange={handleChange} />
          </label>
          <br />
          <label>
            Purchase Order Number:
            <input type="text" name="purchaseOrderNumber" value={formData.purchaseOrderNumber} onChange={handleChange} />
          </label>
          <br />
          <button type="button" onClick={handleSubmit}>
            {isEditMode ? 'Edit Check In' : 'Check In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckInForm;
