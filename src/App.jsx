import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ตรวจสอบชื่อไฟล์ให้ตรงเป๊ะ (ตัวเล็ก-ใหญ่มีผล)
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';

function App() {
  // ฟังก์ชันเช็คสถานะการเข้าสู่ระบบ
  // ใช้ความสามารถของสเตทเล็กน้อยเพื่อให้ชัวร์
  const userSession = localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* 1. หน้าแรกสุด: ถ้าเจอข้อมูล user ให้ส่งไป Home ถ้าไม่เจอให้ไป Profile (หน้าล็อกอิน) */}
        <Route 
          path="/" 
          element={userSession ? <Navigate to="/Home" replace /> : <Navigate to="/Profile" replace />} 
        />
        
        {/* 2. หน้าหลักสวนพฤกษศาสตร์ */}
        <Route path="/Home" element={<Home />} />
        
        {/* 3. หน้าโปรไฟล์ / หน้าเข้าสู่ระบบ */}
        <Route path="/Profile" element={<Profile />} />
        
        {/* 4. หน้าแสดงรายละเอียดต้นไม้ */}
        <Route path="/PlantDetail/:id" element={<PlantDetail />} />
        
        {/* 5. กรณีเข้าหน้ามั่ว (Error 404) ให้ดีดกลับไปหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;