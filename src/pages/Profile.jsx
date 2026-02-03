import React, { useEffect, useState } from 'react';
// ใช้ ../ เพื่อระบุตำแหน่งที่แน่นอน
import ProfileSetupForm from "../components/profile/ProfileSetupForm";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserData = localStorage.getItem('user_profile_info');
    if (savedUserData) {
      setUser(JSON.parse(savedUserData));
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center">กำลังโหลด...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        {/* เมื่อล็อกอินเสร็จ ให้ดีดไปหน้า Home ทันที */}
        <ProfileSetupForm onComplete={() => window.location.href = '#/Home'} />
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1>ยินดีต้อนรับคุณ {user.full_name}</h1>
      <button 
        onClick={() => { localStorage.clear(); window.location.href = '#/Profile'; }}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}