import React from 'react';
// สำคัญ: เช็ค Path ตรงนี้ให้ตรงกับโฟลเดอร์ของนายจริง ๆ
import ProfileSetupForm from "../components/profile/ProfileSetupForm";

export default function Profile() {
  const userData = localStorage.getItem('user_profile_info');

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <ProfileSetupForm />
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1>ยินดีต้อนรับคุณ {JSON.parse(userData).full_name}</h1>
      <button 
        onClick={() => { localStorage.removeItem('user_profile_info'); window.location.reload(); }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}