// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DataForm from './components/DataForm';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<DataForm />} />
        <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin" element={admin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;
