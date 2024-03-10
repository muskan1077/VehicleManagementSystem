import React, { useEffect, useState } from 'react';
import '../../css/dashboard.css';
import CheckInForm from './checkInForm';
import CheckInTable from './checkInTable';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../context/transactionsContext';
import { checkout } from '../../services/transactionsService'; 
import { useUser } from '../../context/userContext';
import BASE_URL from '../../services/config';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isCheckInFormVisible, setCheckInFormVisibility] = useState(false);
  const [editData, setEditData] = useState(null);
  const { checkInData, updateCheckInData } = useTransactions();

  const fetchCheckIns = async () => {
    try {
      const response = await fetch(`${BASE_URL}/transactions/check-ins/${user.username}`);
      const data = await response.json();
      updateCheckInData(data);
    } catch (error) {
      console.error('Error fetching check-ins:', error.message);
    }
  };

  useEffect(() => {
    // Checking if user is logged in before accessing username
    if (!user || !user.username) {
      navigate('/');
    } else {
      fetchCheckIns();
    }
  }, [user, navigate]);

  const handleCheckInClick = () => {
    setCheckInFormVisibility(true);
    setEditData(null); // Reseting edit data when opening the form for a new check-in
  };

  const handleCheckInFormClose = () => {
    setCheckInFormVisibility(false);
    fetchCheckIns(); // Calling fetchCheckIns after closing the form
  };

  const handleEdit = (editData) => {
    setEditData(editData);
    setCheckInFormVisibility(true); // Opening the form for editing
  };

  const handleCheckout = async (id) => {
    try {
      // Calling the checkout API 
      await checkout(user.username, id);

      // Fetching updated check-ins after successful checkout
      await fetchCheckIns();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <span className="logo">Dashboard</span>
        <div className="header-right">
          <button className="button" onClick={handleCheckInClick}>
            Check In
          </button>
          <button className="button" onClick={() => navigate('/')}>
            Sign Out
          </button>
        </div>
      </header>
      <div className="content">
        <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
        {checkInData && checkInData.checkIns ? (
          <div>
            <h2>Checked In Items</h2>
            <CheckInTable checkIns={checkInData.checkIns.filter(item => !item.isCheckedOut)} 
              onEdit={handleEdit}
              onCheckout={handleCheckout} 
            />
            <h2>Checked Out Items</h2>
            <CheckInTable checkIns={checkInData.checkIns.filter(item => item.isCheckedOut)} />
          </div>
        ) : (
          <p>No records found, please Check In</p>
        )}
      </div>
      {isCheckInFormVisible && <CheckInForm onClose={handleCheckInFormClose} editData={editData} />}
    </div>
  );
};

export default Dashboard;
