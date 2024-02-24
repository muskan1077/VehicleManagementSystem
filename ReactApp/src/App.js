import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/login';
import { UserProvider } from './context/userContext';
import Dashboard from './components/Dashboard/dashboard';
import { TransactionsProvider } from './context/transactionsContext';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <TransactionsProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </TransactionsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
