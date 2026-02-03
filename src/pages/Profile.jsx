import React, { useEffect, useState } from 'react';
// เปลี่ยน Path จาก @/ เป็น ../ เพื่อให้ชัวร์ว่าแอปมือถือหาไฟล์เจอ
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Loader2, User, IdCard, LogOut } from "lucide-react";
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

  const handleLogout = () => {
    localStorage.removeItem('user_profile_info');
    setUser(null);
    window.location.href = '/Profile';
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  // ถ้ายังไม่ Login ให้โชว์หน้าฟอร์ม
  if (!user) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-screen">
        {/* สั่งว่าถ้าล็อกอินสำเร็จ (onComplete) ให้ไปหน้า Home */}
        <ProfileSetupForm onComplete={() => window.location.href = '/Home'} />
      </div>
    );
  }

  // ถ้า Login แล้วโชว์ Profile เดิมที่นายชอบ
  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="h-32 bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-600" />
        <CardContent className="relative pt-0 pb-10">
          <div className="flex flex-col items-center -mt-16 mb-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="bg-indigo-100 text-indigo-600"><User size={48} /></AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">{user?.full_name}</h2>
            <Badge className="mt-3 bg-indigo-50 text-indigo-700 border-indigo-100 uppercase">
              {user?.position === 'student' ? 'นักศึกษา' : 'อาจารย์ / บุคลากร'}
            </Badge>
          </div>

          <div className="grid gap-3 px-4">
             <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <IdCard className="text-indigo-600" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">อีเมล</p>
                  <p className="text-slate-700 font-semibold">{user?.email}</p>
                </div>
             </div>
          </div>

          <div className="px-4">
            <button onClick={handleLogout} className="w-full mt-8 flex items-center justify-center gap-2 text-white bg-red-500 font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-lg shadow-red-100">
              <LogOut size={20} /> ออกจากระบบ
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}