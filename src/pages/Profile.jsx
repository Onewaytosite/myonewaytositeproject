import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, IdCard, ChevronLeft, Home as HomeIcon } from "lucide-react";
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

  const onLoginComplete = () => {
    // รีโหลดข้อมูล user ใหม่หลังจากบันทึก
    const savedData = localStorage.getItem('user_profile_info');
    setUser(JSON.parse(savedData));
    // ดีดไปหน้า Home
    window.location.replace('#/Home'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('user_profile_info');
    setUser(null);
    window.location.replace('#/Profile');
  };

  // 1. ถ้ายังไม่ได้ Login ให้แสดงฟอร์มม่วงๆ ที่เราทำไว้
  if (!user) {
    return <ProfileSetupForm onComplete={onLoginComplete} />;
  }

  // 2. ถ้า Login แล้ว ให้แสดงหน้า Profile ที่สวยงาม (ธีมม่วง)
  return (
    <div className="flex flex-col min-h-screen bg-[#6366f1] w-full">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/Home')} className="text-gray-600">
           <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-gray-700">ข้อมูลส่วนตัว</span>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        {/* Profile Card */}
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative mt-10">
          {/* Avatar Area */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white">
              <User size={40} className="text-white" />
            </div>
          </div>

          <div className="text-center mt-12 mb-8">
            <h2 className="text-2xl font-black text-slate-800">{user.full_name}</h2>
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              {user.position === 'student' ? 'นักศึกษา' : 'บุคลากร'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Mail className="text-indigo-500" size={20} />
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-bold uppercase">อีเมล</p>
                <p className="text-slate-700 font-medium truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <IdCard className="text-indigo-500" size={20} />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">รหัสประจำตัว</p>
                <p className="text-slate-700 font-medium">{user.student_id || 'ไม่ระบุ'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={() => navigate('/Home')}
              className="w-full bg-[#5c56d6] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <HomeIcon size={20} /> กลับหน้าหลัก
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-red-50"
            >
              <LogOut size={20} /> ออกจากระบบ
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar ล่าง (ให้เหมือนหน้าแรก) */}
      <div className="bg-white p-4 rounded-t-[2rem] flex justify-around items-center shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <button onClick={() => navigate('/Home')} className="flex flex-col items-center text-gray-400">
          <HomeIcon size={24} />
          <span className="text-[10px] font-bold">หน้าหลัก</span>
        </button>
        <button className="flex flex-col items-center text-[#5c56d6]">
          <User size={24} />
          <span className="text-[10px] font-bold">โปรไฟล์</span>
        </button>
      </div>
    </div>
  );
}