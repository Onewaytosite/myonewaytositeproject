import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSetupForm from '../components/profile/ProfileSetupForm';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('user_profile_info');
    if (savedData) {
      setUser(JSON.parse(savedData));
    }
  }, []);

  // ฟังก์ชันนี้จะถูกเรียกเมื่อกดปุ่มใน ProfileSetupForm
  const onLoginComplete = () => {
    // ใช้ window.location.replace สำหรับ Capacitor จะชัวร์สุดเรื่องหน้าขาว
    window.location.replace('#/Home'); 
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <ProfileSetupForm onComplete={onLoginComplete} />
      </div>
    );
  }

  // ถ้าล็อกอินแล้วแต่หลุดมาหน้านี้ ให้ปุ่มกดไป Home ได้
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl mb-4">คุณเข้าสู่ระบบแล้ว</h2>
      <button 
        onClick={() => navigate('/Home')}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        เข้าสู่หน้าหลัก
      </button>
    </div>
  );
}