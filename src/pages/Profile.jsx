import React, { useEffect, useState } from 'react';
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, IdCard, GraduationCap, Mail, LogOut } from "lucide-react";
import ProfileSetupForm from "@/components/profile/ProfileSetupForm";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profile = await base44.auth.me();
      if (!profile.id_card_number || !profile.position) {
        setNeedsSetup(true);
      } else {
        setUser(profile);
        setNeedsSetup(false);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (needsSetup) {
    return (
      <div className="container mx-auto py-10 px-4">
        <ProfileSetupForm onComplete={fetchProfile} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600" />
        <CardContent className="relative pt-0 pb-10">
          <div className="flex flex-col items-center -mt-16 mb-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="bg-indigo-100 text-indigo-600">
                <User size={48} />
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">{user?.full_name || 'ไม่ระบุชื่อ'}</h2>
            <Badge variant="secondary" className="mt-2 bg-indigo-100 text-indigo-700 border-0 px-4 py-1">
              {user?.position === 'student' ? 'นักศึกษา' : 'อาจารย์ / บุคลากร'}
            </Badge>
          </div>

          <div className="grid gap-4 mt-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <IdCard className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">เลขบัตรประชาชน</p>
                <p className="text-slate-700 font-semibold">{user?.id_card_number || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <GraduationCap className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">รหัสประจำตัว / เบอร์โทร</p>
                <p className="text-slate-700 font-semibold">{user?.student_teacher_id || '-'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Mail className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">อีเมล</p>
                <p className="text-slate-700 font-semibold">{user?.email || '-'}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="w-full mt-8 flex items-center justify-center gap-2 text-red-500 font-bold py-3 hover:bg-red-50 rounded-2xl transition-colors"
          >
            <LogOut size={20} />
            ออกจากระบบ
          </button>
        </CardContent>
      </Card>
    </div>
  );
}