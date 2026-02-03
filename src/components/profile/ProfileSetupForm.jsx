import React, { useState } from 'react';
import { User, ChevronDown, Save } from "lucide-react";

export default function ProfileSetupForm({ onComplete }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    position: 'student',
    student_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // บันทึกข้อมูลเข้า localStorage
    localStorage.setItem('user_profile_info', JSON.stringify(formData));
    // ดีดไปหน้า Home
    if (onComplete) onComplete();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#6366f1] w-full">
      {/* Header ส่วนบนสุด */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-1 rounded-md text-white font-bold text-xs">SKTC</div>
          <span className="font-bold text-gray-700">SKTC GARDEN</span>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6">
        {/* กล่องม่วง Title */}
        <div className="w-full max-w-sm bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-8 rounded-[2rem] text-center mb-6 shadow-2xl relative overflow-hidden border border-white/20">
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white mb-2">ตั้งค่าโปรไฟล์</h1>
            <p className="text-indigo-100 text-sm opacity-80">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* ฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 space-y-5 shadow-xl">
          {/* ชื่อ-นามสกุล */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">ชื่อ-นามสกุล</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="ชื่อ - นามสกุล"
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 shadow-inner"
                required
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>

          {/* อีเมล */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">อีเมล</label>
            <input 
              type="email"
              placeholder="example@sktc.ac.th"
              className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 shadow-inner"
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* สถานะ/ตำแหน่ง */}
          <div className="grid grid-cols-1 gap-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">สถานะ</label>
            <div className="relative">
              <select 
                className="w-full bg-gray-50 border-none p-4 rounded-2xl appearance-none outline-none text-gray-700 shadow-inner cursor-pointer"
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              >
                <option value="student">นักศึกษา</option>
                <option value="staff">อาจารย์ / บุคลากร</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* รหัสนักศึกษา/พนักงาน */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">รหัสประจำตัว</label>
            <input 
              type="text"
              placeholder="110XXXXTXX"
              className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 shadow-inner"
              required
              onChange={(e) => setFormData({...formData, student_id: e.target.value})}
            />
          </div>

          {/* ปุ่มตกลง */}
          <button 
            type="submit" 
            className="w-full bg-[#5c56d6] hover:bg-[#4a44b5] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all mt-4"
          >
            <Save size={20} />
            Login
          </button>
        </form>
      </div>

      {/* Tab Bar ด้านล่าง (สวยๆ ตามรูป) */}
      <div className="bg-white p-4 rounded-t-[2rem] flex justify-around items-center shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center text-gray-400">
          <div className="p-1"><ChevronDown className="rotate-180" size={20} /></div>
          <span className="text-[10px] font-bold">หน้าหลัก</span>
        </div>
        <div className="flex flex-col items-center text-[#5c56d6]">
          <User size={24} />
          <span className="text-[10px] font-bold">โปรไฟล์</span>
        </div>
      </div>
    </div>
  );
}