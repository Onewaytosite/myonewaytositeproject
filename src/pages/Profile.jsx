import React from 'react';
import ProfileSetupForm from "../components/profile/ProfileSetupForm";

export default function Profile() {
  const userDataString = localStorage.getItem('user_profile_info');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <ProfileSetupForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          {userData.full_name?.charAt(0)}
        </div>
        <h1 className="text-xl font-bold text-slate-800">คุณ {userData.full_name}</h1>
        <p className="text-slate-500 text-sm mb-6">{userData.email}</p>
        
        <button 
          onClick={() => { localStorage.removeItem('user_profile_info'); window.location.href = '/Profile'; }}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}s