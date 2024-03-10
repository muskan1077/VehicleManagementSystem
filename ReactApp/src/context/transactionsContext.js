import React, { createContext, useContext, useState } from 'react';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [checkInData, setCheckInData] = useState(null);

  const updateCheckInData = (data) => {
    setCheckInData(data);
  };

  const editCheckInData = (updatedCheckIn) => {
    setCheckInData((prevData) => {
      const updatedData = prevData.map((checkIn) =>
        checkIn.id === updatedCheckIn.id ? updatedCheckIn : checkIn
      );
      return updatedData;
    });
  };

  return (
    <TransactionsContext.Provider value={{ checkInData, updateCheckInData, editCheckInData }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  return useContext(TransactionsContext);
};
