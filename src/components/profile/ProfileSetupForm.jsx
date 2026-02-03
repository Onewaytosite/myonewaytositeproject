import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, LogIn } from "lucide-react";

export default function ProfileSetupForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    id_card_number: '',
    student_teacher_id: '',
    position: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const userData = {
        ...formData,
        avatar_url: "" 
      };
      
      // เก็บข้อมูลลงเครื่อง
      localStorage.setItem('user_profile_info', JSON.stringify(userData));
      
      // จำลองการโหลด
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // ✅ ใช้ window.location.href เพื่อรีโหลดแอปให้ไปหน้า Home ทันที
      window.location.href = '/Home';

    } catch (error) {
      console.error("Login failed:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-indigo-600 text-white p-8">
        <CardTitle className="text-2xl font-bold text-center">เข้าสู่ระบบ</CardTitle>
        <p className="text-indigo-100 text-center text-sm mt-2">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน SKTC Garden</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="full_name">ชื่อ-นามสกุล</Label>
            <Input 
              id="full_name"
              placeholder="กรอกชื่อ - นามสกุล"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input 
              id="email"
              type="email"
              placeholder="example@sktc.ac.th"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">สถานะ</Label>
            <Select onValueChange={(val) => setFormData({...formData, position: val})} required>
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">นักศึกษา</SelectItem>
                <SelectItem value="teacher">อาจารย์ / บุคลากร</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_card_number">เลขบัตรประชาชน (13 หลัก)</Label>
            <Input 
              id="id_card_number"
              maxLength={13}
              placeholder="110xxxxxxxxxx"
              required
              value={formData.id_card_number}
              onChange={(e) => setFormData({...formData, id_card_number: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student_id">รหัสประจำตัว / เบอร์โทรศัพท์</Label>
            <Input 
              id="student_id"
              placeholder="รหัสนักศึกษา หรือ เบอร์โทร"
              required
              value={formData.student_teacher_id}
              onChange={(e) => setFormData({...formData, student_teacher_id: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl transition-all mt-4"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <LogIn className="mr-2" />}
            เข้าสู่ระบบ
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}