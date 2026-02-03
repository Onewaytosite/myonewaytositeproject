import React, { useState } from 'react';
import { LogIn } from "lucide-react";

export default function ProfileSetupForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile_info', JSON.stringify(formData));
    window.location.href = '/Home';
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-slate-100">
      <div className="bg-indigo-600 p-8 text-white text-center">
        <h2 className="text-2xl font-bold">เข้าสู่ระบบ</h2>
        <p className="text-indigo-100 text-sm mt-2">ยินดีต้อนรับสู่ SKTC Garden</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล</label>
          <input 
            type="text"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="กรอกชื่อ - นามสกุล"
            required 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
          <input 
            type="email"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="example@sktc.ac.th"
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-200"
        >
          <LogIn size={20} />
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}