import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';

function App() {
  // ตรวจสอบว่ามีข้อมูลในเครื่องไหม
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* หน้าแรก: ถ้าล็อกอินแล้วไป Home ถ้ายังให้ไป Profile เพื่อเข้าสู่ระบบ */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" /> : <Navigate to="/Profile" />} 
        />
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PlantDetail/:id" element={<PlantDetail />} />
        
        {/* ดักหน้าอื่นๆ ให้กลับไปหน้าแรก */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;