import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// นำเข้าหน้า Page ทั้งหมด
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlantDetail from './pages/PlantDetail';
import Register from './pages/Register';
import Login from './pages/Login';

function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backListener = CapApp.addListener('backButton', () => {
      const path = location.pathname;
      if (path === '/Home' || path === '/' || path === '/Login') {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      backListener.then(res => res.remove());
    };
  }, [location, navigate]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <Router>
      <BackButtonHandler />
      
      <Routes>
        {/* หน้าแรก: ถ้า Login แล้วไป Home ถ้ายังไม่ Login ไปหน้า Login */}
        <Route path="/" element={user ? <Navigate to="/Home" /> : <Login />} />
        
        {/* หน้าสมัครสมาชิก */}
        <Route path="/register" element={<Register />} />

        {/* หน้าหลักของแอป */}
        <Route path="/Home" element={user ? <Home /> : <Navigate to="/" />} />
        
        {/* หน้าโปรไฟล์ */}
        <Route path="/Profile" element={user ? <Profile /> : <Navigate to="/" />} />
        
        {/* หน้ารายละเอียดต้นไม้ */}
        <Route path="/plant/:id" element={user ? <PlantDetail /> : <Navigate to="/" />} />

        {/* ดักจับ Path อื่นๆ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;