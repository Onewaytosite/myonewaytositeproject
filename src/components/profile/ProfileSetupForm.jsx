import React, { useState } from 'react';

export default function ProfileSetupForm({ onComplete }) {
  const [formData, setFormData] = useState({ full_name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile_info', JSON.stringify(formData));
    if (onComplete) onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h2>
      <input 
        type="text" 
        placeholder="ชื่อ-นามสกุล" 
        className="w-full p-2 border mb-2 rounded"
        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
        required
      />
      <input 
        type="email" 
        placeholder="อีเมล" 
        className="w-full p-2 border mb-4 rounded"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-xl">
        ยืนยัน
      </button>
    </form>
  );
}