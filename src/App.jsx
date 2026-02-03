import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// เช็คว่าหน้าเหล่านี้มีจริงในโฟลเดอร์ pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';

function App() {
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* หน้าแรก: ถ้ายังไม่ล็อกอิน ให้ไปที่หน้า Profile เสมอ */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" replace /> : <Navigate to="/Profile" replace />} 
        />
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PlantDetail/:id" element={<PlantDetail />} />
        
        {/* ถ้าไปหน้าอื่นที่ไม่รู้จัก ให้ดีดกลับหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;