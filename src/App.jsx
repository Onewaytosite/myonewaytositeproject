import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';

function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // สร้างฟังก์ชัน Listener
    const backListener = CapApp.addListener('backButton', (data) => {
      // ตรวจสอบ Path ปัจจุบัน
      const currentPath = location.pathname;

      if (currentPath === '/Home' || currentPath === '/Profile' || currentPath === '/') {
        // ถ้าอยู่หน้าหลัก ให้ปิดแอปทันที
        CapApp.exitApp();
      } else {
        // ถ้าอยู่หน้าย่อย (เช่น PlantDetail) ให้ย้อนกลับไปหน้าก่อนหน้า 1 step
        navigate(-1);
      }
    });

    // คืนค่าฟังก์ชันเพื่อลบ Listener เมื่อไม่ได้ใช้ (Clean up)
    return () => {
      backListener.then(res => res.remove());
    };
  }, [location, navigate]); // ใส่ dependencies ให้ครบเพื่อให้ทำงานตามหน้าปัจจุบัน

  return null;
}

function App() {
  // ตรวจสอบว่าเคยกรอกโปรไฟล์หรือยัง
  const isAuthenticated = !!localStorage.getItem('user_profile_info');

  return (
    <Router>
      {/* ต้องวาง BackButtonHandler ไว้ใต้ Router เพื่อให้ใช้ hooks ได้ */}
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