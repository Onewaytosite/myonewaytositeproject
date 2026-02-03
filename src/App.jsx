import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';
import AddPlant from './pages/AddPlant';
import EditPlant from './pages/EditPlant';

function App() {
  // เช็คสถานะล็อกอิน
  const isAuthenticated = !!localStorage.getItem('user_profile_info');

  return (
    <Router>
      <Routes>
        {/* หน้าแรก: ถ้าล็อกอินแล้วไป Home ถ้ายังไป Profile */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/Home" /> : <Navigate to="/Profile" />} 
        />
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PlantDetail/:id" element={<PlantDetail />} />
        <Route path="/AddPlant" element={<AddPlant />} />
        <Route path="/EditPlant/:id" element={<EditPlant />} />

        {/* กันเหนียวหน้าขาวเมื่อหา URL ไม่เจอ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;