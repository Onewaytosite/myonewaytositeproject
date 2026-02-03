import React, { useState, useEffect } from 'react';
import ProfileSetupForm from "@/components/profile/ProfileSetupForm";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, User, IdCard, Mail } from "lucide-react";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user_profile_info');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_profile_info');
    window.location.href = '/Profile';
  };

  // 1. ถ้าไม่มีข้อมูล ให้โชว์ฟอร์มเข้าสู่ระบบ
  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <ProfileSetupForm />
      </div>
    );
  }

  // 2. ถ้ามีข้อมูลแล้ว ให้โชว์หน้าโปรไฟล์ปกติ
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Card className="max-w-md mx-auto border-0 shadow-lg rounded-3xl bg-white overflow-hidden">
        <div className="bg-indigo-600 h-24"></div>
        <CardContent className="relative px-6 pb-8">
          <div className="flex justify-center -mt-12 mb-4">
             <div className="bg-white p-1 rounded-full shadow-md">
                <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center text-indigo-600">
                  <User size={48} />
                </div>
             </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">{userData.full_name}</h2>
            <p className="text-indigo-600 font-medium text-sm">
              {userData.position === 'student' ? 'นักศึกษา' : 'อาจารย์ / บุคลากร'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Mail className="text-slate-400" size={20} />
              <span className="text-slate-600 text-sm">{userData.email}</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <IdCard className="text-slate-400" size={20} />
              <span className="text-slate-600 text-sm">{userData.student_teacher_id}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl transition-colors"
          >
            <LogOut size={20} /> ออกจากระบบ
          </button>
        </CardContent>
      </Card>
    </div>
  );
}