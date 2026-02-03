import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* หน้าแรก: ถ้ายังไม่ล็อกอิน ให้ไปที่ Profile เสมอ */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" replace /> : <Navigate to="/Profile" replace />} 
        />
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        
        {/* ถ้าหลงทางให้กลับไปหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;