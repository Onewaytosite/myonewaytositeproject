import React, { useState } from 'react';
import { Save, Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function AddPlant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', sci: '', zone: '', desc: '' });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm"><ArrowLeft /></button>
        <h1 className="text-xl font-bold">ลงทะเบียนต้นไม้ใหม่</h1>
      </div>

      <div className="space-y-6">
        <div className="w-full h-48 bg-slate-200 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
          <Camera size={40} className="mb-2" />
          <p className="text-sm">อัปโหลดรูปต้นไม้</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
          <input className="w-full p-4 bg-slate-50 rounded-2xl border-none" placeholder="ชื่อสามัญ (ภาษาไทย)" />
          <input className="w-full p-4 bg-slate-50 rounded-2xl border-none" placeholder="ชื่อวิทยาศาสตร์" />
          <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-none h-32" placeholder="สรรพคุณ / รายละเอียด" />
          
          <button className="w-full bg-[#1e1b4b] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <Save size={18} /> บันทึกเข้าคลังข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}