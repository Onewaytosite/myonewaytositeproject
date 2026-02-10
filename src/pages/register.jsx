import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    studentId: '', 
    role: 'student', 
    password: '' 
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. สร้าง User ใน Firebase Auth
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // 2. เก็บข้อมูลเพิ่มเติมใน Firestore (แยกประเภท Role)
      await setDoc(doc(db, "users", res.user.uid), {
        name: formData.name,
        studentId: formData.studentId,
        role: formData.role,
        email: formData.email,
        createdAt: new Date().toISOString()
      });
      
      alert("สมัครสมาชิกสำเร็จ!");
      navigate('/home');
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col p-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-emerald-800 flex items-center gap-2 font-medium">
        <ArrowLeft size={20}/> กลับหน้าเข้าสู่ระบบ
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200">
          <UserPlus size={28}/>
        </div>
        <h2 className="text-3xl font-black text-emerald-900 tracking-tight">สมัครสมาชิก</h2>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-emerald-700 ml-2 uppercase">ประเภทผู้ใช้งาน</label>
          <select 
            className="w-full p-4 rounded-2xl border-none shadow-sm bg-white text-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none"
            onChange={e => setFormData({...formData, role: e.target.value})}
          >
            <option value="student">นักศึกษา (Student)</option>
            <option value="teacher">อาจารย์ (Teacher)</option>
          </select>
        </div>

        <input 
          type="text" 
          placeholder="ชื่อ-นามสกุล" 
          className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          onChange={e => setFormData({...formData, name: e.target.value})}
          required 
        />

        <input 
          type="text" 
          placeholder="รหัสนักศึกษา / รหัสพนักงาน" 
          className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          onChange={e => setFormData({...formData, studentId: e.target.value})}
          required 
        />

        <input 
          type="email" 
          placeholder="อีเมล (Email)" 
          className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          onChange={e => setFormData({...formData, email: e.target.value})}
          required 
        />

        <input 
          type="password" 
          placeholder="รหัสผ่าน (6 ตัวขึ้นไป)" 
          className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          onChange={e => setFormData({...formData, password: e.target.value})}
          required 
        />

        <button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-4"
        >
          ยืนยันการสมัครสมาชิก
        </button>
      </form>
      
      <p className="text-center mt-8 text-slate-500 text-sm">
        มีบัญชีอยู่แล้ว? <Link title="Login" to="/" className="text-emerald-600 font-bold underline">เข้าสู่ระบบ</Link>
      </p>
    </div>
  );
}