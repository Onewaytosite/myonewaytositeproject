import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app'; // ต้องลงเพิ่ม: npm install @capacitor/app
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';

// สร้าง Component ย่อยเพื่อใช้ hook ภายใน Router
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (location.pathname === '/Home' || location.pathname === '/Profile') {
        // ถ้าอยู่หน้าหลักๆ แล้วกด back ให้ปิดแอป (หรือถ้านายอยากให้เด้งไป Home เสมอก็แก้ตรงนี้)
        CapApp.exitApp();
      } else {
        // ถ้าอยู่หน้าย่อย (เช่น Detail) ให้ย้อนกลับไปหน้าก่อนหน้า
        navigate(-1);
      }
    });

    return () => {
      handler.then(h => h.remove());
    };
  }, [location, navigate]);

  return null;
}

function App() {
  const isAuthenticated = !!localStorage.getItem('user_profile_info');

  return (
    <Router>
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/Home" /> : <Navigate to="/Profile" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PlantDetail/:id" element={<PlantDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;