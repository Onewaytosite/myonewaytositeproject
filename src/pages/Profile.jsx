import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, IdCard, ChevronLeft, Home as HomeIcon } from "lucide-react";
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // ดึงข้อมูลจาก Firestore collection 'users' ที่เราสร้างตอน Register
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        // ถ้าไม่มีคนล็อกอิน ให้เด้งไปหน้า Login
        navigate('/');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error); // เพิ่มบรรทัดนี้เพื่อใช้งานตัวแปร error
      alert("ออกจากระบบไม่สำเร็จ: " + error.message);
    }
  };

  if (loading) return <div className="p-10 text-emerald-600 font-bold text-center">กำลังโหลด...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 w-full">
      {/* Header */}
      <div className="bg-white p-6 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/Home')} className="text-emerald-700 p-1 hover:bg-emerald-50 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-black text-emerald-900 text-lg uppercase tracking-tight">Profile</span>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        {/* Profile Card */}
        <div className="w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-xl shadow-emerald-200/50 relative mt-12 border border-white">
          {/* Avatar Area */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white rotate-3">
              <User size={44} className="text-white -rotate-3" />
            </div>
          </div>

          <div className="text-center mt-14 mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{userData?.name || 'User'}</h2>
            <div className="mt-2">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] bg-emerald-100 px-4 py-1.5 rounded-full">
                {userData?.role === 'student' ? 'Student' : 'Teacher'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
              <Mail className="text-emerald-500" size={20} />
              <div className="overflow-hidden">
                <p className="text-[10px] text-emerald-400 font-black uppercase">Email Address</p>
                <p className="text-slate-700 font-bold truncate text-sm">{userData?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
              <IdCard className="text-emerald-500" size={20} />
              <div>
                <p className="text-[10px] text-emerald-400 font-black uppercase">Identification ID</p>
                <p className="text-slate-700 font-bold text-sm">{userData?.studentId || 'No ID'}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <button 
              onClick={() => navigate('/Home')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 transition-all active:scale-95"
            >
              <HomeIcon size={18} /> GO TO GARDEN
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-white text-rose-500 font-black py-4 rounded-2xl flex items-center justify-center gap-3 border-2 border-rose-50 hover:bg-rose-50 transition-all active:scale-95"
            >
              <LogOut size={18} /> SIGN OUT
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar ล่าง */}
      <div className="bg-white p-5 rounded-t-[2.5rem] flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-emerald-50">
        <button onClick={() => navigate('/Home')} className="flex flex-col items-center text-slate-300 hover:text-emerald-500 transition-colors">
          <HomeIcon size={24} />
          <span className="text-[9px] font-black mt-1 uppercase tracking-wider">Garden</span>
        </button>
        <button className="flex flex-col items-center text-emerald-600">
          <User size={24} />
          <span className="text-[9px] font-black mt-1 uppercase tracking-wider">Profile</span>
        </button>
      </div>
    </div>
  );
}