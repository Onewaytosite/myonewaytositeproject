import React from 'react';
// ใช้ HashRouter แทน BrowserRouter เพื่อกันหน้าขาวบนมือถือ
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  // เช็คว่าเคยล็อกอินหรือยัง
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* หน้าแรก: ถ้ามี Session ให้ไป Home ถ้าไม่มีให้ไปหน้าล็อกอิน (Profile) */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" replace /> : <Navigate to="/Profile" replace />} 
        />
        
        {/* เส้นทางไปหน้า Home */}
        <Route path="/Home" element={<Home />} />
        
        {/* เส้นทางไปหน้า Profile (ที่มีฟอร์มล็อกอินอยู่ข้างใน) */}
        <Route path="/Profile" element={<Profile />} />

        {/* กันเหนียว: ถ้า URL ผิดให้เด้งกลับหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;