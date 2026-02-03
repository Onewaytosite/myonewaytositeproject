import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* ถ้ามีข้อมูล User ให้ไป Home ถ้าไม่มีไป Profile (หน้าล็อกอิน) */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" /> : <Navigate to="/Profile" />} 
        />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;