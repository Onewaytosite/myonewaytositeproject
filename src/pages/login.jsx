import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Lock, Mail, Leaf } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (err) {
      let message = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      if (err.code === 'auth/user-not-found') message = "ไม่พบผู้ใช้งานนี้";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6">
      {/* Logo Section */}
      <div className="mb-10 text-center">
        <div className="bg-emerald-600 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl shadow-emerald-200 mx-auto mb-4 rotate-3">
          <Leaf size={40} className="text-white -rotate-3" />
        </div>
        <h1 className="text-4xl font-black text-emerald-900 tracking-tighter">GREENCODE IT</h1>
        <p className="text-emerald-600 font-medium text-sm mt-1 uppercase tracking-widest">Botanical Database</p>
      </div>

      {/* Login Form Card */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-100 border border-white">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-800">เข้าสู่ระบบ</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-emerald-300" size={20} />
            <input 
              type="email" 
              placeholder="อีเมล (Email)" 
              className="w-full bg-emerald-50/50 border-none p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-emerald-300" size={20} />
            <input 
              type="password" 
              placeholder="รหัสผ่าน (Password)" 
              className="w-full bg-emerald-50/50 border-none p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-emerald-400' : 'bg-emerald-600'} text-white p-4 rounded-2xl font-black shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95 transition-all`}
          >
            {loading ? 'กำลังเข้าระบบ...' : <><LogIn size={20} /> SIGN IN</>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">ยังไม่มีบัญชีสมาชิก?</p>
          <Link to="/register" className="text-emerald-600 font-black hover:underline mt-1 inline-block uppercase tracking-tight">
            สมัครสมาชิกใหม่ที่นี่
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-10 text-[10px] text-emerald-400 font-bold uppercase tracking-widest text-center">
        © 2024 Project Botany IT Management
      </p>
    </div>
  );
}